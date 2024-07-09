import { conectaApi } from "./conectaApi.js"; 

const listaProduto = document.querySelector("[data-lista]");

function constroiCard(nome, preco, imagem) {
    const produto = document.createElement("div");
    produto.innerHTML = `<div class="card_produto">
                            <img src="${imagem}" alt="" class= "imagem_produto">
                            <div class="card_conteiner">
                                <p>${nome}</p>
                                <div class="card-preco-delete">
                                <p>$: ${preco}</p>
                                <span class="material-symbols-outlined">delete</span>
                                </div>                            
                            </div>
                        </div>`;
    return produto;
}

async function listaProdutos() {
    try {
        const produtoApi = await conectaApi.listaProdutos();
        produtoApi.forEach(element => listaProduto.appendChild(constroiCard(element.nome, element.preco, element.imagem)));
    } catch (erro) {
        console.error('Erro ao listar produtos:', erro);
    }
}

listaProdutos();

async function adicionarProduto(nome, preco, imagem) {
    try {
        const novoProduto = await conectaApi.criaProduto(nome, preco, imagem);
        listaProduto.appendChild(constroiCard(novoProduto.nome, novoProduto.preco, novoProduto.imagem));
    } catch (erro) {
        console.error('Erro ao adicionar produto:', erro);
    }
}

formNovoProduto.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;
    const imagem = document.getElementById("imagem").value;

    adicionarProduto(nome, preco, imagem);

    formNovoProduto.reset();
});

botaoLimparFormulario.addEventListener("click", () => {
    formNovoProduto.reset();
});

listaProduto.addEventListener("click", async (event) => {
    if (event.target.classList.contains("material-symbols-outlined")) {
        const id = event.target.dataset.id;
        try {
            await conectaApi.deletaProduto(id);
            event.target.closest(".card_produto").remove();
        } catch (erro) {
            console.error('Erro ao deletar produto:', erro);
        }
    }
});