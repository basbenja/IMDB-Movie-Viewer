import os

class Config:
    DATA_STORAGE_PATH = os.environ.get(
        'DATA_STORAGE_PATH', os.path.abspath(os.path.join(os.path.dirname(__file__), 'data'))
    )
    SECRET_KET = os.environ.get('SECRET_KEY', 'dev')