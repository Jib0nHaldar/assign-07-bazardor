import Image from "next/image";
import Link from "next/link";
import Navlinks from "./Navlinks";

const Navbar = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <>
            <header className="border-b border-gray-200">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-3 sm:flex-row">

                    <div className="flex items-center">
                        <Image
                            src="/logo.jpg"
                            width={50}
                            height={50}
                            alt="logo"
                            className="rounded-lg"
                            priority
                        />

                        <div className="pl-3">
                            <h2 className="text-2xl font-bold sm:text-3xl">
                                বাজার দর
                            </h2>

                            <p className="text-sm font-light text-gray-600">
                                {date}
                            </p>
                        </div>
                    </div>

                    {/* Authentication Buttons */}
                    <div className="flex gap-3">
                        <Link
                            href="/sign-in"
                            className="btn btn-active"
                        >
                            সাইন ইন
                        </Link>

                        <Link
                            href="/sign-up"
                            className="btn btn-active btn-success"
                        >
                            সাইন আপ
                        </Link>
                    </div>
                </div>
            </header>

            <Navlinks />
        </>
    );
};

export default Navbar;

