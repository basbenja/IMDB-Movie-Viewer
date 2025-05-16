import os

def test_post_movies_file_ok(client, sample_data_path):
    filename = 'IMDb_movies.csv'
    csv_ok_path = os.path.join(sample_data_path, filename)

    with open(csv_ok_path, 'rb') as f:
        response = client.post(
            '/movies/upload',
            data={'file': (f, filename)},
            content_type='multipart/form-data'
        )

    assert response.status_code == 200
    assert 'movies' in response.get_json()

def test_post_movies_file_invalid(client, sample_data_path):
    filename = 'my_IMDb_movies_fail.csv'
    csv_fail_path = os.path.join(sample_data_path, filename)

    with open(csv_fail_path, 'rb') as f:
        response = client.post(
            '/movies/upload',
            data={'file': (f, filename)},
            content_type='multipart/form-data'
        )

    assert response.status_code == 422
    assert 'movies' not in response.get_json()
    assert 'message' in response.get_json()