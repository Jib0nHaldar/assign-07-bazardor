"use client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";


const SignInPage = () => {

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};
        // Convert FormData to plain object
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });
        alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
    };

    return (
        <div>
            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>

                <h2>সাইন ইন</h2>
                <p>বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>

                <TextField

                    isRequired
                    name="name"
                    type="text"
                    validate={(value) => {
                        if (!value) {
                            return "Name is required";
                        }
                        return null;
                    }}
                >
                    <Label>নাম</Label>
                    <Input placeholder="Rohim Uddin" />
                    <FieldError />
                </TextField>
                <TextField

                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>ইমেইল</Label>
                    <Input placeholder="Rohim@example.com" />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
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
                // validate={(value) => {
                //     if (value !== document.getElementById('password')?.value) {
                //         return "Passwords do not match";
                //     }
                //     return null;
                // }}
                >
                    <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
                    <Input placeholder="Confirm your password" />
                    <FieldError />
                </TextField>

                <div className="flex gap-2">
                    <Button type="submit">
                        {/* <Check /> */}
                        সাইন ইন
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default SignInPage;