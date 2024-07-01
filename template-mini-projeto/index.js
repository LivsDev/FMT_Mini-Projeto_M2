document.addEventListener('DOMContentLoaded', () => {

// Função para carregar os interesses do localStorage
function carregarInteresses() {
    const listaInteresses = document.getElementById('interest-list');
    listaInteresses.innerHTML = ''; // Limpa a lista de interesses

    // Recupera os interesses do localStorage
    const interesses = JSON.parse(localStorage.getItem('meus-interesses')) || [];

    // Adiciona cada interesse à lista
    interesses.forEach(interesse => {
        const itemLista = document.createElement('li');
        itemLista.textContent = interesse;
        listaInteresses.appendChild(itemLista);
    });
}

// Função para adicionar um interesse
function adicionarInteresse() {
    const inputInteresse = document.getElementById('interest-input');
    const interesse = inputInteresse.value.trim();

    if (interesse) {
        // Recupera os interesses do localStorage
        const interesses = JSON.parse(localStorage.getItem('meus-interesses')) || [];
        interesses.push(interesse);

        // Salva os interesses de volta no localStorage
        localStorage.setItem('meus-interesses', JSON.stringify(interesses));

        // Limpa o campo de entrada
        inputInteresse.value = '';

        // Carrega a lista de interesses novamente
        carregarInteresses();
    }
}

// Função para limpar a lista de interesses
function limparLista() {
    localStorage.removeItem('meus-interesses');
    carregarInteresses();
}

   // Adiciona evento de clique ao botão "Adicionar"
   document.querySelector('.button-add').addEventListener('click', adicionarInteresse);

   // Adiciona evento de clique ao botão "Limpar lista"
   document.querySelector('.button-clear').addEventListener('click', limparLista);

   // Carrega a lista de interesses quando a página é carregada
   carregarInteresses();

});