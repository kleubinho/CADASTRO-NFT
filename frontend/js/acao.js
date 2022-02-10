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
        <div>
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
          <a class="button-delete" href="delete.html?id=${itens.idproduto}">Apagar</a>
          <a class="button-update" href="update.html?id=${itens.idproduto}">Atualizar</a>
        </div>
      </div>`;
      });

      linha += "</div>";

      document.getElementById("NFTS").innerHTML = linha;
    })
    .catch((erro) => console.error(`Erro ao carregar API -> ${erro}`));
}

function cadastrar() {
  let nome = document.getElementById("txtNomeNft").value;
  let descricao = document.getElementById("txtDescricao").value;
  let preco = document.getElementById("txtPreco").value;
  let foto = document.getElementById("txtFoto").value;

  fetch("http://localhost:5000/nft/register", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      namenft: nome,
      descricao: descricao,
      preco: preco,
      foto: foto,
    }),
  })
    .then((response) => response.json())
    .then((dados) => {
      console.log(dados);
      alert(
        `Dados cadastrados com sucesso!\n Id gerado: ${dados.output.insertId}`
      );
      document.getElementById("txtNomeNft").value = "";
      document.getElementById("txtDescricao").value = "";
      document.getElementById("txtPreco").value = "";
      document.getElementById("txtFoto").value = "";
    })
    .catch((erro) => console.error(`Erro ao cadastrar produto -> ${erro}`));
}

function carregaratualizar() {
  // Obter id passado na barra de endereço
  var id = window.location.search.substring(4);
  alert(id);

  // Vamos fazer uma busca para receber o produto especifico e carregar o formulário com dados
  fetch(`http://localhost:5000/nft/buscar/${id}`)
  .then((response)=>response.json())
  .then((dados)=>{
    document.getElementById("txtNomeNft").value = dados.output.namenft;
    document.getElementById("txtDescricao").value = dados.output.descricao;
    document.getElementById("txtPreco").value = dados.output.preco;
    document.getElementById("txtFoto").value = dados.output.foto;
  })
  .catch((erro)=>console.error(`Erro ao carregar a api -> ${erro}`))
}

window.document.body.onload = () => {
  carregarDadosAPI();
};
