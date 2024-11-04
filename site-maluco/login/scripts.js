document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");
    const message = document.getElementById("message");
  
    // Função para alternar entre Login e Cadastro
    loginButton.addEventListener("click", () => {
      loginForm.style.display = "block";
      registerForm.style.display = "none";
      message.innerText = "";
    });
  
    registerButton.addEventListener("click", () => {
      loginForm.style.display = "none";
      registerForm.style.display = "block";
      message.innerText = "";
    });
  
    // Manipular o formulário de cadastro
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const name = document.getElementById("registerName").value;
      const email = document.getElementById("registerEmail").value;
      const password = document.getElementById("registerPassword").value;
  
      if (name === "" || email === "" || password === "") {
        showMessage("Por favor, preencha todos os campos.", "red");
        return;
      }
  
      // Obter usuários existentes do localStorage
      let users = JSON.parse(localStorage.getItem("users")) || [];
  
      // Verificar se o e-mail já está cadastrado
      const emailExists = users.find((user) => user.email === email);
  
      if (emailExists) {
        showMessage(`Ops! O e-mail "${emailExists.email}" já está em uso com a senha "${emailExists.password}"!`, "orange");
        return;
      }
  
      // Verificar se a senha já está em uso
      const passwordExists = users.find((user) => user.password === password);
  
      if (passwordExists) {
        showMessage(`Que coincidência! Alguém com o e-mail "${passwordExists.email}" já usa a senha "${passwordExists.password}"!`, "purple");
        return;
      }
  
      // Adicionar novo usuário
      users.push({ name: name, email: email, password: password });
      localStorage.setItem("users", JSON.stringify(users));
  
      showMessage("Cadastro realizado com sucesso! Agora você faz parte do clube dos doidos!", "green");
  
      // Limpar o formulário
      registerForm.reset();
    });
  
    // Manipular o formulário de login
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
  
      if (email === "" || password === "") {
        showMessage("Por favor, preencha todos os campos.", "red");
        return;
      }
  
      // Obter usuários existentes do localStorage
      let users = JSON.parse(localStorage.getItem("users")) || [];
  
      // Verificar se o usuário existe e a senha está correta
      const user = users.find((user) => user.email === email && user.password === password);
  
      if (user) {
  // Obter a URL atual
  let currentUrl = window.location.href;

  // Criar um objeto URL
  let url = new URL(currentUrl);

  // Dividir o caminho em segmentos
  let pathSegments = url.pathname.split('/');

  // Encontrar o índice do segmento 'login'
  let loginIndex = pathSegments.indexOf('login');

  if (loginIndex !== -1) {
    // Substituir 'login' por 'home'
    pathSegments[loginIndex] = 'cadastro';
  } else {
    // Caso não encontre 'login', adicionar 'home' no final
    pathSegments.push('cadastro');
  }

  // Atualizar o caminho da URL
  url.pathname = pathSegments.join('/');

  // Redirecionar para a nova URL
  window.location.href = url.href;
      } else {
        showMessage("E-mail ou senha incorretos. Ou será que você esqueceu que está num site doido?", "red");
      }
  
      // Limpar o formulário
      loginForm.reset();
    });
  
    function showMessage(text, color) {
      message.style.color = color;
      message.innerText = text;
    }
  });
  