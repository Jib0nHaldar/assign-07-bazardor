
import { toBengaliNumber, getBengaliUnit } from "@/lib/bengali-utils";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
};

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: "up" | "down" | "same";
        pct: number;
    };
    markets: Market[];
};

const ProductsDetailsPage = async ({
    params,
}: {
    params: Promise<{ productsid: string }>;
}) => {
    const { productsid } = await params;

    const res = await fetch(
        `https://openapi.programming-hero.com/api/bazardor/products/${productsid}`,
        {
            next: { revalidate: 60 },
        }
    );

    const product: Product = await res.json();

    const markets = product.markets ?? [];

    const minPrice = markets.length
        ? Math.min(...markets.map((market) => market.min))
        : product.today;

    const maxPrice = markets.length
        ? Math.max(...markets.map((market) => market.max))
        : product.today;

    const averagePrice = markets.length
        ? markets.reduce(
            (sum, market) => sum + (market.min + market.max) / 2,
            0
        ) / markets.length
        : product.today;

    const priceUp = product.change.dir === "up";
    const priceDown = product.change.dir === "down";

    const changeColor = priceUp
        ? "text-red-600"
        : priceDown
            ? "text-green-600"
            : "text-gray-600";

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#F0F5F0] px-4 py-6 sm:px-6">
            <div className="mx-auto max-w-6xl space-y-8">

                <section className="flex flex-col justify-between gap-6 rounded-3xl border border-[#DCE5DC] bg-[#FAFCFA] p-6 sm:flex-row sm:items-center sm:p-8">
                    <div className="flex items-center gap-5">
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-[#F0F5F0] text-5xl">
                            {product.image}
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold text-[#17251B] sm:text-4xl">
                                {product.nameBn}
                            </h1>

                            <p className="mt-1 text-lg text-gray-600">
                                প্রতি {getBengaliUnit(product.unit)} ·{" "}
                                {product.categoryNameBn}
                            </p>

                            <p className="mt-3 text-base text-gray-700">
                                গতকালের তুলনায় আজ দাম{" "}
                                <span className="font-semibold">
                                    {priceUp
                                        ? "বেড়েছে"
                                        : priceDown
                                            ? "কমেছে"
                                            : "অপরিবর্তিত রয়েছে"}
                                </span>{" "}
                                <span className={`font-bold ${changeColor}`}>
                                    {toBengaliNumber(product.change.pct)}%
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="min-w-40 rounded-3xl bg-[#F0F5F0] px-6 py-5 text-center">
                        <p className="text-lg text-gray-600">
                            আজকের দাম
                        </p>

                        <p className="mt-1 text-4xl font-extrabold text-[#17251B]">
                            {toBengaliNumber(product.today)}
                        </p>

                        <p className="text-lg text-gray-600">
                            টাকা / {getBengaliUnit(product.unit)}
                        </p>

                        <p className={`mt-1 font-bold ${changeColor}`}>
                            {priceUp ? "▲" : priceDown ? "▼" : "—"}{" "}
                            {toBengaliNumber(product.change.pct)}%
                        </p>
                    </div>
                </section>

                {/* Price Summary and Market Table */}
                <section className="rounded-3xl border border-[#DCE5DC] bg-[#FAFCFA] p-5 sm:p-7">

                    <h2 className="mb-5 text-2xl font-bold text-[#17251B]">
                        দামের সারসংক্ষেপ
                    </h2>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                        <div className="rounded-3xl border border-[#DCE5DC] p-6">
                            <p className="text-lg text-gray-500">
                                সর্বনিম্ন দাম
                            </p>

                            <p className="mt-1 text-3xl font-bold text-green-600">
                                {toBengaliNumber(minPrice)}{" "}
                                <span className="text-xl font-normal">
                                    টাকা
                                </span>
                            </p>

                            <p className="mt-1 text-gray-500">
                                সবচেয়ে কম দামের বাজার
                            </p>
                        </div>

                        <div className="rounded-3xl border border-[#DCE5DC] p-6">
                            <p className="text-lg text-gray-500">
                                সর্বাধিক দাম
                            </p>

                            <p className="mt-1 text-3xl font-bold text-red-600">
                                {toBengaliNumber(maxPrice)}{" "}
                                <span className="text-xl font-normal">
                                    টাকা
                                </span>
                            </p>

                            <p className="mt-1 text-gray-500">
                                সবচেয়ে বেশি দামের বাজার
                            </p>
                        </div>

                        <div className="rounded-3xl border border-[#DCE5DC] p-6">
                            <p className="text-lg text-gray-500">
                                গড় দাম
                            </p>

                            <p className="mt-1 text-3xl font-bold text-green-600">
                                {toBengaliNumber(
                                    Number(averagePrice.toFixed(2))
                                )}{" "}
                                <span className="text-xl font-normal">
                                    টাকা
                                </span>
                            </p>

                            <p className="mt-1 text-gray-500">
                                প্রতি {getBengaliUnit(product.unit)}-এর হিসাবে
                            </p>
                        </div>
                    </div>

                    {/* Market-wise Prices */}
                    <div className="mt-10">
                        <h2 className="mb-5 text-2xl font-bold text-[#17251B]">
                            বাজারভিত্তিক আজকের দাম
                        </h2>

                        <div className="overflow-x-auto rounded-3xl border border-[#DCE5DC]">
                            <table className="w-full min-w-[650px] border-collapse text-left">
                                <thead className="bg-[#F7FAF7]">
                                    <tr className="text-gray-500">
                                        <th className="px-5 py-5 font-medium">
                                            বাজার
                                        </th>

                                        <th className="px-5 py-5 font-medium">
                                            বিভাগ
                                        </th>

                                        <th className="px-5 py-5 text-right font-medium">
                                            সর্বনিম্ন
                                        </th>

                                        <th className="px-5 py-5 text-right font-medium">
                                            সর্বাধিক
                                        </th>

                                        <th className="px-5 py-5 text-right font-medium">
                                            গড়
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {markets.map((market, index) => {
                                        const marketAverage =
                                            (market.min + market.max) / 2;

                                        return (
                                            <tr
                                                key={`${market.market}-${index}`}
                                                className="border-t border-[#E5EBE5] transition hover:bg-[#F3F7F3]"
                                            >
                                                <td className="px-5 py-5 font-medium text-[#17251B]">
                                                    {market.market}
                                                </td>

                                                <td className="px-5 py-5 text-gray-600">
                                                    {market.division}
                                                </td>

                                                <td className="px-5 py-5 text-right">
                                                    {toBengaliNumber(market.min)} টাকা
                                                </td>

                                                <td className="px-5 py-5 text-right">
                                                    {toBengaliNumber(market.max)} টাকা
                                                </td>

                                                <td className="px-5 py-5 text-right font-bold text-[#17251B]">
                                                    {toBengaliNumber(
                                                        Number(
                                                            marketAverage.toFixed(2)
                                                        )
                                                    )} টাকা
                                                </td>
                                            </tr>
                                        );
                                    })}

                                    {markets.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-5 py-10 text-center text-gray-500"
                                            >
                                                বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                <Link href="/category/{product.categoryId}" className="text-blue-500 hover:underline">
                    সব {product.categoryNameBn} পণ্য দেখুন
                </Link>
            </div>
        </main>
    );
};

export default ProductsDetailsPage;
