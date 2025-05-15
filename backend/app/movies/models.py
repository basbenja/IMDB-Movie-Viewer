from pydantic import BaseModel, field_validator

class Movie(BaseModel):
    title: str
    year: int
    description: str
    genre: str
    director: str

    @field_validator('year', mode='before')
    def parse_year(cls, value):
        if isinstance(value, int):
            year = value
        elif isinstance(value, str):
            digits = ''.join(filter(str.isdigit, value))
            if not digits:
                raise ValueError('year must contain at least one digit')
            year = int(digits)
        else:
            raise ValueError('year must be an int or string containing digits')
        return year