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
    const [loading, setLoading] = useState(false); // Added loading state

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation checks
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
        setLoading(true); // Enable loading

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            let data;
try {
    data = await res.json();
} catch (error) {
    console.error("Failed to parse JSON:", error);
    console.log("Response object:", res);
    return setError("Failed to process server response. Please try again.");
}


            console.log("User Signed Up:", data);
            router.push("/home"); // Redirect to home page on successful signup
        } catch (error: any) {
            console.error("Error during signup:", error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false); // Disable loading
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-6">
            <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-300">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 bg-gray-700 text-white rounded-md"
                            placeholder="Enter your name"
                            aria-label="Full Name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 bg-gray-700 text-white rounded-md"
                            placeholder="Enter your email"
                            aria-label="Email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 bg-gray-700 text-white rounded-md"
                            placeholder="Enter your password"
                            aria-label="Password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-500 ${
                            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                        } text-white font-semibold py-3 rounded-md transition`}
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-gray-400 text-center mt-4">
                    Already have an account?{" "}
                    <a href="/authentication/login" className="text-blue-400 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
