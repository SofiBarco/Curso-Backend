
const cartForms = document.querySelectorAll('addToCartForm');
import Swal from 'sweetalert2';

cartForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const [_, cartId, productId] = form.getAttribute("id").split("-");
    const productTitle = form.closest("div").querySelector("h5").textContent;

    fetch(`/api/carts/${cartId}/product/${productId}`, {
      method: "POST",
    })
      .then(() => {
        Swal.fire({
          title: "Product added to cart",
          text: `You added 1 unit of ${productTitle}`,
          toast: true,
          position: "top-right",
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
});