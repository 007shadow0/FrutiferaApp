document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ItemCadastrarForm");
  const tbody = document.querySelector("table tbody");
  const card = document.getElementById("cartoesfrutas");

  // Função para calcular diferença de meses entre duas datas
  function getMonthDifference(startDate, endDate) {
    return (
      endDate.getMonth() -
      startDate.getMonth() +
      12 * (endDate.getFullYear() - startDate.getFullYear())
    );
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // impede o reload da página

    // pega os valores dos campos
    const nomepopular = document.getElementById("nomepopular").value;
    const nomecientifico = document.getElementById("nomecientifico").value;
    const producaomedia = document.getElementById("producaomedia").value;
    let datadoplantio = document.getElementById("datadoplantio").value;

    // se o usuário não escolher data, pega a data atual
    const dataPlantio = datadoplantio ? new Date(datadoplantio) : new Date();

    const dataFormatada = dataPlantio.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // calcula diferença de meses entre o plantio e hoje
    const meses = getMonthDifference(dataPlantio, new Date());

    // adiciona na tabela
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${nomepopular}</td>
      <td>${nomecientifico}</td>
      <td>${producaomedia}</td>
      <td>${dataFormatada}</td>
      <td>${meses} meses</td>
    `;
    tbody.appendChild(newRow);

    // adiciona na seção de cartões
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerHTML = `
      <h3>${nomepopular}</h3>
      <p><strong>Nome Científico:</strong> ${nomecientifico}</p>
      <p><strong>Produção Média:</strong> ${producaomedia}</p>
      <p><strong>Data do Plantio:</strong> ${dataFormatada}</p>
      <p><strong>Idade da planta:</strong> ${meses} meses</p>
    `;
    card.appendChild(newCard);

    // limpa o formulário
    form.reset();
  });
});
