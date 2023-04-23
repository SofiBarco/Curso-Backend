const removeProductForms = document.querySelectorAll('[id^="removeFromCartForm-"]');
const cartId = document.getElementById("cartId").textContent;

removeProductForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const productId = form.getAttribute("id").split("-")[1];
    const productName = form.querySelector("h5").textContent;

    fetch(`/api/carts/${cartId}/product/${productId}`, {
      method: "DELETE",
    })
      .then(() => {
        Swal.fire({
          title: "Product removed from cart!",
          text: `You removed ${productName}`,
          toast: true,
          position: "top-right",
          icon: "success",
         });
      })
      .catch((error) => console.log(error));
  });
});