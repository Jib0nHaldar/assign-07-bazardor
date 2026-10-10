"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {Button,Description,FieldError,Form,Input,Label,TextField,} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
    const router = useRouter();
    const [password, setPassword] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const { data, error } = await authClient.signUp.email({
            name: String(formData.get("name")).trim(),
            email: String(formData.get("email")).trim(),
            password: String(formData.get("password")),
            callbackURL: "/",
        });

        if (error) {
            alert(`Sign up failed: ${error.message}`);
            return;
        }

        if (data) {
            alert("Sign up successful! Please check your email to verify your account.");
            router.push("/");
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-10">
            <Form
                className="flex w-full max-w-md flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
                onSubmit={onSubmit}
            >
                <div className="w-full text-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                        অ্যাকাউন্ট তৈরি করুন
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                    </p>
                </div>

                <TextField
                    isRequired
                    name="name"
                    type="text"
                    validate={(value) => (!value.trim() ? "Name is required" : null)}
                >
                    <Label>নাম</Label>
                    <Input placeholder="Rohim Uddin" />
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) =>
                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                            ? null
                            : "Please enter a valid email address"
                    }
                >
                    <Label>ইমেইল</Label>
                    <Input placeholder="rohim@example.com" />
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    name="password"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    validate={(value) => {
                        if (value.length < 8) return "Password must be at least 8 characters";
                        if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                        if (!/[0-9]/.test(value)) return "Password must contain at least one number";
                        return null;
                    }}
                >
                    <Label>পাসওয়ার্ড</Label>
                    <Input placeholder="Enter your password" />
                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    name="confirmPassword"
                    type="password"
                    validate={(value) => (value !== password ? "Passwords do not match" : null)}
                >
                    <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
                    <Input placeholder="Confirm your password" />
                    <FieldError />
                </TextField>

                <Button type="submit" className="w-full">
                    সাইন আপ
                </Button>

                <div className="w-full text-center text-sm text-gray-600">
                    <span>অ্যাকাউন্ট আছে? </span>
                    <Link href="/signin" className="font-semibold text-green-600 hover:underline">
                        সাইন ইন করুন
                    </Link>
                </div>
            </Form>
        </div>
    );
};

export default SignUpPage;