import Marquee from "react-fast-marquee";


type Product = {
    id: number;
    nameBn: string;
    categoryIcon: string;
    unit: string;
    today: number;
    change: {
        dir: "up" | "down" | "stable";
        pct: number;
    };
};

const MarqueeComponent = async () => {
    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products"
    );

    const data: Product[] = await res.json();

    const toBengaliNumber = (value: number | string) => {
        const bengaliDigits = "০১২৩৪৫৬৭৮৯";

        return value
            .toString()
            .replace(/\d/g, (digit) => bengaliDigits[Number(digit)]);
    };

    const getBengaliUnit = (unit: string) => {
        const units: Record<string, string> = {
            kg: "কেজি",
            liter: "লিটার",
            litre: "লিটার",
            piece: "পিস",
            dozen: "ডজন",
        };

        return units[unit] || unit;
    };

    const changedProducts = data.filter(
        (h) => h.change.dir === "up" || h.change.dir === "down"
    );

    return (
        <div className="w-full overflow-hidden border-y border-amber-300">
            <Marquee
                direction="left"
                speed={150}
                loop={0}
                pauseOnHover={true}
            >
                <div className="flex items-center gap-10 py-2">
                    {changedProducts.map((h) => (
                        <div
                            key={h.id}
                            className="flex items-center gap-2 whitespace-nowrap"
                        >
                            <span>{h.categoryIcon}</span>

                            <span>{h.nameBn}</span>

                            <span className="font-semibold">
                                {toBengaliNumber(h.today)} টাকা/
                                {getBengaliUnit(h.unit)}
                            </span>

                            {/* Price change */}
                            <span
                                className={
                                    h.change.dir === "up"
                                        ? "font-semibold text-red-600"
                                        : "font-semibold text-green-600"
                                }
                            >
                                {h.change.dir === "up" ? "▲" : "▼"}{" "}
                                {toBengaliNumber(h.change.pct)}%
                            </span>
                        </div>
                    ))}
                </div>
            </Marquee>
        </div>
    );
};

export default MarqueeComponent;

