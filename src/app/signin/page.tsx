"use client";

import Link from "next/link";
import {Button, Description,FieldError,Form,Input,Label, TextField,} from "@heroui/react";

const SignInPage = () => {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};

        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
    };

    return (
        <main className="flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50 px-4 py-12">
            <Form
                onSubmit={onSubmit}
                className="flex w-full max-w-md flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl shadow-amber-900/5 sm:p-9"
            >
                {/* Heading */}
                <div className="w-full text-center">

                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                       সাইন ইন
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                        বিস্তারিত দাম, বাজার তুলনা ও আপনার প্রোফাইল দেখতে
                        অ্যাকাউন্টে সাইন ইন করুন।
                    </p>
                </div>

                {/* Email Field */}
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    className="w-full"
                    validate={(value) => {
                        if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                value
                            )
                        ) {
                            return "Please enter a valid email address";
                        }

                        return null;
                    }}
                >
                    <Label className="font-semibold text-gray-700">
                        ইমেইল ঠিকানা
                    </Label>

                    <Input
                        placeholder="rohim@example.com"
                        className="w-full"
                    />

                    <FieldError />
                </TextField>

                {/* Password Field */}
                <TextField
                    isRequired
                    name="password"
                    type="password"
                    className="w-full"
                    validate={(value) => {
                        if (!value) {
                            return "Please enter your password";
                        }

                        return null;
                    }}
                >
                    <Label className="font-semibold text-gray-700">
                        পাসওয়ার্ড
                    </Label>

                    <Input
                        placeholder="আপনার পাসওয়ার্ড লিখুন"
                        className="w-full"
                    />

                    <Description className="text-xs text-gray-500">
                        আপনার অ্যাকাউন্টের পাসওয়ার্ড দিন।
                    </Description>

                    <FieldError />
                </TextField>

                {/* Sign In Button */}
                <Button
                    type="submit"
                    className="w-full rounded-xl bg-green-700 py-3 font-bold text-white shadow-md shadow-amber-500/20 transition hover:bg-green-400"
                >
                    সাইন ইন করুন
                </Button>

                {/* Signup Link */}
                <div className="w-full border-t border-gray-100 pt-5 text-center">
                    <p className="text-sm text-gray-600">
                        নতুন ব্যবহারকারী?{" "}
                        <Link
                            href="/signup"
                            className="font-bold text-green-600 transition hover:text-green-500 hover:underline"
                        >
                            অ্যাকাউন্ট তৈরি করুন
                        </Link>
                    </p>
                </div>
            </Form>
        </main>
    );
};

export default SignInPage;