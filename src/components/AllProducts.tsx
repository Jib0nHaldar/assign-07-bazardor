import { getBengaliUnit, toBengaliNumber } from '@/lib/bengali-utils';

const AllProductsSection = async () => {

    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products"
    );
    const data = await res.json();
    const allProducts = [...data];

    return (
        <section className="mx-auto max-w-6xl px-4 py-10">
           
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    সব পণ্য
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    মোট {toBengaliNumber(allProducts.length)}টি পণ্য দেখানো হচ্ছে
                </p>
            </div>
           
            <div className="grid grid-cols-1 gap-5 rounded-2xl bg-blue-50 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
                {allProducts.map((h) => (
                    <div
                        key={h.id}
                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                        <div className="flex min-h-16 items-center gap-3">
                            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-amber-50 text-2xl">
                                {h.image}
                            </span>

                            <h3 className="text-lg font-bold leading-snug text-gray-800">
                                {h.nameBn}
                            </h3>
                        </div>

                        <div className="mt-2 flex items-end justify-between ">
                            <div>
                                <p className="text-sm text-gray-500">
                                    আজকের দাম
                                </p>

                                <p className="mt-1 text-xl font-bold text-gray-900">
                                    {toBengaliNumber(h.today)} টাকা
                                    <span className="text-sm font-medium text-gray-500">
                                        /{getBengaliUnit(h.unit)}
                                    </span>
                                </p>
                            </div>

                            <span
                                className={`shrink-0 rounded-lg px-2.5 py-1.5 text-sm font-semibold ${h.change.dir === "up"
                                        ? "bg-red-50 text-red-600"
                                        : h.change.dir === "down"
                                            ? "bg-green-50 text-green-600"
                                            : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                {h.change.dir === "up"
                                    ? "▲"
                                    : h.change.dir === "down"
                                        ? "▼"
                                        : "—"}{" "}
                                {toBengaliNumber(h.change.pct)}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>

    );
};

export default AllProductsSection;