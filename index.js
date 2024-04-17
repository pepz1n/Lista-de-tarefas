let input = document.getElementById('todos');
let botao = document.getElementById('botao');
let divItens = document.getElementById('divItens')
let cor = document.getElementById('cor')
let corTexto = document.getElementById('cor-texto')
let spanTask = document.getElementById('codTask');

//edit
let corEdit = document.getElementById('cor-edit')
let corTextoEdit = document.getElementById('cor-texto-edit')
let inputEdit = document.getElementById('todos-edit');

let itens = [];
getLocalStorage();

botao.addEventListener('click', (_) => {
  if (input.value.replace(/ /g, '')) {
    itens.push(
      {
        descricao: input.value,
        cor: cor.value,
        corTexto: corTexto.value,
        finalizado: false,
        dataFim: null,
      }
    )
  }
  addLocalStorage();
  addCard();
});

function addCard() {
  divItens.innerHTML = ''
  itens.forEach((objeto, indice) => {
    let { descricao, cor, corTexto, finalizado, dataFim } = objeto;
    let linha = document.createElement('div');
    linha.className = 'row mt-3';
    linha.innerHTML =
    `
      <div class="col-12">
        <div class="card" style="background-color: ${cor}">
          <div class="card-body">
            <div class="row">
              <div class="col-10">
                <span style="color: ${corTexto}; ${finalizado ? 'text-decoration: line-through;' : ''}">
                  ${indice} - ${descricao}
                </span>
                <span style="color: green; font-weight: bolder">
                  ${dataFim ? ` Finalizado em: ${dataFim}` : ''}
                </span>
              </div>
              <div class="col-1">
                <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="edit(${indice})" class="btn btn-primary mr-n12">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  class="bi bi-pen" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"></path>
                  </svg>
                </button>
              </div>
              <div class="col-1">
                <button type="button" onclick="finalizar(${indice})" class="btn btn-success ml-n12">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    divItens.appendChild(linha);
  })
  input.value = '';
}

function excluir(_) {
  const idExclusao = prompt('Informe o numero para Exclusão');
  if (idExclusao.toString().replace(/\D/g, '')) {
    itens.splice(idExclusao, 1);
  }
  addCard();
  addLocalStorage();
}

function getLocalStorage() {
  try {
    itens = JSON.parse(localStorage.getItem('itens'));
    addCard();
  } catch (error) {
    localStorage.setItem('itens', '[]');
  }
}

function addLocalStorage() {
  localStorage.setItem('itens', JSON.stringify(itens));
}

function edit(index) {
  spanTask.innerText = index;
  corEdit.value = itens[index].cor;
  corTextoEdit.value = itens[index].corTexto
  inputEdit.value = itens[index].descricao
}

function saveEdit(index) {
  itens[index] = {
    cor: corEdit.value,
    corTexto: corTextoEdit.value,
    descricao: inputEdit.value,
  };
  addLocalStorage();
  addCard();
}

function finalizar(id) {
  if (itens[id].finalizado) {
    return
  }
  itens[id].finalizado = true;
  let agora = new Date(Date.now()).toISOString().split('T');
  let [ano, mes, dia] = agora[0].split('-');
  let [hora, minuto, segundo] = agora[1].split(':');
  hora -= 3;
  itens[id].dataFim = `${dia}/${mes}/${ano} - ${hora}:${minuto}:${segundo.split('.')[0]}`;
  addLocalStorage();
  addCard();
}
