"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            setError("All fields are required!");
            return;
        }

        if (!validateEmail(formData.email)) {
            setError("Invalid email format!");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters!");
            return;
        }

        setError("");
        console.log("User Signed Up:", formData);

        // Redirect to login or dashboard after signup
        router.push("/home");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-6">
            <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 bg-gray-700 text-white rounded-md"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 bg-gray-700 text-white rounded-md"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 bg-gray-700 text-white rounded-md"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-gray-400 text-center mt-4">
                    Already have an account?{" "}
                    <a href="/auth/login" className="text-blue-400 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
