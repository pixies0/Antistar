import axios from "axios";

const URLBASE = "https://dummyjson.com/";
let produtos;
let divProdutos = document.getElementById("produtos");
let divsProd = "";
let result = document.getElementById("result");
let total;

function getProdutos() {
  axios({
    method: "get",
    url: URLBASE + "products",
  })
    .then((response) => {
      console.log(response.data.total);
      produtos = response.data.products;
      total = response.data.total;
      showProdutos();
    })
    .catch((error) => {
      console.log(error);
    });
}


function generateStarRating(rating) {
  const maxStars = 5;
  const fullStar = '<i class="fas fa-star"></i>';
  const halfStar = '<i class="fas fa-star-half-alt"></i>';
  const emptyStar = '<i class="far fa-star"></i>';

  let stars = '';

  const roundedRating = Math.round(rating * 2) / 2;

  for (let i = 1; i <= maxStars; i++) {
    if (i <= roundedRating) {
      stars += fullStar;
    } else if (i - 0.5 === roundedRating) {
      stars += halfStar;
    } else {
      stars += emptyStar;
    }
  }

  return stars;
}

let cont = 0;
function showProdutos() {
  produtos.forEach((produto) => {
    cont++;
    const stars = generateStarRating(produto.rating);

    divsProd =
      divsProd +
      `
    <div class="text-white grid place-items-center border-4 border-sky-400 rounded-xl gap-4 bg-sky-600 p-4 " className="produto-item">
    <img src="${produto.thumbnail}" class="rounded-lg h-30 w-30 sm:w-60 sm:h-60" alt="" />
    <h5>${produto.title}</h5>
    <div class="p-1" className="produto-preco">
      <p class="font-bold">R$${produto.price}</p>
    </div>
    <div class="flex gap-1 text-yellow-400">${stars}</div>
    <div class="flex gap-4">
        <button class="p-4 border rounded-lg bg-blue-500 hover:bg-orange-600" className="btn-add">
          <i class="fa-solid fa-cart-plus"></i>
        </button>
        <a href="produto.html?id=${produto.id}">
        <button class="p-4 border rounded-lg bg-blue-500 hover:bg-orange-600">
          <i class="fa-regular fa-eye"></i>
          </button></div>
        </a>
    </div>`;
  });
  divProdutos.innerHTML = divsProd;
  result.innerHTML = cont + " Resultados obtidos:";
}

getProdutos();
