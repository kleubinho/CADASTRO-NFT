function carregarDadosAPI() {
  fetch("http://localhost:5000/nfts/list")
    .then((response) => response.json())
    .then((result) => {
      let linha = "<div class=content>";

      result.output.map((itens, ix) => {
        linha += ` 
        <div class="card">
        <img
          src="${itens.foto}"
          alt=""
          class="imgNFT"
        />
        <div class="flex">
          <div>
            <p class="nft">SlimHood</p>
            <p class="namenft">${itens.namenft}</p>
          </div>
          <div>
          <p class="pricenft">
          ${itens.preco}
          <img
          class="ethereum"
          src="https://cdn.iconscout.com/icon/free/png-256/ethereum-16-646072.png"
          alt=""
          />
          </p>
          </div>
        </div>
      </div>`;
      });

      linha += "</div>";

      document.getElementById("NFTS").innerHTML = linha;
    })
    .catch((erro) => console.error(`Erro ao carregar API -> ${erro}`));
}

window.document.body.onload = () => {
  carregarDadosAPI();
};
