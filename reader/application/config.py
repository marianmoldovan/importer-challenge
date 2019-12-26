"""
Configuration file with parameters for Flask app
"""
import os


if 'MONGO_URI' in os.environ:
    MONGO_URI = os.environ.get('MONGO_URI')
else:
    MONGO_URI = 'mongodb://localhost:27017/importer'
