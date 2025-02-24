"use client";

import { useState } from 'react';

interface Question {
    type: 'MCQ' | 'BLANK' | 'QA';
    question: string;
    options?: string[];
    correctAnswer: string;
}

export default function ManualQuiz() {
    const [questions, setQuestions] = useState<Question[]>([
        { type: 'MCQ', question: '', options: ['', '', '', ''], correctAnswer: '' }
    ]);

    const handleQuestionChange = (index: number, value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (index: number, optionIndex: number, value: string) => {
        if (questions[index].options) {
            const updatedQuestions = [...questions];
            updatedQuestions[index].options![optionIndex] = value;
            setQuestions(updatedQuestions);
        }
    };

    const handleCorrectAnswerChange = (index: number, value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].correctAnswer = value;
        setQuestions(updatedQuestions);
    };

    const handleTypeChange = (index: number, value: 'MCQ' | 'BLANK' | 'QA') => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = {
            type: value,
            question: '',
            correctAnswer: '',
            ...(value === 'MCQ' ? { options: ['', '', '', ''] } : {}),
        };
        setQuestions(updatedQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { type: 'MCQ', question: '', options: ['', '', '', ''], correctAnswer: '' }]);
    };

    const handleSubmit = () => {
        console.log('Submitted Quiz:', questions);
    };

    return (
        <div className="min-h-screen text-white flex flex-col items-center justify-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                Create Your Custom Quiz
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
                Choose question types and input the necessary details.
            </p>

            <div className="w-full max-w-4xl">
                {questions.map((question, index) => (
                    <div key={index} className="p-6 bg-gray-800 rounded-xl shadow-lg mb-6">
                        {/* Question Type Selector */}
                        <div className="mb-4">
                            <label className="text-lg text-gray-300">Question Type</label>
                            <select
                                value={question.type}
                                onChange={(e) => handleTypeChange(index, e.target.value as 'MCQ' | 'BLANK' | 'QA')}
                                className="w-full p-3 bg-gray-700 text-white rounded-md mt-2"
                            >
                                <option value="MCQ">Multiple Choice</option>
                                <option value="BLANK">Fill in the Blanks</option>
                                <option value="QA">Question & Answer</option>
                            </select>
                        </div>

                        {/* Question Input */}
                        <div className="mb-4">
                            <label className="text-lg text-gray-300">Question</label>
                            <input
                                type="text"
                                value={question.question}
                                onChange={(e) => handleQuestionChange(index, e.target.value)}
                                className="w-full p-3 bg-gray-700 text-white rounded-md mt-2"
                                placeholder="Enter your question"
                            />
                        </div>

                        {/* MCQ Options */}
                        {question.type === 'MCQ' && question.options && (
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
                                        />
                                    </div>
                                ))}

                                <div className="mb-4">
                                    <label className="text-lg text-gray-300">Correct Answer</label>
                                    <select
                                        value={question.correctAnswer}
                                        onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                                        className="w-full p-3 bg-gray-700 text-white rounded-md mt-2"
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

                        {/* Fill in the Blank Answer */}
                        {question.type === 'BLANK' && (
                            <div className="mb-4">
                                <label className="text-lg text-gray-300">Correct Answer</label>
                                <input
                                    type="text"
                                    value={question.correctAnswer}
                                    onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                                    className="w-full p-3 bg-gray-700 text-white rounded-md mt-2"
                                    placeholder="Enter the missing word(s)"
                                />
                            </div>
                        )}

                        {/* Question & Answer Field */}
                        {question.type === 'QA' && (
                            <div className="mb-4">
                                <label className="text-lg text-gray-300">Correct Answer</label>
                                <textarea
                                    value={question.correctAnswer}
                                    onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                                    className="w-full p-3 bg-gray-700 text-white rounded-md mt-2"
                                    placeholder="Enter the correct answer"
                                    rows={3}
                                />
                            </div>
                        )}
                    </div>
                ))}

                {/* Buttons for Adding and Submitting */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={handleAddQuestion}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
                    >
                        Add Question
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition"
                    >
                        Submit Quiz
                    </button>
                </div>
            </div>
        </div>
    );
}
