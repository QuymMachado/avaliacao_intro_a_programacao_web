let userLogado = JSON.parse(localStorage.getItem('userLogado'))

let logado = document.querySelector('#logado')

if(userLogado == null){
    alert('Você precisa estar logado para acessar essa página')
    window.location.href = 'index.html'
}

logado.innerHTML = `Olá ${userLogado.user}!`

if(localStorage.getItem('token') == null){
    alert('Você precisa estar logado para acessar essa página')
    window.location.href = 'index.html'
}

function sair(){
    localStorage.removeItem('token')
    localStorage.removeItem('userLogado')
    window.location.href = 'index.html'
}

const form = document.querySelector('#infos-recados');
const tabela = document.querySelector('#tbody');
let idx = form.idx.value;

const atualizarLocalStorage = (recados) => {localStorage.setItem('recados', JSON.stringify(recados))}

const recuperarLocalStorage = () => JSON.parse(localStorage.getItem('recados')|| '[]');

const salvarRecado = (e) =>{
    e.preventDefault()
    const descricao = form.descricao.value;
    const detalhamento = form.detalhamento.value;

    if(idx == 'novo'){
        const recados = recuperarLocalStorage();
        recados.push({id:recados.length + 1, descricao, detalhamento});
        atualizarLocalStorage(recados);
        preencherTabela();
        form.reset();
    }else{
        let recados = {id: idx, descricao, detalhamento}

        atualizarRecado(idx, recados);
        preencherTabela();
        form.reset();
        idx = 'novo'; 
    }

}

const preencherTabela = () =>{
    const recados = recuperarLocalStorage();
    tabela.innerHTML = '';
    for(const recado of recados){ 
        tabela.innerHTML += `

            <tr>
                <th scope="row">${recado.id}</th>
                <td>${recado.descricao}</td>
                <td>${recado.detalhamento}</td>
                <td>
                    <button id="btnDeletar" onclick="removerRecado(${recado.id})">Deletar</button>
                    <button id="btnEditar" onclick="editarRecado(${recado.id})">Editar</button>
                </td>
            </tr>
    
        `;
    }
}

const removerRecado = (id) =>{
    const recados = recuperarLocalStorage();
    const indexRecado = recados.findIndex((recado) => recado.id === id)
    if(indexRecado < 0) return;
    recados.splice(indexRecado, 1);
    atualizarLocalStorage(recados);
    alert('Recado removido')
    preencherTabela();
}


const atualizarRecado = (id, recado) => {
    const recados = recuperarLocalStorage();
    const indexRecado = recados.findIndex((r) => r.id === id);
    recados[indexRecado] = recado;
    atualizarLocalStorage(recados);
}

const editarRecado = (id) =>{
    const recados = recuperarLocalStorage();
    const indexRecado = recados.findIndex((recado) => recado.id === id)
    form.descricao.value = recados[indexRecado].descricao;
    form.detalhamento.value = recados[indexRecado].detalhamento;
    idx = id;//muda o valor do idx que é global
}

form === null || form === void 0 ? void 0 : form.addEventListener('submit', salvarRecado);
document.addEventListener('DOMContentLoaded', preencherTabela);