from flask import Flask

def create_app(test_config=None):
    app = Flask(__name__)
    app.config.from_mapping(
        MONGO_URI='mongodb://localhost:27017/importer'
    )
    if test_config is None:
        app.config.from_pyfile('./config.py', silent=False)
    else:
        app.config.update(test_config)

    from .db import mongo
    mongo.init_app(app)

    from application import reader
    app.register_blueprint(reader.bp)

    return app
