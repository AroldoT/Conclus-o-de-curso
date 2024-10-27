let materiais = []

fetch ("../arquivos/ferramentas-logistica.json")
  .then(response => {
    if (!response.ok){
      throw new Error('Erro ao buscar os dados');
    }
  return response.json()  
  })
  .then(data => {
    data.forEach(item => {
      materiais.push(item);
    });
    console.log(materiais)
  })
  .catch (error => {
    alert(error.message)
  })

let qtd = []

materiais.forEach(item => {
  qtd.push(item)
})
console.log(qtd)