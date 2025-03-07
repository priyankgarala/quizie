"use-client";

import Link from "next/link";

export default function QuizOptions() {
    return (
        <div className="md:mt-32 text-white flex flex-col items-center justify-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                Choose How to Create Your Quiz
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
                Select an option to get started with your quiz creation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                {/* Generate Quiz Option */}
                <div className="p-6 bg-gray-800 rounded-xl shadow-lg text-center hover:bg-gray-700 transition duration-300">
                    <h3 className="text-2xl font-semibold">Generate Quiz</h3>
                    <p className="mt-2 text-gray-400">
                        Let AI generate a quiz for you based on a topic.
                    </p>
                    <Link href="/newquiz/generate-quiz" className="mt-4 px-6 py-3 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">
                        Generate Quiz
                    </Link>
                </div>

                {/* Manual Quiz Option */}
                <div className="p-6 bg-gray-800 rounded-xl shadow-lg text-center hover:bg-gray-700 transition duration-300">
                    <h3 className="text-2xl font-semibold">Add Quiz Manually</h3>
                    <p className="mt-2 text-gray-400">
                        Create a custom quiz by adding your own questions.
                    </p>
                    <Link href="/newquiz/manuel-quiz" className="mt-4 px-6 py-3 inline-block bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition">
                        Add Manually
                    </Link>
                </div>
            </div>
        </div>
    );
}
