'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

interface Question {
    type: "MCQ" | "BLANK" | "QA";
    question: string;
    options?: string[];
    correctAnswer: string;
    answers?: string[];
}

export default function ManualQuiz() {
    const [questions, setQuestions] = useState<Question[]>([
        { type: "MCQ", question: "", options: ["", "", "", ""], correctAnswer: "" }
    ]);

    const [timer, setTimer] = useState(300);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [initialTimer, setInitialTimer] = useState("300");
    const router = useRouter();
    const [quizLink, setQuizLink] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);


    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isTimerRunning && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
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
        return `Time Remaining: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleQuestionChange = (index: number, value: string) => {
        if (!isTimerRunning) {
            const updatedQuestions = [...questions];
            updatedQuestions[index].question = value;
            setQuestions(updatedQuestions);
        }
    };

    const handleOptionChange = (index: number, optionIndex: number, value: string) => {
        if (!isTimerRunning && questions[index].options) {
            const updatedQuestions = [...questions];
            updatedQuestions[index].options![optionIndex] = value;
            setQuestions(updatedQuestions);
        }
    };

    const handleAnswerChange = (index: number, answerIndex: number, value: string) => {
        if (!isTimerRunning) {
            const updatedQuestions = [...questions];
            updatedQuestions[index].answers![answerIndex] = value;
            setQuestions(updatedQuestions);
        }
    };

    const handleCorrectAnswerChange = (index: number, value: string) => {
        if (!isTimerRunning) {
            const updatedQuestions = [...questions];
            updatedQuestions[index].correctAnswer = value;
            setQuestions(updatedQuestions);
        }
    };

    const handleTypeChange = (index: number, value: "MCQ" | "BLANK" | "QA") => {
        if (!isTimerRunning) {
            const updatedQuestions = [...questions];
            updatedQuestions[index] = {
                type: value,
                question: "",
                correctAnswer: "",
                ...(value === "MCQ" ? { options: ["", "", "", ""] } : {}),
                ...(value === "QA" ? { answers: [""] } : {}),
            };
            setQuestions(updatedQuestions);
        }
    };

    const handleAddQuestion = () => {
        if (!isTimerRunning) {
            setQuestions([
                ...questions,
                { type: "MCQ", question: "", options: ["", "", "", ""], correctAnswer: "" }
            ]);
        }
    };

    const handleRemoveQuestion = (index: number) => {
        if (!isTimerRunning) {
            const updatedQuestions = questions.filter((_, i) => i !== index);
            setQuestions(updatedQuestions);
        }
    };

    const handleSubmit = () => {
        const quizId = uuidv4();
        const quizData = { questions, timer: parseInt(initialTimer) };
        localStorage.setItem(`quiz-${quizId}`, JSON.stringify(quizData));
        setIsTimerRunning(false);
        setTimer(parseInt(initialTimer));
        setQuizLink(`/newquiz/${quizId}`);
        setShowPopup(true);
        router.push(`/newquiz/${quizId}`);
    };

    const handleStartQuiz = () => {
        const quizId = uuidv4();
        const quizData = { questions, timer: parseInt(initialTimer) };
        localStorage.setItem(`quiz-${quizId}`, JSON.stringify(quizData));
        setQuizLink(`/newquiz/${quizId}`);
        setShowPopup(true);
        setIsTimerRunning(true);
    };

    const handleTimerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isTimerRunning) {
            const newTimer = parseInt(e.target.value, 10) * 60;
            if (!isNaN(newTimer) && newTimer > 0) {
                setTimer(newTimer);
                setInitialTimer(newTimer.toString());
            }
        }
    };

    return (
        <div className="text-white flex flex-col items-center justify-center px-6">
            {quizLink && (
                <div className="mt-4">
                    <p className="text-lg text-gray-300">Quiz Link:</p>
                    <a href={quizLink} className="text-blue-400 underline">
                        {quizLink}
                    </a>
                </div>
            )}
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center mt-4">
                Create Your Custom Quiz
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
                Choose question types and input the necessary details.
            </p>

            <div className="mb-4">
                <label className="text-lg text-gray-300 mr-2">Set Timer (minutes):</label>
                <input
                    type="number"
                    value={parseInt(initialTimer) / 60}
                    onChange={handleTimerChange}
                    className="p-2 bg-gray-700 text-white rounded-md w-20"
                    disabled={isTimerRunning}
                />
            </div>

            {isTimerRunning && (
                <div className="mb-4">
                    <p className="text-2xl font-semibold">Time Remaining: {formatTime(timer)}</p>
                </div>
            )}

            <div className="w-full max-w-4xl">
                {questions.map((question, index) => (
                    <div key={index} className="p-6 bg-gray-800 rounded-xl shadow-lg mb-6 relative">
                        <div className="mb-4">
                            <label className="text-lg text-gray-300">Question Type</label>
                            <select
                                value={question.type}
                                onChange={(e) => handleTypeChange(index, e.target.value as "MCQ" | "BLANK" | "QA")}
                                className="w-full p-3 bg-gray-700 text-white rounded-md mt-2"
                                disabled={isTimerRunning}
                            >
                                <option value="MCQ">Multiple Choice</option>
                                <option value="BLANK">Fill in the Blanks</option>
                                <option value="QA">Question & Answer</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="text-lg text-gray-300">Question</label>
                            <input
                                type="text"
                                value={question.question}
                                onChange={(e) => handleQuestionChange(index, e.target.value)}
                                className="w-full p-3 bg-gray-700 text-white rounded-md mt-2"
                                placeholder="Enter your question"
                                disabled={isTimerRunning}
                            />
                        </div>

                        {question.type === "MCQ" && question.options && (
                            <>
                                {question.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="mb-4">
                                        <label className="text-lg text-gray-300">Option {optionIndex + 1}</label>
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                            className="w-full p-3 bg-gray-700 text-white rounded-md mt-2"
                                            placeholder={`Enter option ${optionIndex + 1}`}
                                            disabled={isTimerRunning}
                                        />
                                    </div>
                                ))}

                                <div className="mb-4">
                                    <label className="text-lg text-gray-300">Correct Answer</label>
                                    <select
                                        value={question.correctAnswer}
                                        onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                                        className="w-full p-3 bg-gray-700 text-white rounded-md mt-2"
                                        disabled={isTimerRunning}
                                    >
                                        {question.options.map((option, optionIndex) => (
                                            <option key={optionIndex} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        )}

                        {question.type === "BLANK" && (
                            <div className="mb-4">
                                <label className="text-lg text-gray-300">Correct Answer</label>
                                <textarea
                                    value={question.correctAnswer}
                                    onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                                    className="w-full p-3 bg-gray-700 text-white rounded-md mt-2"
                                    placeholder="Enter the correct answer"
                                    rows={3}
                                    disabled={isTimerRunning}
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
                                            value={answer}
                                            onChange={(e) => handleAnswerChange(index, answerIndex, e.target.value)}
                                            className="w-full p-3 bg-gray-700 text-white rounded-md mt-2"
                                            placeholder={`Enter answer ${answerIndex + 1}`}
                                            disabled={isTimerRunning}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={() => handleRemoveQuestion(index)}
                            className={`absolute top-4 right-4 px-3 py-1 ${isTimerRunning ? 'opacity-50 cursor-not-allowed bg-gray-600' : 'bg-red-500 hover:bg-red-600'} text-white text-sm font-semibold rounded-md`}
                            disabled={isTimerRunning}
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <div className="flex justify-between items-center">
                    <button
                        onClick={handleAddQuestion}
                        className={`px-6 py-3 ${isTimerRunning ? 'opacity-50 cursor-not-allowed bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold rounded-lg transition`}
                        disabled={isTimerRunning}
                    >
                        Add Question
                    </button>
                    <button
                        onClick={isTimerRunning ? handleSubmit : handleStartQuiz}
                        className={`px-6 py-3 ${isTimerRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white font-semibold rounded-lg transition`}
                    >
                        {isTimerRunning ? "Submit Quiz" : "Start Quiz"}
                    </button>
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-black">
                        <p className="text-lg mb-4">Quiz Link:</p>
                        <a href={quizLink || ""} className="text-blue-500 underline break-all">
                        {quizLink || "No link available"}                        </a>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}