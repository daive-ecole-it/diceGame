import os
import subprocess
import sys
from pymongo import MongoClient

# Configuration
DATABASE_NAME = 'diceGame'
MONGO_URI = 'mongodb://localhost:27017/'
FLASK_APP = 'ConnectionDB.py'
FLASK_RUN_PORT = '5001'

# Function to create the database if it doesn't exist
def create_database():
    client = MongoClient(MONGO_URI)
    db_list = client.list_database_names()
    if DATABASE_NAME not in db_list:
        db = client[DATABASE_NAME]
        print(f"Database '{DATABASE_NAME}' created.")
    else:
        print(f"Database '{DATABASE_NAME}' already exists.")

# Function to run unit tests
def run_unit_tests():
    print("Running unit tests...")
    result = subprocess.run([sys.executable, '-m', 'unittest', 'discover', '-s', 'tests', '-p', '*_test.py'], capture_output=True, text=True)
    print(result.stdout)
    print(result.stderr)
    if result.returncode != 0:
        raise Exception("Unit tests failed")

# Function to start the Flask application
def start_flask_app():
    print("Starting Flask application...")
    subprocess.run([sys.executable, '-m', 'flask', 'run', '--port', FLASK_RUN_PORT])

if __name__ == '__main__':
    try:
        create_database()
        run_unit_tests()
        start_flask_app()
    except Exception as e:
        print(f"An error occurred: {e}")
