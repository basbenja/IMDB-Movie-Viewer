import pytest
import tempfile
import os
import shutil

from app import create_app

@pytest.fixture()
def app():
    temp_dir = tempfile.mkdtemp()

    test_config = {
        "TESTING": True,
        "DATA_STORAGE_PATH": temp_dir
    }
    app = create_app(test_config)

    yield app

    if os.path.exists(temp_dir):
        shutil.rmtree(temp_dir)


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def sample_data_path():
    return os.path.join(os.path.dirname(__file__), 'sample_data')
