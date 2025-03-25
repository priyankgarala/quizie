'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import jsPDF from 'jspdf';

interface Question {
    type: "MCQ" | "BLANK" | "QA";
    question: string;
    options?: string[];
    correctAnswer: string;
    answers?: string[];
}

interface QuizData {
    questions: Question[];
    timer: number;
}

interface QuizResult {
    question: string;
    userAnswer: string | string[];
    correctAnswer: string | string[];
    isCorrect: boolean;
}

const QuizPage = () => {
    const { quizId } = useParams();
    const router = useRouter();
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [timer, setTimer] = useState<number | null>(null);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [userAnswers, setUserAnswers] = useState<Record<number, string | string[]>>({});
    const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
    const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
    const [totalMarks, setTotalMarks] = useState<number>(0);

    useEffect(() => {

        if (quizId) {
            const storedQuizData = localStorage.getItem(`quiz-${quizId}`);
            if (storedQuizData) {
                const parsedQuizData: QuizData = JSON.parse(storedQuizData);
                setQuizData(parsedQuizData);
                setTimer(parsedQuizData.timer);
            }
        }
    }, [quizId, router]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isTimerRunning && timer !== null && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => (prevTimer !== null ? prevTimer - 1 : prevTimer));
            }, 1000);
        } else if (timer === 0) {
            setIsTimerRunning(false);
            handleSubmit();
        }

        return () => clearInterval(interval);
    }, [isTimerRunning, timer]);

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleStartQuiz = () => {
        setIsTimerRunning(true);
        setIsQuizStarted(true);
    };

    const handleUserAnswerChange = (questionIndex: number, value: string | string[]) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionIndex]: value,
        }));
    };

    const handleSubmit = () => {
        // Handle quiz submission logic here
        const results: QuizResult[] = quizData?.questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = Array.isArray(userAnswer)
                ? JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer)
                : userAnswer === question.correctAnswer;
            return {
                question: question.question,
                userAnswer,
                correctAnswer: question.correctAnswer,
                isCorrect,
            };
        }) || [];

        const totalCorrectAnswers = results.filter(result => result.isCorrect).length;
        setTotalMarks(totalCorrectAnswers);
        setQuizResults(results);
        setIsQuizSubmitted(true);
        setIsTimerRunning(false); // Stop the timer
        alert('Quiz submitted!');
    };

    const handleDownloadResults = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Quiz Results', 14, 22);
        doc.setFontSize(12);
        doc.text(`Quiz ID: ${quizId}`, 14, 32);
        doc.text(`Total Marks: ${totalMarks} / ${quizData?.questions.length}`, 14, 42);

        quizResults.forEach((result, index) => {
            const yOffset = 52 + index * 20;
            doc.text(`Question ${index + 1}: ${result.question}`, 14, yOffset);
            doc.text(`Your Answer: ${Array.isArray(result.userAnswer) ? result.userAnswer.join(', ') : result.userAnswer}`, 14, yOffset + 10);
            doc.text(`Correct Answer: ${Array.isArray(result.correctAnswer) ? result.correctAnswer.join(', ') : result.correctAnswer}`, 14, yOffset + 20);
        });

        doc.save(`quiz-results-${quizId}.pdf`);
    };

    if (!quizData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="text-white flex flex-col items-center justify-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center mt-4">
                Quiz
            </h1>
            {isTimerRunning && timer !== null && (
                <div className="mb-4">
                    <p className="text-2xl font-semibold">Time Remaining: {formatTime(timer)}</p>
                </div>
            )}
            <div className="w-full max-w-4xl">
                {isQuizStarted && !isQuizSubmitted && quizData.questions.map((question, index) => (
                    <div key={index} className="p-6 bg-gray-800 rounded-xl shadow-lg mb-6 relative">
                        <div className="mb-4">
                            <label className="text-lg text-gray-300">Question {index + 1}</label>
                            <p className="w-full p-3 bg-gray-700 text-white rounded-md mt-2">
                                {question.question}
                            </p>
                        </div>
                        {question.type === "MCQ" && question.options && (
                            <>
                                {question.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="mb-4">
                                        <label className="flex items-center p-3 bg-gray-700 text-white rounded-md mt-2 hover:bg-gray-600 transition">
                                            <input
                                                type="radio"
                                                name={`question-${index}`}
                                                value={option}
                                                onChange={(e) => handleUserAnswerChange(index, e.target.value)}
                                                disabled={!isQuizStarted}
                                                className="mr-2"
                                            />
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </>
                        )}
                        {question.type === "BLANK" && (
                            <div className="mb-4">
                                <label className="text-lg text-gray-300">Answer</label>
                                <textarea
                                    className="w-full p-3 bg-gray-700 text-white rounded-md mt-2"
                                    rows={3}
                                    onChange={(e) => handleUserAnswerChange(index, e.target.value)}
                                    disabled={!isQuizStarted}
                                />
                            </div>
                        )}
                        {question.type === "QA" && question.answers && (
                            <div className="mb-4">
                                <label className="text-lg text-gray-300">Answers</label>
                                {question.answers.map((answer, answerIndex) => (
                                    <div key={answerIndex} className="flex items-center mb-2">
                                        <input
                                            type="text"
                                            value={userAnswers[index]?.[answerIndex] || ''}
                                            onChange={(e) => handleUserAnswerChange(index, [...(userAnswers[index] || []), e.target.value])}
                                            className="w-full p-3 bg-gray-700 text-white rounded-md mt-2"
                                            placeholder={`Answer ${answerIndex + 1}`}
                                            disabled={!isQuizStarted}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                {isQuizSubmitted && (
                    <div className="p-6 bg-gray-800 rounded-xl shadow-lg mb-6 relative">
                        <h2 className="text-3xl font-bold mb-4">Quiz Results</h2>
                        <p className="text-lg text-gray-300">Total Marks: {totalMarks} / {quizData.questions.length}</p>
                        {quizResults.map((result, index) => (
                            <div key={index} className="mb-4">
                                <p className="text-lg text-gray-300">{result.question}</p>
                                <p className={`text-lg font-semibold ${result.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                                    Your Answer: {Array.isArray(result.userAnswer) ? result.userAnswer.join(', ') : result.userAnswer}
                                </p>
                                {!Array.isArray(result.userAnswer) && result.correctAnswer && (
                                    <p className="text-lg text-gray-300">Correct Answer: {Array.isArray(result.correctAnswer) ? result.correctAnswer.join(', ') : result.correctAnswer}</p>
                                )}
                            </div>
                        ))}
                        <button
                            onClick={handleDownloadResults}
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition mt-4"
                        >
                            Download Results
                        </button>
                    </div>
                )}
                <div className="flex justify-between items-center">
                    {!isQuizStarted && (
                        <button
                            onClick={handleStartQuiz}
                            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition"
                        >
                            Start Quiz
                        </button>
                    )}
                    {isQuizStarted && !isQuizSubmitted && (
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
                        >
                            Submit Quiz
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizPage;