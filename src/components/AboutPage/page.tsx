import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6 py-10">
      <div className="max-w-4xl w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-400">About Our WebApp</h1>
        <p className="text-gray-300 mb-6">
          Welcome to our innovative <strong>Quizie</strong>, designed to make quiz creation and participation more engaging, flexible, and accessible. Our platform empowers users to create custom quizzes with multiple question types and seamlessly generate a quiz link that can be shared with participants. With a user-friendly interface and robust functionality, we aim to redefine the way quizzes are conducted online.
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-blue-300">Features</h2>
        <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
          <li><strong>Multiple Question Types:</strong> MCQs, Fill in the Blanks, Question & Answer</li>
          <li><strong>Customizable Quiz Timer:</strong> Set a timer for added challenge</li>
          <li><strong>Instant Quiz Link Generation:</strong> Shareable quiz links for easy access</li>
          <li><strong>Real-time Quiz Experience:</strong> Interactive and seamless participation</li>
          <li><strong>Secure & Efficient:</strong> Optimized with Next.js for high performance</li>
        </ul>

        <h2 className="text-3xl font-semibold mb-4 text-blue-300">Future Plans</h2>
        <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
          <li><strong>AI-Enhanced Quizzes:</strong> Adaptive questions based on user knowledge</li>
          <li><strong>Advanced Analytics:</strong> Insights and reports on quiz performance</li>
          <li><strong>Multi-User Collaboration:</strong> Allow multiple users to contribute to quizzes</li>
          <li><strong>More Interactive Elements:</strong> Support for multimedia content</li>
        </ul>

        <h2 className="text-3xl font-semibold mb-4 text-blue-300">Tech Stack</h2>
        <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
          <li><strong>Frontend:</strong> Next.js (React-based framework)</li>
          <li><strong>Backend:</strong> Serverless APIs and cloud storage</li>
          <li><strong>Database:</strong> Supabase (for storing user details and quiz data)</li>
          <li><strong>State Management:</strong> React Hooks and Context API</li>
          <li><strong>Authentication:</strong> Secure login for quiz creators and participants</li>
        </ul>

        <h2 className="text-3xl font-semibold mb-4 text-blue-300">Join Us on Our Journey</h2>
        <p className="text-gray-300 mb-6">
          We believe learning should be fun, engaging, and effective. Our mission is to provide a dynamic quiz platform that caters to students, educators, corporate trainers, and quiz enthusiasts. As we move forward with AI-powered enhancements and more interactive features, we invite you to be a part of our journey.
        </p>

        <p className="text-center text-blue-400 font-semibold mb-6">
          Stay tuned for exciting updates, and start creating your quizzes today!
        </p>

        <p className="text-center">
          For any feedback or queries, feel free to <a href="/contact" className="text-blue-500 underline">Contact Us</a>.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;