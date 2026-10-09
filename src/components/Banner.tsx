import Image from "next/image";
import Link from "next/link";

const Banner = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <section className="mx-auto my-5 flex max-w-6xl flex-col items-center justify-between gap-8 rounded-3xl border border-lime-100 bg-lime-50 px-6 py-10 md:flex-row md:px-10">

            <div className="flex flex-col items-center gap-5 text-center md:items-start md:text-left">

                <p className="rounded-2xl bg-lime-200 px-4 py-2 text-sm font-medium text-lime-700">
                    {date}
                </p>

                <h2 className="text-4xl font-bold leading-tight md:text-5xl">
                    আজকের বাজারের দাম এক
                    <br />
                    নজরে
                </h2>

                <p className="max-w-xl text-gray-700">
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                    বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
                    দামের পরিবর্তন এক জায়গায়।
                </p>

                <Link
                    href="/AllProducts"
                    className="rounded-lg bg-green-600 px-6 py-3 text-lg font-bold text-white transition hover:bg-green-700"
                >
                    সব পণ্য দেখুন
                </Link>
            </div>

            <div className="shrink-0">
                <Image
                    src="/bazar-hero.png"
                    width={330}
                    height={330}
                    alt="বাজারের পণ্য"
                    className="rounded-2xl"
                    priority
                />
            </div>
        </section>
    );
};

export default Banner;

