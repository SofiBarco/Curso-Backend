const socket = io();

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
      title: "Product added to cart!!!",
      text: `You added  ${productTitle}`,
      toast: true,
      position: "top-right",
      icon: "success",
    });
  })
  .catch((error) => console.log(error));
});