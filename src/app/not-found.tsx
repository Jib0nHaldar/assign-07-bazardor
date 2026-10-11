import Link from "next/link";

const NotFoundPage = () => {
    return (
        <div className="text-3xl text-red-700 flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-7xl font-bold text-red-700">404</h2>
            <h2>পৃষ্ঠা পাওয়া যায়নি। দয়া করে নিশ্চিত করুন যে আপনি সঠিক URL ব্যবহার করছেন!</h2>
            <Link  href="/">
            <button className="btn btn-primary">
             (Home Page) যেতে চাইলে এখানে ক্লিক করুন
            </button>
            </Link>
        </div>
    );
};

export default NotFoundPage;