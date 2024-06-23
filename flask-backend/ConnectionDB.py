# ConnectionDB.py

from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import ObjectId
import logging
from datetime import datetime

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/diceGame"
mongo = PyMongo(app)

# Enable CORS
CORS(app)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

@app.route('/configure-session', methods=['POST'])
def configure_session():
    try:
        data = request.json
        logging.debug(f"Received data: {data}")

        # Verify required fields
        required_fields = ['creator', 'numberOfDices', 'numberOfGames', 'waitTimeBetweenGames']
        for field in required_fields:
            if field not in data:
                raise ValueError(f"Missing required field: {field}")

        session_id = mongo.db.sessions.insert_one({
            'startDate': datetime.now(),
            'creator': ObjectId(data['creator']),
            'numberOfDices': data['numberOfDices'],
            'numberOfGames': data['numberOfGames'],
            'waitTimeBetweenGames': data['waitTimeBetweenGames'],
            'score': 0
        }).inserted_id

        logging.debug(f"Session ID: {session_id}")

        return jsonify({
            'message': 'Session configurée avec succès!',
            'session_id': str(session_id),
            'configuration': {
                'numberOfDices': data['numberOfDices'],
                'numberOfGames': data['numberOfGames'],
                'waitTimeBetweenGames': data['waitTimeBetweenGames']
            }
        }), 201
    except Exception as e:
        logging.error(f"Error configuring session: {e}")
        return jsonify({'error': str(e)}), 500
@app.route('/get-session/<session_id>', methods=['GET'])
def get_session(session_id):
    try:
        logging.debug(f"Received session ID: {session_id}")
        session = mongo.db.sessions.find_one({'_id': ObjectId(session_id)})
        if not session:
            logging.error('Session not found')
            return jsonify({'error': 'Session not found'}), 404

        session_data = {
            'startDate': session['startDate'],
            'endDate': session.get('endDate'),
            'creator': str(session['creator']),
            'numberOfDices': session['numberOfDices'],
            'numberOfGames': session['numberOfGames'],
            'score': session['score'],
            'waitTimeBetweenGames': session['waitTimeBetweenGames']
        }

        return jsonify(session_data), 200
    except Exception as e:
        logging.error(f"Error fetching session: {e}")
        return jsonify({'error': str(e)}), 500
    
@app.route('/end-session/<session_id>', methods=['POST'])
def end_session(session_id):
    try:
        data = request.json
        logging.debug(f"Ending session with ID: {session_id} with data: {data}")
        
        # Update session with end date and final score
        mongo.db.sessions.update_one(
            {'_id': ObjectId(session_id)},
            {'$set': {
                'endDate': datetime.now(),
                'score': data.get('score', 0)
            }}
        )

        return jsonify({'message': 'Session ended successfully'}), 200
    except Exception as e:
        logging.error(f"Error ending session: {e}")
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(port=5001, debug=True)
