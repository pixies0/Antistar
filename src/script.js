import axios from 'axios'

const URLBASE = 'https://dummyjson.com/'
let produtos
let divProdutos = document.getElementById('produtos')
let divsProd = ''

function getProdutos() {
  axios({
    method: 'get',
    url: URLBASE + 'products'
  })
    .then(response => {
      // console.log(response.data.products)
      produtos = response.data.products
      showProdutos()
    })
    .catch(error => {
      console.log(error)
    })
}

function showProdutos() {
  produtos.forEach(produto => {
    divsProd =
      divsProd +
      `
    <div class="grid place-items-center border rounded-3xl bg-green-400" className="produto-item">
    <img src="${produto.thumbnail}" class="w-60 h-60" alt="" />
    <h5>${produto.title}</h5>
    <div className="produto-preco">
      <p>${produto.price}</p>
      <p>${produto.discountPercentage}%</p>
    </div>
    <button class="" className="btn-add">Adicionar</button>
  </div>`
  })
  divProdutos.innerHTML = divsProd
}

getProdutos()
