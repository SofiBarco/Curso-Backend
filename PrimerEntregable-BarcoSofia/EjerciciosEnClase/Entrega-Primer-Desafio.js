class ProductManager{

 constructor () {
    this.products = [];

}

getProducts = () => {
    console.log(this.products);
    return;
};

addProduct = (title, description, price, tumbnail, code, stock) => {

    const productIndex = this.products.findIndex((product) => product.code === code);

    if (!title || !description || !price || !tumbnail || !code || !stock) {
            console.log('Todos los campos deben ser completados!');
            return;
    };


    if(productIndex === -1) {
     const product = {
        id: this.products.length +1,
        title,
        description,
        price: price,
        tumbnail,
        code,
        stock,
    };      
    this.products.push(product);
    console.log('Producto agregado con exito!'); 
    } else {
        console.log('Este producto ya existe, por favor ingrese otro...');
    }
    

    

};


getProductById = (productId) => {
    const productFound = this.products.findIndex((product) => product.id === productId);
    
    if (productFound === -1) {
        console.log(`Product Id: ${productId} Not found`);
    } else{
        console.log(`Product Id: ${productId} exists`);
    }
}


}

const productManager = new ProductManager();

productManager.addProduct('producto prueba', 'Este es un producto prueba', '200', 'Sin Imagen', 'abc123', '25')
productManager.addProduct('Monitor', 'Monitor Dell', '1500', 'Sin imagen', 'mn234', '10');
productManager.addProduct('Monitor', 'Monitor Dell', '1500', 'Sin imagen', 'mn234', '10');//producto code repetido= 'Este producto ya existe, por favor ingrese otro...'

productManager.addProduct('CPU', 'CPU Dell', '5000', '10'); //producto sin todos los campos completos= 'Todos los campos deben ser completados!'

productManager.getProductById(1, 1);
productManager.getProductById(4, 1);// producto id no encontrado= 'Product Id: ... Not foud'
productManager.getProducts();
