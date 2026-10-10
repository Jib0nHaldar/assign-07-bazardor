import { getBengaliUnit, toBengaliNumber } from "@/lib/bengali-utils";

const CategoryPage = async ({
    params,
}: {
    params: Promise<{ categoryId: string }>;
}) => {
    const { categoryId } = await params;

    const res = await fetch(
        `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(categoryId)}`
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();

    console.log(data);

    return (
        <section className="mx-auto max-w-6xl px-4 py-10">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    {data[0]?.categoryIcon} {data[0]?.categoryNameBn}
                </h1>

                <p className="mt-2 text-gray-600">
                    মোট {data.length}টি পণ্য দেখানো হচ্ছে
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((h: {
                    id: number;
                    nameBn: string;
                    image: string;
                    categoryIcon: string;
                    today: number;
                    unit: string;
                    change: {
                        dir: string;
                        pct: number;
                    };
                }) => (
                    <article
                        key={h.id}
                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex size-12 items-center justify-center rounded-xl bg-amber-50 text-2xl">
                                {h.image || h.categoryIcon}
                            </span>

                            <h2 className="text-lg font-bold">
                                {h.nameBn}
                            </h2>
                        </div>

                        <div className="mt-5 border-t border-gray-100 pt-4">
                            <p className="text-sm text-gray-500">
                                আজকের দাম
                            </p>

                            <div className="mt-1 flex items-center justify-between gap-2">
                                <p className="text-xl font-bold">
                                    {toBengaliNumber(h.today)} টাকা/
                                    {getBengaliUnit(h.unit)}
                                </p>

                                <span
                                    className={
                                        h.change.dir === "up"
                                            ? "text-sm font-semibold text-red-600"
                                            : h.change.dir === "down"
                                              ? "text-sm font-semibold text-green-600"
                                              : "text-sm font-semibold text-gray-500"
                                    }
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
                    </article>
                ))}
            </div>
        </section>
    );
};

export default CategoryPage;