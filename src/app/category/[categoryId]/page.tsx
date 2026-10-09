
// interface CategoryPageProps {
//     params: Promise<{ categoryId: string }>;
// }

const CategoryPage = async ({params}: {params:{categoryId: string}}) => {

    const {categoryId} = await params;
    console.log(categoryId);
    
    const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products?category=${categoryId}`);

    const data = await res.json();
    console.log(data);
    console.log(data.categoryNameBn);

    return (
        <div>
            <p>{data.categoryNameBn}</p>
            <h2>{data.categoryNameBn}</h2>
        </div>
    );
};

export default CategoryPage;