import axios from "axios";

const URLBASE = "https://dummyjson.com/products/";
const params = new URLSearchParams(window.location.search);
const produtoId = params.get("id");

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

if (produtoId) {
    axios.get(URLBASE + produtoId)
        .then(response => {
            const produto = response.data;
            document.getElementById("produtoImagem").src = produto.thumbnail;
            document.getElementById("produtoTitulo").innerText = produto.title;
            document.getElementById("produtoDescricao").innerText = produto.description;
            document.getElementById("produtoMarca").innerText = produto.brand;
            document.getElementById("produtoPreco").innerText = produto.price;
            document.getElementById("produtoEstoque").innerText = produto.stock;

            // Renderizar avaliações
            const listaAvaliacoes = document.getElementById("listaAvaliacoes");
            listaAvaliacoes.innerHTML = "";

            produto.reviews.forEach(review => {
                const div = document.createElement("div");
                            div.classList.add("p-4", "bg-sky-600", "rounded-lg");
                            div.innerHTML = `
                                <div class="flex justify-between items-center mb-2">
                                    <span class="font-bold text-white">${review.reviewerName}</span>
                                    <span class="text-sm text-gray-300">${new Date(review.date).toLocaleDateString()}</span>
                                    <span class="text-yellow-400">${generateStarRating(review.rating)}</span>
                                </div>
                                <p class="text-white">${review.comment}</p>
                            `;
                            listaAvaliacoes.appendChild(div);
            });
        })
        .catch(error => console.log("Erro ao carregar produto:", error));
} else {
    document.body.innerHTML = "<h1 class='text-center text-red-500'>Produto não encontrado.</h1>";
}
