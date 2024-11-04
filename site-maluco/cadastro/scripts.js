document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvasGenero");
  const context = canvas.getContext("2d");
  let isDrawing = false;

  // Evento de desenho para gênero
  canvas.addEventListener("mousedown", (event) => {
    isDrawing = true;
    context.beginPath(); // Inicia um novo caminho quando o desenho começa
    context.moveTo(
      event.clientX - canvas.offsetLeft,
      event.clientY - canvas.offsetTop
    );
  });

  canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    context.beginPath(); // Encerra o caminho atual ao finalizar o traço
  });

  canvas.addEventListener("mousemove", (event) => {
    if (isDrawing) {
      draw(event);
      analyzeDrawing(); // Chama a análise diretamente no movimento do mouse
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

  // Função simulada para análise do desenho
  function analyzeDrawing() {
    // Simulação para análise em tempo real: alterna entre "Masculino" e "Feminino"
    const generos = ["Masculino", "Feminino", "Não identificado"];
    const genero = generos[Math.floor(Math.random() * generos.length)];

    document.getElementById("genero").value = genero;
    document.getElementById("generoIdentificado").innerText = genero;
  }

  // Função para limpar o canvas
  document.getElementById("limparDesenho").addEventListener("click", () => {
    context.clearRect(0, 0, canvas.width, canvas.height); // Limpa o conteúdo do canvas
    document.getElementById("generoIdentificado").innerText = "Desenhando..."; // Redefine o gênero identificado
    document.getElementById("genero").value = ""; // Limpa o valor do campo oculto de gênero
  });

  // Gerador de número aleatório para telefone
  document.getElementById("gerarNumero").addEventListener("click", () => {
    const numero = generateRandomPhone();
    document.getElementById(
      "numeroAleatorio"
    ).innerText = `Número Gerado: ${numero}`;
    document.getElementById("telefone").value = numero;
  });

  function generateRandomPhone() {
    const prefixo = "+55 9";
    const numero = Math.floor(10000000 + Math.random() * 90000000); // Gera 8 dígitos
    return `${prefixo}${numero}`;
  }

  // Envio do formulário
  document
    .getElementById("cadastroForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = document.getElementById("nome").value;
      const genero = document.getElementById("genero").value;
      const telefone = document.getElementById("telefone").value;

      alert(
        `Cadastro realizado com sucesso:\nNome: ${nome}\nGênero: ${genero}\nTelefone: ${telefone}`
      );
    });
});
