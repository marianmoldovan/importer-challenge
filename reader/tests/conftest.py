import pytest

from application import create_app
from application.db import mongo

@pytest.fixture
def app():
    app = create_app({'MONGO_URI': 'mongodb://localhost:27017/test'})
    with app.app_context():
        mongo.init_app(app)
    yield app

@pytest.fixture
def client(app):
    return app.test_client()
