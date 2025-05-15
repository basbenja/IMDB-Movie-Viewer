import csv
from .models import Movie
from pydantic import ValidationError

def allowed_file_extension(filename):
    """
    Check if the file extension is allowed.
    """
    ALLOWED_EXTENSIONS = {'csv'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def validate_movies_csv(file_path):
    """
    Reads a CSV file and returns a list of dictionaries.
    Each dictionary represents a row in the CSV file, with the keys being the column headers.
    """
    movies = []
    try:
        with open(file_path, 'r', encoding='latin_1') as f:
            reader = csv.DictReader(f)
            for line in reader:
                movie = Movie(**line)
                movies.append(movie.model_dump())
        return movies
    except ValidationError as e:
        raise ValueError(f"Validation error: {e.errors()}")
    except UnicodeDecodeError:
        raise ValueError("File encoding is not supported. Please use 'latin_1'.")
    except csv.Error as e:
        raise ValueError(f"Error reading CSV file at line {reader.line_num}: {e}")
    except Exception as e:
        raise RuntimeError(f"An unexpected error occurred: {e}")

path = "/home/basbenja/Dev/IMDB-Movie-Viewer/backend/data/IMDb_movies.csv"
data = validate_movies_csv(path)