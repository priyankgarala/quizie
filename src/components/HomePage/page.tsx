export default function HomePage() {
    return (
      <div className="md:mt-10 h-full text-white flex flex-col items-center justify-center md:p-0 p-6">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Test Your Knowledge with Our Ultimate Quiz App.
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Challenge yourself with fun and engaging quizzes on various topics. Also Generate Quizes based on your terms.
          </p>
          
          
        </div>
  
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="p-6 bg-gray-800 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold">Multiple Categories</h3>
            <p className="mt-2 text-gray-400">Choose from a variety of topics.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold">Time-Based Quizzes</h3>
            <p className="mt-2 text-gray-400">Test your speed and accuracy.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold">Leaderboard</h3>
            <p className="mt-2 text-gray-400">Compete with friends and rank higher.</p>
          </div>
        </div>
      </div>
    );
  }
  