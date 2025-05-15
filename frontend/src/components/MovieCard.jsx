const genreEmoji = {
  Action: "💥",
  Comedy: "😂",
  Drama: "🎭",
  Horror: "👻",
  Romance: "❤️",
  SciFi: "🚀",
  Thriller: "🔪",
  History: "📜",
  Biography: "📖",
  Adventure: "🗺️",
  Crime: "🔍",
  Fantasy: "🧙‍♂️",
  Sport: "👟",
  War: "⚔️",
  Mystery: "🕵️‍♂️",
  Western: "🤠",
  "Sci-Fi": "🚀",
  Music: "🎶",
  Musical: "🎤",
}


function MovieCard({ title, year, genre, description }) {
  return (
    <div
      className="w-60 h-90 bg-white shadow-md rounded-xl p-4 border border-gray-200
      m-px flex flex-col justify-between hover:scale-102 transition-transform duration-300 cursor-default"
    >
      <div>
        <h2 className="text-lg text-center font-semibold">{title}</h2>
        <p className="text-sm text-center text-gray-500 mb-2">{year}</p>
        <p className="text-sm text-center text-gray-500">
          {genre.split(",").map((g, index) => (
            <span key={index}>
              {g + " " + (genreEmoji[g.trim()] || "")}
              <br />
            </span>
          ))}
        </p>
        <p className="text-gray-700 text-center text-sm mt-2">{description}</p>
      </div>
    </div>
  );
};

export default MovieCard;
