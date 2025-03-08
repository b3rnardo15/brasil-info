# Brasil Info - Informações sobre Localidades Brasileiras

Este é um projeto acadêmico que implementa uma aplicação web simples para buscar e exibir informações sobre cidades brasileiras.

## Funcionalidades

- Busca por cidades ou estados brasileiros
- Exibição de informações detalhadas sobre cada localidade:
  - População
  - Área
  - PIB
  - IDH
  - Data de fundação
  - Pontos turísticos

## Tecnologias Utilizadas

- **Backend**: Node.js e Express
- **Frontend**: HTML, CSS e JavaScript puro (sem frameworks)

## Estrutura do Projeto

```
brasil-info/
├── backend/
│   └── index.js
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── package.json
└── README.md
```

## Como Executar

### Pré-requisitos

- Node.js instalado (versão 14 ou superior)
- npm (geralmente vem com o Node.js)

### Passo a passo

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/brasil-info.git
   cd brasil-info
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Inicie o servidor:
   ```
   npm start
   ```

4. Abra o frontend:
   - Navegue até a pasta `frontend`
   - Abra o arquivo `index.html` em qualquer navegador
   - Ou você pode usar uma extensão como Live Server no VSCode



## API Endpoints

- `GET /api/locais` - Retorna todas as localidades
- **Exemplo de resposta:**
 ```json
 [
   {
     "id": 1,
     "nome": "São Paulo",
     "populacao": 12300000,
     "area": 1521,
     "pib": 500000000000,
     "idh": 0.80,
     "data_fundacao": "1554-01-25",
     "pontos_turisticos": ["Avenida Paulista", "Ibirapuera", "Museu do Futebol"]
   }
 ]
 ```

- `GET /api/locais/:id` - Retorna uma localidade específica pelo ID
- `GET /api/busca?termo=XXX` - Busca localidades pelo nome ou estado

## Próximos Passos (Possíveis Melhorias)

- Adicionar mais dados sobre cada localidade
- Implementar filtragem por região
- Adicionar um mapa interativo
- Criar um sistema de favoritos


## Licença

Este projeto está sob a licença MIT.