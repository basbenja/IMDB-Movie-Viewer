import os

from app.movies.utils import validate_movies_csv
from io import BytesIO

def test_post_movies_file_ok(client, sample_data_path):
    filename = 'IMDb_movies.csv'
    csv_ok_path = os.path.join(sample_data_path, filename)

    with open(csv_ok_path, 'rb') as f:
        response = client.post(
            '/movies/upload',
            data={'file': (f, filename)},
            content_type='multipart/form-data'
        )

    response_json = response.get_json()
    assert response.status_code == 200
    assert 'movies' in response_json
    assert len(response_json['movies']) == 5


def test_post_movies_file_invalid(client, sample_data_path):
    filename = 'my_IMDb_movies_fail.csv'
    csv_fail_path = os.path.join(sample_data_path, filename)

    with open(csv_fail_path, 'rb') as f:
        response = client.post(
            '/movies/upload',
            data={'file': (f, filename)},
            content_type='multipart/form-data'
        )

    response_json = response.get_json()
    assert response.status_code == 422
    assert 'movies' not in response_json
    assert 'message' in response_json
    assert 'Validation error: Invalid data in the file' in response_json['message']


def test_post_movies_no_file(client):
    response = client.post(
        '/movies/upload',
        data={},
        content_type='multipart/form-data'
    )

    response_json = response.get_json()
    assert response.status_code == 400
    assert 'movies' not in response_json
    assert 'message' in response_json
    assert 'No file part in the request' in response_json['message']


def test_post_movies_empty_filename(client):
    response = client.post(
        '/movies/upload',
        data={'file': (BytesIO(b'some content'), '')},
        content_type='multipart/form-data'
    )
    response_json = response.get_json()
    assert response.status_code == 400
    assert 'movies' not in response_json
    assert 'message' in response_json
    assert 'No file part in the request' in response_json['message']


def test_get_all_movies(client):
    # Mockeamos lo que hace el post
    filename = 'IMDb_movies.csv'
    csv_ok_path = os.path.join('tests', 'sample_data', filename)
    movies_list = validate_movies_csv(csv_ok_path)
    client.application.config['movie_data'] = movies_list

    response = client.get('/movies')
    response_json = response.get_json()
    assert response.status_code == 200
    assert 'movies' in response_json
    assert 'total_pages' in response_json
    assert response_json['total_pages'] == 0
    assert len(response_json['movies']) == len(movies_list)


def test_get_all_movies_with_pagination(client):
    # Mockeamos lo que hace el post
    filename = 'IMDb_movies.csv'
    csv_ok_path = os.path.join('tests', 'sample_data', filename)
    movies_list = validate_movies_csv(csv_ok_path)
    client.application.config['movie_data'] = movies_list

    limit = 5
    page = 5
    total_pages = len(movies_list) // limit + (1 if len(movies_list) % limit > 0 else 0)

    response = client.get(f'/movies?page={page}&limit={limit}')
    response_json = response.get_json()
    assert response.status_code == 200
    assert 'movies' in response_json
    assert 'total_pages' in response_json
    assert response_json['total_pages'] == total_pages
    assert len(response_json['movies']) == limit


def test_get_all_movies_with_filter(client):
    # Mockeamos lo que hace el post
    filename = 'IMDb_movies.csv'
    csv_ok_path = os.path.join('tests', 'sample_data', filename)
    movies_list = validate_movies_csv(csv_ok_path)
    client.application.config['movie_data'] = movies_list

    title_start = "Cind"
    movies_list_filtered = [movie for movie in movies_list if movie['title'].lower().startswith(title_start.lower())]

    response = client.get(f'/movies?title={title_start}')
    response_json = response.get_json()
    assert response.status_code == 200
    assert 'movies' in response_json
    assert 'total_pages' in response_json

    assert response_json['total_pages'] == 0
    assert response_json['movies'] == movies_list_filtered
    assert len(response_json['movies']) == len(movies_list_filtered)


def test_get_all_movies_with_pagination_and_filter(client):
    # Mockeamos lo que hace el post
    filename = 'IMDb_movies.csv'
    csv_ok_path = os.path.join('tests', 'sample_data', filename)
    movies_list = validate_movies_csv(csv_ok_path)
    client.application.config['movie_data'] = movies_list

    title_start = "Cind"
    movies_list_filtered = [movie for movie in movies_list if movie['title'].lower().startswith(title_start.lower())]

    page = 3
    limit = 3
    start = (page - 1) * limit
    end = start + limit
    total_pages = len(movies_list_filtered) // limit + (1 if len(movies_list_filtered) % limit > 0 else 0)

    response = client.get(f'/movies?title={title_start}&page={page}&limit={limit}')
    response_json = response.get_json()
    assert response.status_code == 200
    assert 'movies' in response_json
    assert 'total_pages' in response_json

    assert response_json['total_pages'] == total_pages
    assert response_json['movies'] == movies_list_filtered[start:end]
    assert len(response_json['movies']) == 3