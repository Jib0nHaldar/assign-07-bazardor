"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {Button,Description,FieldError,Form,Input,Label,TextField,} from "@heroui/react";
import { signUp } from "@/lib/auth-client";

const SignUpPage = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const name = formData.get("name")?.toString().trim() ?? "";
        const email = formData.get("email")?.toString().trim() ?? "";
        const password = formData.get("password")?.toString() ?? "";
        const confirmPassword =
            formData.get("confirmPassword")?.toString() ?? "";

        if (!name) {
            toast.error("Please enter your name.");
            return;
        }

        if (!email) {
            toast.error("Please enter your email.");
            return;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters.");
            return;
        }

        if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain one uppercase letter.");
            return;
        }

        if (!/[0-9]/.test(password)) {
            toast.error("Password must contain one number.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setIsLoading(true);

        try {
            const { data, error } = await signUp.email({
                name,
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || "Signup failed. Please try again.");
                return;
            }

            if (data) {
                toast.success("Account created successfully!");

                router.replace("/");
                router.refresh();
            } else {
                toast.error("Unable to create your account. Please try again.");
            }
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-10">
            <Form
                onSubmit={onSubmit}
                className="flex w-full max-w-md flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
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
                    name="name"
                    isRequired
                    validate={(value) =>
                        !value.trim() ? "Name is required." : null
                    }
                >
                    <Label>নাম</Label>
                    <Input
                        placeholder="Rohim Uddin"
                        autoComplete="name"
                    />
                    <FieldError />
                </TextField>

                <TextField
                    name="email"
                    type="email"
                    isRequired
                    validate={(value) =>
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                            ? null
                            : "Please enter a valid email address."
                    }
                >
                    <Label>ইমেইল</Label>
                    <Input
                        type="email"
                        placeholder="rohim@example.com"
                        autoComplete="email"
                    />
                    <FieldError />
                </TextField>

                <TextField
                    name="password"
                    type="password"
                    isRequired
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters.";
                        }

                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain one uppercase letter.";
                        }

                        if (!/[0-9]/.test(value)) {
                            return "Password must contain one number.";
                        }

                        return null;
                    }}
                >
                    <Label>পাসওয়ার্ড</Label>
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="new-password"
                    />
                    <Description>
                        At least 8 characters, 1 uppercase letter and 1 number.
                    </Description>
                    <FieldError />
                </TextField>

                <TextField
                    name="confirmPassword"
                    type="password"
                    isRequired
                >
                    <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
                    <Input
                        type="password"
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                    />
                    <FieldError />
                </TextField>

                <Button
                    type="submit"
                    className="w-full"
                    isDisabled={isLoading}
                >
                    {isLoading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ"}
                </Button>

                <div className="w-full text-center text-sm text-gray-600">
                    <span>অ্যাকাউন্ট আছে? </span>
                    <Link
                        href="/signin"
                        className="font-semibold text-green-600 hover:underline"
                    >
                        সাইন ইন করুন
                    </Link>
                </div>
            </Form>
        </div>
    );
};

export default SignUpPage;