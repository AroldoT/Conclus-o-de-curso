let lista = [{
  "id": "0001",
  "nome": "Aroldo",
  "senha": "123",
  "nivelPermissao": 3,
  "cargo": "Administrador"
},

{
  "id": "0002",
  "nome": "Fulano",
  "senha": "456",
  "nivelPermissao": 2,
  "cargo": "Gerente"
},

{
  "id": "0003",
  "nome": "Ciclano",
  "senha": "789",
  "nivelPermissao": 1,
  "cargo": "Funcionário"
}
]

console.log(lista)

lista.forEach(function(objeto){
  console.log(objeto.nome)
  console.log(objeto.senha)
})

function logar() {
  try {
    const usuarioInput = document.getElementById('usuario');
    const senhaInput = document.getElementById('usuarioSenha');
    const usuario = usuarioInput.value
    const senha = senhaInput.value
    const modal = document.querySelector('.modal')
    const funcionario = document.getElementById('funcionario')
    lista.forEach(function(objeto){
      if (objeto.nome === usuario && objeto.senha === senha) {
        if (objeto.cargo === "Administrador" && objeto.nivelPermissao === 3) {
          const admin = document.getElementById('admin')
          modal.style = 'display: flex'; 
          admin.style = 'display: flex'
          setTimeout( () =>{
            window.location.href = 'pagina-admin/admin.html'} , 10000);
        }
        else if (objeto.cargo === "Gerente"){
          modal.style = 'display: flex'
          funcionario.style = 'display: flex'
          setTimeout( () => {
            window.location.href = 'pagina-gerente/gerente.html'
          }, 10000)
        }
        else if (objeto.cargo === "Funcionário") {
          modal.style = 'display: flex'
          funcionario.style = 'display: flex'
          setTimeout( () => {
            window.location.href = 'pagina-funcionario/funcionario.html'
          }, 10000) 
        };
      }
      })
  }
  catch(erro) {
    console.error('o erro foi:', erro)
  }
}

// try {
//   const x = lista.forEach(search => lista.search)
//   console.log(x);
// }
// catch (erro) {
//   alert(erro.name)
// }

// const numbers = [1, 2, 3, 4, 5, 6, 7]
// numbers.forEach(myFunction(numbers))

// function myFunction(item, index, arr) {
//   arr[index] = item *10
// }