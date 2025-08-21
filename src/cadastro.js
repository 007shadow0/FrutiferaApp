// chama a div contida no html
const cartas = document.getElementById("cartoesfrutas");

// calcula a idade em meses
const calcularMeses = (dataInicio, dataFim) => {
  return (dataFim.getFullYear() - dataInicio.getFullYear()) * 12 +
         (dataFim.getMonth() - dataInicio.getMonth());
};

// Função de criar os cards
const criarCartao = (itemFruta) => {
  let dataPlantio = new Date(itemFruta.datadoplantio);
  let idadeMeses = calcularMeses(dataPlantio, new Date());
// aqui contem a estrutura do card
  let cartao = `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h6>Identificador: ${itemFruta.id}</h6>
        <h5 class="card-title">${itemFruta.nomepopular} <br>
          <span class="text">${itemFruta.nomecientifico}</span>
        </h5>
        <p class="card-text">Produção média: ${itemFruta.producaomedia} Kg</p>
        <p class="card-text">Data do plantio: ${new Date(itemFruta.datadoplantio).toLocaleDateString("pt-BR")}</p>
        <p class="card-text"><strong>Idade: ${idadeMeses} meses</strong></p>
      </div>
    </div>
  `;

  let outradiv = document.createElement("div");
  outradiv.classList.add("col-md-4");
  outradiv.innerHTML = cartao;
  cartas.appendChild(outradiv);
};

// esta função serve para carregar os cards do localStorage
const carregarCards = () => {
  cartas.innerHTML = "";
  let frutas = JSON.parse(localStorage.getItem("frutas")) ?? [];
  for (let fruta of frutas) {
    criarCartao(fruta);
  }
};

// esta reseta as informações do formulário
const resetarFormulario = (nomepopular = "", nomecientifico = "", producaomedia = "", datadoplantio = "") => {
  document.querySelector("#nomepopular").value = nomepopular;
  document.querySelector("#nomecientifico").value = nomecientifico;
  document.querySelector("#producaomedia").value = producaomedia;
  document.querySelector("#datadoplantio").value = datadoplantio;
};

// Função para enviar o formulário
const enviarFormulario = (evento) => {
  evento.preventDefault();

  let formulario = document.getElementById("ItemCadastrarForm");
  let dadosFormulario = new FormData(formulario);
  let itemFruta = Object.fromEntries(dadosFormulario);

  // Date now gera o id
  itemFruta.id = Date.now();

  // Garantir que exista data de plantio
  if (!itemFruta.datadoplantio) {
    itemFruta.datadoplantio = new Date().toISOString().slice(0, 10);
  }

  // Converter produção para número
  itemFruta.producaomedia = Number(itemFruta.producaomedia);

  // Salvar no localStorage
  let frutas = JSON.parse(localStorage.getItem("frutas")) ?? [];
  frutas.push(itemFruta);
  localStorage.setItem("frutas", JSON.stringify(frutas));

  // Adicionar novo card
  criarCartao(itemFruta);


};

// Associar evento ao formulário
let itemCadastrarForm = document.getElementById("ItemCadastrarForm");
itemCadastrarForm.onsubmit = enviarFormulario;

// Carregar cards ao carregar a página
let body = document.body;
body.onload = carregarCards;
