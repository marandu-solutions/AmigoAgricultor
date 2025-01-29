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

    // Adicionando os headers de CORS
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permite todas as origens (você pode restringir para um domínio específico, se necessário)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Cabeçalhos permitidos

    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao acessar a API da Emparn' });
  }

};
