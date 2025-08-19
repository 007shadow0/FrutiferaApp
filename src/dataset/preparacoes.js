let preparacoesCard = JSON.parse(localStorage.getItem("fruteiras")) || [];

let preparacoesCardapio = [];

let inserirPreparacao = (item) => {
  preparacoesCard.push(item);
  localStorage.setItem("fruteiras", JSON.stringify(preparacoesCard));
};

export { preparacoesCard, preparacoesCardapio, inserirPreparacao };
