import os

from . import movies_bp
from .utils import allowed_file_extension, validate_movies_csv
from flask import request, current_app, jsonify
from werkzeug.utils import secure_filename

@movies_bp.route('/movies', methods=['GET'])
def get_movies():
    title = request.args.get('title')
    page = request.args.get('page', None, type=int)
    limit = request.args.get('limit', None, type=int)
    total_pages = 0

    movies = current_app.config.get('movie_data', [])
    if not movies:
        return "No movies were loaded yet. Please upload a file first.", 400
    if title:
        movies = [movie for movie in movies if movie['title'].lower().startswith(title.lower())]
    if page and limit:
        total_pages = len(movies) // limit + (1 if len(movies) % limit > 0 else 0)
        start = (page - 1) * limit
        end = start + limit
        movies = movies[start:end]
    return jsonify({"movies": movies, "total_pages": total_pages}), 200


@movies_bp.route('/movies/upload', methods=['POST'])
def upload_movies_file():
    file = request.files.get('file', None)
    if not file:
        return jsonify({"message": "No file part in the request"}), 400

    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400

    if not allowed_file_extension(file.filename):
        return jsonify({"message": "File type not allowed"}), 415

    filename = secure_filename(file.filename)
    file_path = os.path.join(current_app.config['DATA_STORAGE_PATH'], filename)
    try:
        file.save(file_path)
    except Exception as e:
        return jsonify({"message": f"Failed to save file: {str(e)}"}), 500

    try:
        current_app.config['movie_data'] = validate_movies_csv(file_path)
        return jsonify({"movies": current_app.config['movie_data'][:5]}), 200
    except ValueError:
        return jsonify({"message": "Validation error: Invalid data in the file"}), 422
    except Exception as e:
        return jsonify({"message": f"Failed to read file: {str(e)}"}), 500