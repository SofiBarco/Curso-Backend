const socket = io();

const home = document.getElementById("home");
const formButton = document.getElementById('botonForm');

formButton.addEventListener("click", (e) => {
  e.preventDefault();
  const cartId = document.querySelector("#cid").value;
  const productIdElem = document.getElementById('productId');
  const productId = productIdElem.innerText.split(" ")[4];
  const productTitleElem = document.getElementById("title");
  const productTitle = productTitleElem.innerHTML;

  fetch(`/api/carts/${cartId}/product/${productId}`, {
    method: "POST",
  })
  .then(() => {
    Swal.fire({
      title: "Producto agregado con exito!",
      text: `Has agregado:  ${productTitle}`,
      toast: true,
      position: "top-right",
      icon: "success",
    });
  })
  .catch((error) => console.log(error));
});

home.addEventListener("click", (e) =>{
  e.preventDefault();
  window.location.href = "/products";
})