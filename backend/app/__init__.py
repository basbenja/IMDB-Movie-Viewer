from config import Config
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

load_dotenv()

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)

    app.config.from_object(Config)

    from app.movies import movies_bp
    app.register_blueprint(movies_bp)

    return app