
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Dados estáticos sobre localidades brasileiras
const locais = [
  {
    id: 1,
    nome: "São Paulo",
    estado: "SP",
    regiao: "Sudeste",
    populacao: 12.33,
    area: 1521.11,
    pib: 699.29,
    idh: 0.805,
    fundacao: "1554-01-25",
    pontosTuristicos: ["Avenida Paulista", "Parque Ibirapuera", "MASP"]
  },
  {
    id: 2,
    nome: "Rio de Janeiro",
    estado: "RJ",
    regiao: "Sudeste",
    populacao: 6.75,
    area: 1200.18,
    pib: 350.54,
    idh: 0.799,
    fundacao: "1565-03-01",
    pontosTuristicos: ["Cristo Redentor", "Pão de Açúcar", "Copacabana"]
  },
  {
    id: 3,
    nome: "Salvador",
    estado: "BA",
    regiao: "Nordeste",
    populacao: 2.89,
    area: 693.28,
    pib: 63.5,
    idh: 0.759,
    fundacao: "1549-03-29",
    pontosTuristicos: ["Pelourinho", "Elevador Lacerda", "Farol da Barra"]
  },
  {
    id: 4,
    nome: "Brasília",
    estado: "DF",
    regiao: "Centro-Oeste",
    populacao: 3.05,
    area: 5802.10,
    pib: 254.82,
    idh: 0.824,
    fundacao: "1960-04-21",
    pontosTuristicos: ["Congresso Nacional", "Catedral", "Torre de TV"]
  },
  {
    id: 5,
    nome: "Fortaleza",
    estado: "CE",
    regiao: "Nordeste",
    populacao: 2.67,
    area: 313.14,
    pib: 67.02,
    idh: 0.754,
    fundacao: "1726-04-13",
    pontosTuristicos: ["Praia de Iracema", "Beach Park", "Mercado Central"]
  },
  {
    id: 6,
    nome: "Belo Horizonte",
    estado: "MG",
    regiao: "Sudeste",
    populacao: 2.52,
    area: 331.40,
    pib: 91.77,
    idh: 0.810,
    fundacao: "1897-12-12",
    pontosTuristicos: ["Praça da Liberdade", "Mineirão", "Mercado Central"]
  },
  {
    id: 7,
    nome: "Manaus",
    estado: "AM",
    regiao: "Norte",
    populacao: 2.22,
    area: 11401.09,
    pib: 78.20,
    idh: 0.737,
    fundacao: "1669-10-24",
    pontosTuristicos: ["Teatro Amazonas", "Encontro das Águas", "MUSA"]
  },
  {
    id: 8,
    nome: "Curitiba",
    estado: "PR",
    regiao: "Sul",
    populacao: 1.95,
    area: 435.04,
    pib: 87.15,
    idh: 0.823,
    fundacao: "1693-03-29",
    pontosTuristicos: ["Jardim Botânico", "Museu Oscar Niemeyer", "Parque Barigui"]
  },
  {
    id: 9,
    nome: "Recife",
    estado: "PE",
    regiao: "Nordeste",
    populacao: 1.65,
    area: 218.43,
    pib: 102.35,
    idh: 0.794,
    fundacao: "1537-03-12",
    pontosTuristicos: ["Praia de Boa Viagem", "Instituto Ricardo Brennand", "Marco Zero"]
  }
];
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});
// Rota para obter todos os locais
app.get('/api/locais', (req, res) => {
  res.json(locais);
});

// Rota para obter um local específico por ID
app.get('/api/locais/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const local = locais.find(local => local.id === id);
  
  if (local) {
    res.json(local);
  } else {
    res.status(404).json({ message: 'Local não encontrado' });
  }
});

// Rota para buscar locais por nome
app.get('/api/busca', (req, res) => {
  const termo = req.query.termo?.toLowerCase();
  
  if (!termo) {
    return res.status(400).json({ message: 'Parâmetro de busca não fornecido' });
  }
  
  const resultados = locais.filter(local => 
    local.nome.toLowerCase().includes(termo) || 
    local.estado.toLowerCase().includes(termo)
  );
  
  res.json(resultados);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
