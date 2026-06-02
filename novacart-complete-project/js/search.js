export function searchProducts(products, query){

    return products.filter(product =>

        product.title
        .toLowerCase()
        .includes(query.toLowerCase())
    );
}
