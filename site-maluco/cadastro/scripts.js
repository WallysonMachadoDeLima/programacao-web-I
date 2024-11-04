document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvasGenero");
  const context = canvas.getContext("2d");
  let isDrawing = false;

  canvas.addEventListener("mousedown", (event) => {
    isDrawing = true;
    context.beginPath();
    context.moveTo(
      event.clientX - canvas.offsetLeft,
      event.clientY - canvas.offsetTop
    );
  });

  canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    context.beginPath();
  });

  canvas.addEventListener("mousemove", (event) => {
    if (isDrawing) {
      draw(event);
      analyzeDrawing();
    }
  });

  function draw(event) {
    context.lineWidth = 2;
    context.lineCap = "round";
    context.strokeStyle = "#000";
    context.lineTo(
      event.clientX - canvas.offsetLeft,
      event.clientY - canvas.offsetTop
    );
    context.stroke();
    context.beginPath();
    context.moveTo(
      event.clientX - canvas.offsetLeft,
      event.clientY - canvas.offsetTop
    );
  }

  function analyzeDrawing() {
    const generos = ["Masculino", "Feminino"];
    const genero = generos[Math.floor(Math.random() * generos.length)];
    document.getElementById("genero").value = genero;
    document.getElementById("generoIdentificado").innerText = genero;
  }

  document.getElementById("limparDesenho").addEventListener("click", () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("generoIdentificado").innerText = "Desenhando...";
    document.getElementById("genero").value = "";
  });

  document.getElementById("gerarNumero").addEventListener("click", () => {
    const numero = generateRandomPhone();
    document.getElementById(
      "numeroAleatorio"
    ).innerText = `Número Gerado: ${numero}`;
    document.getElementById("telefone").value = numero;
  });

  function generateRandomPhone() {
    const prefixo = "+55 9";
    const numero = Math.floor(10000000 + Math.random() * 90000000);
    return `${prefixo}${numero}`;
  }

  const estadoCivilTexto = document.getElementById("estadoCivilTexto");
  const estadoCivilInput = document.getElementById("estadoCivil");

  document.querySelectorAll(".emoji").forEach((emoji) => {
    emoji.addEventListener("click", () => {
      const estadoCivilSelecionado = emoji.getAttribute("data-value");
      estadoCivilTexto.innerText = estadoCivilSelecionado;
      estadoCivilInput.value = estadoCivilSelecionado;
    });
  });

  const emailDisplay = document.getElementById("emailDisplay");
  const alfabetoContainer = document.getElementById("alfabeto");
  const mensagemEmail = document.getElementById("mensagemEmail");
  const verificarButton = document.getElementById("verificarEmail");

  const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  alfabeto.split("").forEach((letra) => {
    const peca = document.createElement("div");
    peca.className = "peca";
    peca.draggable = true;
    peca.innerText = letra;
    peca.setAttribute("data-value", letra.toLowerCase());
    alfabetoContainer.appendChild(peca);
  });

  document.querySelectorAll(".peca").forEach((peca) => {
    peca.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", e.target.getAttribute("data-value"));
    });
  });

  emailDisplay.addEventListener("dragover", (e) => e.preventDefault());

  emailDisplay.addEventListener("drop", (e) => {
    e.preventDefault();
    const value = e.dataTransfer.getData("text");
    emailDisplay.innerText += value;
  });

  verificarButton.addEventListener("click", () => {
    const email = emailDisplay.innerText;
    if (validarEmail(email)) {
      mensagemEmail.innerText = "E-mail válido!";
      mensagemEmail.style.color = "green";
    } else {
      mensagemEmail.innerText =
        "E-mail inválido. Por favor, complete o e-mail.";
      mensagemEmail.style.color = "red";
    }
  });

  function validarEmail(email) {
    const regex = /^[a-z]+@[a-z]+\.(com|org|net)$/;
    return regex.test(email);
  }

  document.getElementById("limparEmail").addEventListener("click", () => {
    emailDisplay.innerText = "";
    mensagemEmail.innerText = "";
  });

  document
    .getElementById("cadastroForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const nome = document.getElementById("nome").value;
      const genero = document.getElementById("genero").value;
      const telefone = document.getElementById("telefone").value;
      const email = emailDisplay.innerText;
      const estadoCivil = estadoCivilInput.value;

      alert(
        `Cadastro realizado com sucesso:\nNome: ${nome}\nGênero: ${genero}\nTelefone: ${telefone}\nE-mail: ${email}`
      );

      window.location.href = "../home/index.html";
    });
});
