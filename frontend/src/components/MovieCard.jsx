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
  Family: "👨‍👩‍👧‍👦",
}


function MovieCard({ title, year, director, genre, description }) {
  return (
    <div
      className="w-full h-full bg-white rounded-xl p-4 border border-gray-200
      m-px flex flex-col justify-between hover:scale-102 hover:shadow-[0_0_25px_0_rgba(139,92,246,0.5)]
      transition-all duration-300 cursor-default"
    >
      <div>
        <h2 className="text-lg text-center font-semibold">{title}</h2>
        <p className="text-sm text-center text-gray-600 mb-2">{director}</p>
        <p className="text-sm text-center text-gray-600 mb-2">{year}</p>
        <p className="text-sm text-center text-gray-600">
          {genre.split(",").map((g, index) => (
            <span key={index}>
              {g + " " + (genreEmoji[g.trim()] || "")}
              <br />
            </span>
          ))}
        </p>
        <p className="text-gray-800 text-center text-sm mt-2">{description}</p>
      </div>
    </div>
  );
};

export default MovieCard;
