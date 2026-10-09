import { toBengaliNumber, getBengaliUnit } from "@/lib/bengali-utils";


const TopIncreasedProducts = async () => {
    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products"
    );

    const data = await res.json();

    //Top 6 highest increased products
    const topIncreasedProducts = [...data]
        .filter((h) => h.change.dir === "up")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    return (
        <>
            <section className="mx-auto max-w-6xl px-4 py-10">

                <div className="mb-6">
                    <h2 className="text-2xl font-bold">
                        <span className="text-red-500">▲</span> আজ দাম বেড়েছে
                    </h2>

                    <p className="mt-2 text-gray-600">
                        যেসব পণ্যের দাম আজ সবচেয়ে বেশি বেড়েছে
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 bg-amber-50 p-5 rounded-2xl">
                    {topIncreasedProducts.map((h, index) => (
                        <div
                            key={h.id}
                            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="flex items-center gap-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl border rounded-box border-gray-300">
                                            {h.image}
                                        </span>

                                        <h3 className="text-xl font-bold">
                                            {h.nameBn}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="mt-5">
                                <p className="text-sm text-gray-500">
                                    আজকের দাম
                                </p>

                                <p className="text-xl font-semibold">
                                    {toBengaliNumber(h.today)} টাকা/
                                    {getBengaliUnit(h.unit)}
                                </p>
                            </div>

                            <div className="mt-4 flex items-center justify-between rounded-xl bg-red-50 px-4 py-3">
                                <span className="text-sm text-gray-600">
                                    মূল্য বৃদ্ধি
                                </span>

                                <span className="font-bold text-red-600">
                                    ▲ {toBengaliNumber(h.change.pct)}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );

};
export default TopIncreasedProducts;

