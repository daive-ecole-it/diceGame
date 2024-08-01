# test_app.py

import unittest
from ConnectionDB import app, mongo
from flask import json
from datetime import datetime
from bson import ObjectId

class FlaskTestCase(unittest.TestCase):

    def setUp(self):
        app.config.from_object('test_config.Config')
        self.app = app.test_client()
        self.app.testing = True
        with app.app_context():
            # Clear the test database before each test
            mongo.db.sessions.delete_many({})

    def tearDown(self):
        with app.app_context():
            # Clear the test database after each test
            mongo.db.sessions.delete_many({})

    def test_configure_session(self):
        # Mock user ID for testing
        user_id = str(ObjectId())
        data = {
            'creator': user_id,
            'numberOfDices': 2,
            'numberOfGames': 5,
            'waitTimeBetweenGames': 10
        }
        response = self.app.post('/configure-session', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        response_data = json.loads(response.data)
        self.assertIn('session_id', response_data)
        self.assertEqual(response_data['configuration']['numberOfDices'], 2)
        self.assertEqual(response_data['configuration']['numberOfGames'], 5)
        self.assertEqual(response_data['configuration']['waitTimeBetweenGames'], 10)

    def test_get_session(self):
        # Mock session creation
        user_id = str(ObjectId())
        session_id = mongo.db.sessions.insert_one({
            'startDate': datetime.now(),
            'creator': ObjectId(user_id),
            'numberOfDices': 2,
            'numberOfGames': 5,
            'waitTimeBetweenGames': 10,
            'score': 0
        }).inserted_id

        response = self.app.get(f'/get-session/{session_id}')
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.data)
        self.assertEqual(response_data['creator'], user_id)
        self.assertEqual(response_data['numberOfDices'], 2)
        self.assertEqual(response_data['numberOfGames'], 5)
        self.assertEqual(response_data['waitTimeBetweenGames'], 10)

    def test_get_nonexistent_session(self):
        response = self.app.get(f'/get-session/{ObjectId()}')
        self.assertEqual(response.status_code, 404)
        response_data = json.loads(response.data)
        self.assertEqual(response_data['error'], 'Session not found')

    def test_configure_session_missing_fields(self):
        # Test with missing fields
        data = {
            'creator': str(ObjectId()),
            'numberOfDices': 2,
        }
        response = self.app.post('/configure-session', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 500)
        response_data = json.loads(response.data)
        self.assertIn('error', response_data)
        self.assertIn('Missing required field', response_data['error'])

if __name__ == '__main__':
    unittest.main()
