"""
Module that encapsulates the backend flask app
"""
from flask import Flask
from application.db import mongo
from application import reader


def create_app(test_config=None):
    """
    The factory module of the flask app

    Args:
        test_config (dict): dictionary with testing variables

    Returns:
        Flask app: returns the flask app created

    """
    app = Flask(__name__)
    app.config.from_mapping(
        MONGO_URI='mongodb://localhost:27017/importer'
    )
    if test_config is None:
        app.config.from_pyfile('./config.py', silent=False)
    else:
        app.config.update(test_config)
    mongo.init_app(app)
    app.register_blueprint(reader.bp)
    return app
