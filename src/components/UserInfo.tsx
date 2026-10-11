"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const UserInfo = () => {

    const { data: session } = authClient.useSession();
    const user = session?.user;
    console.log("User Info:", user);

    const handleSignOut = async () => {
        try {
            await authClient.signOut();
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
      <div className="flex items-center">
            {user ? (
                <div className="flex items-center gap-3 rounded-full border border-base-300 bg-base-100 py-1 pl-1 pr-3 shadow-sm">
                    <div className="avatar placeholder">
                        <div className="w-9 rounded-full bg-primary text-primary-content">
                            <span className="text-sm font-semibold uppercase">
                                {user.name?.charAt(0)}
                            </span>
                        </div>
                    </div>
                    <h2 className="max-w-[140px] truncate text-sm font-medium">
                        {user.name}
                    </h2>
                    <button
                        onClick={handleSignOut}
                        className="btn btn-sm btn-outline btn-error rounded-full"
                    >
                        সাইন আউট
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <Link
                        href="/signin"
                        className="btn btn-sm btn-outline rounded-full px-5"
                    >
                        সাইন ইন
                    </Link>
                    <Link
                        href="/signup"
                        className="btn btn-sm btn-success rounded-full px-5 shadow-md"
                    >
                        সাইন আপ
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserInfo;