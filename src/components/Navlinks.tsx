import Link from "next/link";

interface NavlinksProps {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navlinks = async () => {
    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/categories"
    );

    const data: NavlinksProps[] = await res.json();

    return (
        <div className="flex gap-6 justify-center py-2">
            {data.map((n) => (
                <Link
                    key={n.id}
                    href={`/category/${n.slug}`}
                    className=" text-sm"
                >
                    {n.icon}
                    {n.nameBn}
                </Link>
            ))}
        </div>
    );
};

export default Navlinks;

