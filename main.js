const formCep = document.querySelector("#form-cep");

formCep.addEventListener("submit", (e) => {
  e.preventDefault();
  let cepInputValeu = document.querySelector("#cep-input").value;
  const cepInputDiv = document.querySelector("#cep-input-div");
  const cepInput = document.querySelector("#cep-input");
  const responseContainer = document.querySelector("#response-container");
  responseContainer.innerHTML = "";
  let regexSemHifen = /^[0-9]{8}$/;
  let regexComHifen = /^[0-9]{5}[-][0-9]{3}$/;
  if (regexComHifen.test(cepInputValeu) || regexSemHifen.test(cepInputValeu)) {
    if (regexComHifen.test(cepInputValeu)) {
      cepInputValeu = cepInputValeu.replace("-", "");
    }
    const URL = `https://viacep.com.br/ws/${cepInputValeu}/json/`;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        if (!("erro" in data)) {
          const listaExibicao = {
            cep: "CEP",
            logradouro: "Logradouro",
            complemento: "Complemento",
            bairro: "Bairro",
            localidade: "Município",
            estado: "Unidade Fedeativa",
            ddd: "DDD",
            ibge: "IBGE",
          };
          for (let prop in data) {
            if (!data[prop] == "" && listaExibicao[prop]) {
              responseContainer.innerHTML += `
                    <div class="div-${prop}">
                    <h4 class="h5 title" id="${prop}-title">${listaExibicao[prop]}</h4>
                    <p id="${prop}-content" class="text-light">${data[prop]}</p>
                    </div>
                    `;
            }
          }
          cepInput.classList.remove("is-invalid");
          cepInputDiv.classList.remove("is-invalid");
        } else {
          cepInput.classList.add("is-invalid");
          cepInputDiv.classList.add("is-invalid");
        }
      });
  } else {
    cepInput.classList.add("is-invalid");
    cepInputDiv.classList.add("is-invalid");
  }
});
