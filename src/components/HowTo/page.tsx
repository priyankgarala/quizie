'use client';

export default function HowToPage() {
    return (
        <div className="text-white flex flex-col items-center justify-center min-h-screen bg-gray-900 px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center mt-4">
                How to Use the Web App
            </h1>
            <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-4">Getting Started</h2>
                <p className="text-lg text-gray-300 mb-4">
                    Welcome to our web app! This guide will help you get started and make the most of the features available. Follow the steps below to learn how to use the app effectively.
                </p>

                <h3 className="text-2xl font-bold mb-2">1. Sign Up / Log In</h3>
                <p className="text-lg text-gray-300 mb-4">
                    To access the features of the web app, you need to create an account or log in if you already have one. Click on the "Sign Up" or "Log In" button in the top right corner of the homepage and follow the prompts.
                </p>

                <h3 className="text-2xl font-bold mb-2">2. Start Quiz</h3>
                <p className="text-lg text-gray-300 mb-4">
                    After logging in, navigate to the "Create Quiz" section. Here you can create custom quizzes by selecting the type of questions (Multiple Choice, Fill in the Blanks, or Question & Answer), entering the questions and answers, and setting a timer for the quiz.
                </p>

                <h3 className="text-2xl font-bold mb-2">3. Take a Quiz</h3>
                <p className="text-lg text-gray-300 mb-4">
                    Select the quiz you want to attempt. Start the quiz by clicking the "Start Quiz" button. Answer the questions within the given time limit and submit your answers.
                </p>

                <h3 className="text-2xl font-bold mb-2">4. View Results</h3>
                <p className="text-lg text-gray-300 mb-4">
                    After submitting a quiz, you can view your results. The results page will display your total marks, the correct answers, and your answers. You can also download the results as a PDF for future reference.
                </p>

                <h3 className="text-2xl font-bold mb-2">5. About</h3>
                <p className="text-lg text-gray-300 mb-4">
                    Learn more about the creator of this web app by visiting the "About" page. Get to know Priyank Garala and the inspiration behind this project.
                </p>

                <h3 className="text-2xl font-bold mb-2">6. Additional Features [In Progress]</h3>
                <p className="text-lg text-gray-300 mb-4">
                    Explore other features of the web app, such as customizing your profile, viewing past quizzes, and providing feedback. We are constantly working to improve the app and add new features based on user feedback.
                </p>

                <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
                <p className="text-lg text-gray-300 mb-4">
                    If you encounter any issues or have questions, feel free to reach out to our support team through the "Contact Us" page. We are here to help you!
                </p>
            </div>
        </div>
    );
};

