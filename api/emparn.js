// api/emparn.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const response = await fetch('https://meteorologia.emparn.rn.gov.br/api/riscos-agricolas/exibicao?ano=2024&idCultura=8&idSolo=1&porcentagem=PORCENTAGEM_20');
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();

    const resultado = {
      cultura: {
        id: data.cultura.id,
        nome: data.cultura.nome
      },
      solo: {
        id: data.solo.id,
        nome: data.solo.nome
      }
    };

    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao acessar a API da Emparn' });
  }
};
