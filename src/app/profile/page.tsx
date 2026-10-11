"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, UserRound, LogOut, ShieldCheck } from "lucide-react";

const ProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.replace("/signin");
                    router.refresh();
                },
            },
        });
    };

    if (isPending) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }


    const [name, setName] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [message, setMessage] = useState("");

    const handleUpdateProfile = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const updatedName = name.trim();

        if (updatedName.length < 3) {
            setMessage("নাম কমপক্ষে ৩ অক্ষরের হতে হবে।");
            return;
        }

        if (updatedName === user?.name) {
            setMessage("আপনি নতুন কোনো নাম দেননি।");
            return;
        }

        setIsUpdating(true);
        setMessage("");

        try {
            const { error } = await authClient.updateUser({
                name: updatedName,
            });

            if (error) {
                setMessage(error.message || "নাম পরিবর্তন করা যায়নি।");
                return;
            }

            setName("");
            setMessage("আপনার নাম সফলভাবে পরিবর্তন হয়েছে।");
        } catch {
            setMessage("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setIsUpdating(false);
        }
    };


    if (!user) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center p-4">
                <div className="card w-full max-w-sm border border-base-300 bg-base-100 shadow-xl">
                    <div className="card-body items-center text-center">
                        <UserRound size={48} className="text-primary" />
                        <h2 className="card-title">আপনার অ্যাকাউন্ট</h2>
                        <p className="text-base-content/70">
                            প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
                        </p>
                        <Link href="/signin" className="btn btn-primary mt-3">
                            সাইন ইন করুন
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className="flex min-h-[70vh] items-center justify-center bg-base-200 px-4 py-12">
            <div className="card w-full max-w-md overflow-hidden border border-base-300 bg-base-100 shadow-2xl">

                {/* Card Header */}
                <div className="relative flex flex-col items-center bg-primary px-6 pb-14 pt-10 text-primary-content">
                    <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-base-100 bg-base-100 text-4xl font-bold uppercase text-primary shadow-lg">
                        {user.name?.trim()?.charAt(0) || "U"}
                    </div>

                    <h1 className="text-2xl font-bold">
                        {user.name || "ব্যবহারকারী"}
                    </h1>

                    <p className="mt-1 text-sm opacity-90">
                        আপনার প্রোফাইলে স্বাগতম
                    </p>

                    <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 items-center gap-2 rounded-full border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-base-content shadow-md">
                        <ShieldCheck size={18} className="text-success" />
                        <span>আপনার অ্যাকাউন্ট</span>
                    </div>
                </div>

                <div className="card-body gap-5 px-6 pt-10">

                    <h2 className="text-lg font-semibold">
                        অ্যাকাউন্টের তথ্য
                    </h2>

                    <div className="flex items-center gap-4 rounded-xl border border-base-300 bg-base-200 p-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <UserRound size={22} />
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs text-base-content/60">
                                সম্পূর্ণ নাম
                            </p>
                            <p className="truncate font-medium">
                                {user.name || "নাম দেওয়া নেই"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border border-base-300 bg-base-200 p-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Mail size={22} />
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs text-base-content/60">
                                ইমেইল ঠিকানা
                            </p>
                            <p className="break-all font-medium">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-2 flex flex-col gap-3">
                        <Link
                            href="/"
                            className="btn btn-outline w-full"
                        >
                            হোম পেজে ফিরে যান
                        </Link>

                        <button
                            onClick={handleSignOut}
                            className="btn btn-error w-full text-white"
                        >
                            <LogOut size={18} />
                            সাইন আউট
                        </button>
                    </div>

                </div>
            </div>

            {/* Update Username */}
            <form
                onSubmit={handleUpdateProfile}
                className="rounded-xl border border-base-300 bg-base-200 p-4"
            >
                <h3 className="mb-3 font-semibold">
                    নাম পরিবর্তন করুন
                </h3>

                <label
                    htmlFor="username"
                    className="mb-2 block text-sm text-base-content/70"
                >
                    নতুন নাম
                </label>

                <input
                    id="username"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={user.name || "আপনার নাম লিখুন"}
                    minLength={3}
                    required
                    className="input input-bordered w-full"
                />

                {message && (
                    <p className="mt-2 text-sm" role="status">
                        {message}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isUpdating || !name.trim()}
                    className="btn btn-primary mt-3 w-full"
                >
                    {isUpdating ? "আপডেট হচ্ছে..." : "Update Username"}
                </button>
            </form>

        </main>
    );
};

export default ProfilePage;