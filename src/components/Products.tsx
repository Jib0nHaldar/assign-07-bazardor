

const Products = async() => {

    const res = fetch("https://api.abcz.workers.dev/api/bazardor/products");
    const data = await (await res).json();
    console.log(data);

    return (
        <div>
            <p>▲ আজ দাম বেড়েছে</p>
        </div>
    );
};

export default Products;