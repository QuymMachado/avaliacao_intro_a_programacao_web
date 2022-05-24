let btn = document.querySelector('#verSenha')
let btnConfirm = document.querySelector('#verConfirmSenha')

let usuario = document.querySelector('#usuario')
let labelUsuario = document.querySelector('#labelUsuario')
let validUsuario = false

let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false

let confirmSenha = document.querySelector('#confirmSenha')
let labelConfirmSenha = document.querySelector('#labelConfirmSenha')
let validConfirmSenha = false

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

usuario.addEventListener('keyup', () => {
    if(usuario.value.length <= 3){
        labelUsuario.setAttribute('style', 'color: red')
        labelUsuario.innerHTML = '<strong>Usuário *Insira no mínimo 4 caracteres</strong>'
        usuario.setAttribute('style', 'border-color: red')
        validUsuario = false
    }else{
        labelUsuario.setAttribute('style', 'color: green')
        labelUsuario.innerHTML = 'Usuário'
        usuario.setAttribute('style', 'border-color: green')
        validUsuario = true
    }
})

senha.addEventListener('keyup', () => {
    if(senha.value.length <= 5){
        labelSenha.setAttribute('style', 'color: red')
        labelSenha.innerHTML = '<strong>Senha *Insira no mínimo 6 caracteres</strong>'
        senha.setAttribute('style', 'border-color: red')
        validSenha = false
    }else{
        labelSenha.setAttribute('style', 'color: green')
        labelSenha.innerHTML = 'Senha'
        senha.setAttribute('style', 'border-color: green')
        validSenha = true
    }
})

confirmSenha.addEventListener('keyup', () => {
    if(senha.value != confirmSenha.value){
        labelConfirmSenha.setAttribute('style', 'color: red')
        labelConfirmSenha.innerHTML = '<strong>Confirmar senha *As senhas não conferem</strong>'
        confirmSenha.setAttribute('style', 'border-color: red')
        validConfirmSenha = false
    }else{
        labelConfirmSenha.setAttribute('style', 'color: green')
        labelConfirmSenha.innerHTML = 'Confirmar senha'
        confirmSenha.setAttribute('style', 'border-color: green')
        validConfirmSenha = true
    }
})

function cadastrar(){
    if(validUsuario && validSenha && validConfirmSenha){
        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')

        listaUser.push(
            {
                userCad: usuario.value, 
                senhaCad: senha.value,
            }
        )

        localStorage.setItem('listaUser', JSON.stringify(listaUser))


        msgSuccess.setAttribute('style', 'display: block')
        msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>'
        msgError.innerHTML = ''
        msgError.setAttribute('style', 'display: none')

        setTimeout(()=>{
            window.location.href = 'index.html'
        }, 2500)

    }else {
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
        msgSuccess.innerHTML = ''
        msgSuccess.setAttribute('style', 'display: none')
    }
}

btn.addEventListener('click', () =>{
    let inputSenha = document.querySelector('#senha')

    if(inputSenha.getAttribute('type') == 'password'){
        inputSenha.setAttribute('type', 'text')
    }else {
        inputSenha.setAttribute('type', 'password')
    }
})

btnConfirm.addEventListener('click', () =>{
    let inputConfirmSenha = document.querySelector('#confirmSenha')

    if(inputConfirmSenha.getAttribute('type') == 'password'){
        inputConfirmSenha.setAttribute('type', 'text')
    }else {
        inputConfirmSenha.setAttribute('type', 'password')
    }
})