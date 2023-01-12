import axios from 'axios'

const URLBASE = 'https://dummyjson.com/'
let produtos
let divProdutos = document.getElementById('produtos')
let divsProd = ''
let result = document.getElementById('result')
let total

function getProdutos() {
  axios({
    method: 'get',
    url: URLBASE + 'products'
  })
    .then(response => {
      console.log(response.data.total)
      produtos = response.data.products
      total = response.data.total
      showProdutos()
    })
    .catch(error => {
      console.log(error)
    })
}

let cont = 0
function showProdutos() {
  produtos.forEach(produto => {
    cont++
    divsProd =
      divsProd +
      `
    <div class="text-white grid place-items-center border-4 border-sky-400 rounded-xl bg-sky-600 p-4" className="produto-item">
    <img src="${produto.thumbnail}" class="rounded-lg w-60 h-60" alt="" />
    <h5>${produto.title}</h5>
    <div class="p-4" className="produto-preco">
      <p>R$${produto.price}</p>
      <p>${produto.discountPercentage}%</p>
    </div>
    <button class="p-4 border rounded-lg bg-blue-500 hover:bg-orange-600 hover:w-32" className="btn-add">Adicionar</button>
  </div>`
  })
  divProdutos.innerHTML = divsProd
  result.innerHTML = cont + ' Resultados obtidos:'
}

getProdutos()
