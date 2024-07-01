// Adiciona um evento que será disparado quando o conteúdo da página for carregado
document.addEventListener('DOMContentLoaded', () => {

    // Função para carregar os interesses do localStorage
    function carregarInteresses() {
        const listaInteresses = document.getElementById('interest-list');
        listaInteresses.innerHTML = ''; // Limpa a lista de interesses

        // Recupera os interesses armazenados no localStorage
        // Se não houver interesses armazenados, inicializa com um array vazio
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
        const inputInteresse = document.getElementById('interest-input'); // Obtém a referência do campo de entrada de texto
        const interesse = inputInteresse.value.trim(); // Obtém o valor do campo de entrada e remove espaços em branco extras

        // Verifica se o campo de entrada não está vazio
        if (interesse) {

            // Recupera os interesses armazenados no localStorage
            // Se não houver interesses armazenados, inicializa com um array vazio
            const interesses = JSON.parse(localStorage.getItem('meus-interesses')) || [];
            interesses.push(interesse); // Adiciona o novo interesse ao array

            // Armazena o array atualizado de interesses no localStorage
            localStorage.setItem('meus-interesses', JSON.stringify(interesses));

            inputInteresse.value = ''; // Limpa o campo de entrada de texto

            carregarInteresses(); // Recarrega a lista de interesses para incluir o novo interesse
        }
    }

    // Função para limpar a lista de interesses
    function limparLista() {
        localStorage.removeItem('meus-interesses'); // Remove os interesses armazenados no localStorage
        carregarInteresses(); // Carrega a lista de interesses, que agora estará vazia
    }

    // Adiciona evento de clique ao botão "Adicionar"
    document.querySelector('.button-add').addEventListener('click', adicionarInteresse);

    // Adiciona evento de clique ao botão "LIMPAR LISTA"
    document.querySelector('.button-clear').addEventListener('click', limparLista);

     // Atualiza a lista de interesses a cada 1 segundo (1000 milissegundos)
     setInterval(carregarInteresses, 1000);

         // Função para carregar a notícia do IBGE
    function carregarNoticiaIBGE() {
        const url = 'https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release';

        fetch(url)
            .then(response => response.json()) // Converte a resposta para JSON
            .then(data => {
                if (data.items && data.items.length > 0) {
                    const primeiraNoticia = data.items[0]; // Obtém o primeiro item da lista
                    const tituloNoticia = primeiraNoticia.titulo; // Obtém o título da notícia
                    document.querySelector('.title-news-today').textContent = tituloNoticia; 
                    //exibe o título da notícia da página
                }
            })
            .catch(error => {
                console.error('Erro ao carregar a notícia do IBGE:', error); // Trata erros na requisição
            });
    }

      // Carrega a notícia do IBGE quando a página é carregada
      carregarNoticiaIBGE();

    // Carrega a lista de interesses quando a página é carregada
    carregarInteresses();
});