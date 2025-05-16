import os

class ConfigBase:
    TESTING = False
    DATA_STORAGE_PATH = os.environ.get(
        'DATA_STORAGE_PATH', os.path.abspath(os.path.join(os.path.dirname(__file__), 'data'))
    )

class ConfigDev(ConfigBase):
    DEBUG = True
