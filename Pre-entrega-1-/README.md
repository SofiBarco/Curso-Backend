// Rutas y Request de Postman // Pre-entrega-1 //

// PRODUCTS //

Get-Products = http://localhost:8080/api/products // Trae los productos del Products.json


Add-Products = http://localhost:8080/api/products // Creamos producto y lo agregamos:
"{
     "id": 7,
        "code": "Gd7",
        "title": " Gel ",
        "category": "Cremas_y_Geles",
        "description": "Para todo tipo de pieles, secas, mixtas, normales y grasas con pigmentaciones por: Embarazo, anticonceptivos y radiaciones solares excesivas.",
        "price": 2000,
        "tumbnail": "Sin imagen",
        "stock": 10
}"


Update-product = http://localhost:8080/api/products/3 // Actualiza y modifica producto (No funciona correctamente)
* En este caso realiza la modificacion y actualizacion del producto pero no en la propiedad indicada, ejemplo:
{
        "id": 3,
        "code": {
            "title": "Jabon"
        },
        "title": {
            "price": 5000
        },
        "category": "Vitaminas",
        "description": "Fortalece tu sistema inmune",
        "price": 1000,
        "tumbnail": "Sin imagen",
        "stock": 30
    },
    Alli indique que el producto modificado fuera el de Id:3, y las propiedades fueron:
    {
        "title" : "Jabon" --> en este caso me modifica el "code"
    }
    {
        "price": 5000 --> en este caso me modifica el "title"
    }



    Limit-products-show = http://localhost:8080/api/products?limit=2 //Nos trae 2 productos

// CART //

    Create-Cart = http://localhost:8080/api/carts // Crea un carrito vacio con id autogenerado



    Add-Product-Cart = http://localhost:8080/api/carts/2/product/1 // Agrega producto al carrito (No funciona correctamente)
     *{
    "status": "error",
    "message": "El producto con el id 1 no se encuentra"
    }*
    No reconoce el producto



    Get-CartById = http://localhost:8080/api/carts/2 // Muestra el carrito con id:2
