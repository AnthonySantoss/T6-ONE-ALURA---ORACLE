export const conectaApi = {
    async listaProdutos() {
        const resposta = await fetch('http://localhost:3000/produtos');
        return resposta.json();
    }
};

async function criarProdutos(nome, preco, imagem){
    const resposta = await fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            preco: preco,
            imagem: imagem
        })
    });

    if (!resposta.ok) {
        throw new Error('Não foi possível criar o produto');
    }

    return resposta.json();

    
}
