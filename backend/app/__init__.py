import os

from config import ConfigDev
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

load_dotenv()

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)

    app.config.from_object(ConfigDev)

    if test_config:
        app.config.from_mapping(test_config)

    data_path = app.config.get('DATA_STORAGE_PATH')
    if not data_path:
        raise RuntimeError("DATA_STORAGE_PATH not set in configuration or environment.")
    if not os.path.exists(data_path):
        try:
            os.makedirs(data_path, exist_ok=True)
        except Exception as e:
            raise RuntimeError(f"Failed to create data storage path: {data_path}. Error: {e}")

    from app.movies import movies_bp
    app.register_blueprint(movies_bp)

    return app