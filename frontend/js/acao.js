function carregarDadosAPI() {
  fetch("http://localhost:5000/nfts/list")
    .then((response) => response.json())
    .then((result) => {
      let linha = "<div class=row>";

      result.output.map((itens, ix) => {
        linha += itens.namenft;
      });

      linha += "</div>";

      document.getElementById("NFTS").innerHTML=linha;
    })
    .catch((erro) => console.error(`Erro ao carregar API -> ${erro}`));
}

window.document.body.onload = () => {
  carregarDadosAPI();
};
