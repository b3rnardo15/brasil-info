document.addEventListener('DOMContentLoaded', function() {
  const termoBusca = document.getElementById('termo-busca');
  const btnBuscar = document.getElementById('btn-buscar');
  const listaLocais = document.getElementById('lista-locais');
  const detalhesLocal = document.getElementById('detalhes-local');
  const conteudoDetalhes = document.getElementById('conteudo-detalhes');
  const btnVoltar = document.getElementById('voltar');
  const carregando = document.getElementById('carregando'); 
  
  // URL da API - mude para o seu endpoint se necessário
  const API_URL = 'http://localhost:3000/api';
  
  // Carregar todos os locais ao iniciar
  carregarTodosLocais();
  
  // Event Listeners
  btnBuscar.addEventListener('click', realizarBusca);
  termoBusca.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      realizarBusca();
    }
  });
  
  btnVoltar.addEventListener('click', voltarParaLista);
  
  // Funções
  function carregarTodosLocais() {
    exibirCarregando(true);
    fetch(`${API_URL}/locais`)
      .then(response => response.json())
      .then(dados => {
        exibirCarregando(false);
        exibirListaLocais(dados);
      })
      .catch(error => {
        exibirCarregando(false);
        console.error('Erro ao carregar locais:', error);
        listaLocais.innerHTML = '<p class="nenhum-resultado">Erro ao carregar os dados. Verifique se a API está em execução.</p>';
      });
  }
  
  function realizarBusca() {
    const termo = termoBusca.value.trim();
    
    if (termo === '') {
      carregarTodosLocais();
      return;
    }
    
    exibirCarregando(true);
    fetch(`${API_URL}/busca?termo=${encodeURIComponent(termo)}`)
      .then(response => response.json())
      .then(dados => {
        exibirCarregando(false);
        if (dados.length === 0) {
          listaLocais.innerHTML = '<p class="nenhum-resultado">Nenhum resultado encontrado para a sua busca.</p>';
        } else {
          exibirListaLocais(dados);
        }
      })
      .catch(error => {
        exibirCarregando(false);
        console.error('Erro na busca:', error);
        listaLocais.innerHTML = '<p class="nenhum-resultado">Erro ao realizar a busca.</p>';
      });
  }
  
  function exibirListaLocais(locais) {
    listaLocais.innerHTML = '';
    
    locais.forEach(local => {
      const cardLocal = document.createElement('div');
      cardLocal.className = 'card-local';
      cardLocal.innerHTML = `
        <div class="info-principal">
          <h3>${local.nome} - ${local.estado}</h3>
          <span>População: ${local.populacao} milhões</span>
        </div>
        <p>Região: ${local.regiao}</p>
      `;
      
      cardLocal.addEventListener('click', () => exibirDetalhesLocal(local.id));
      listaLocais.appendChild(cardLocal);
    });
  }
  
  function exibirDetalhesLocal(id) {
    exibirCarregando(true);
    fetch(`${API_URL}/locais/${id}`)
      .then(response => response.json())
      .then(local => {
        exibirCarregando(false);
        // Formatar data de fundação
        const dataFundacao = new Date(local.fundacao);
        const dataFormatada = dataFundacao.toLocaleDateString('pt-BR');
        
        conteudoDetalhes.innerHTML = `
          <h2>${local.nome} - ${local.estado}</h2>
          <div class="detalhes-grid">
            <div class="detalhe-item">
              <h4>População</h4>
              <p>${local.populacao} milhões de habitantes</p>
            </div>
            <div class="detalhe-item">
              <h4>Região</h4>
              <p>${local.regiao}</p>
            </div>
            <div class="detalhe-item">
              <h4>Área</h4>
              <p>${local.area.toLocaleString('pt-BR')} km²</p>
            </div>
            <div class="detalhe-item">
              <h4>PIB</h4>
              <p>R$ ${local.pib.toLocaleString('pt-BR')} bilhões</p>
            </div>
            <div class="detalhe-item">
              <h4>IDH</h4>
              <p>${local.idh}</p>
            </div>
            <div class="detalhe-item">
              <h4>Fundação</h4>
              <p>${dataFormatada}</p>
            </div>
          </div>
          
          <div class="pontos-turisticos">
            <h3>Pontos Turísticos</h3>
            <ul>
              ${local.pontosTuristicos.map(ponto => `<li>${ponto}</li>`).join('')}
            </ul>
          </div>
        `;
        
        listaLocais.classList.add('escondido');
        detalhesLocal.classList.remove('escondido');
      })
      .catch(error => {
        exibirCarregando(false);
        console.error('Erro ao carregar detalhes:', error);
        alert('Erro ao carregar os detalhes do local.');
      });
  }
  
  function voltarParaLista() {
    detalhesLocal.classList.add('escondido');
    listaLocais.classList.remove('escondido');
  }
  
  function exibirCarregando(estado) {
    if (estado) {
      carregando.style.display = 'block'; // Exibe o carregamento
    } else {
      carregando.style.display = 'none'; // Esconde o carregamento
    }
  }
});
