export const validateForm = (formData, menorDeIdade) => {
  let errors = {};

  if (!formData.nomeCompleto.includes(" ")) {
    errors.nomeCompleto = "Informe nome e sobrenome";
  }
  if (!/\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11}/.test(formData.cpf)) {
    errors.cpf = "CPF inválido";
  }
  if (!/\(\d{2}\) \d{4}-\d{4}/.test(formData.telefoneFixo) && formData.telefoneFixo) {
    errors.telefoneFixo = "Formato inválido";
  }
  if (!/\(\d{2}\) 9\d{4}-\d{4}/.test(formData.celular)) {
    errors.celular = "Formato inválido";
  }
  if (!formData.email.includes("@")) {
    errors.email = "Email inválido";
  }
  if (formData.senha.length < 8) {
    errors.senha = "A senha deve ter pelo menos 8 caracteres";
  } else if (!/[A-Z]/.test(formData.senha) || !/[a-z]/.test(formData.senha) || !/[0-9]/.test(formData.senha) || !/[^A-Za-z0-9]/.test(formData.senha)) {
    errors.senha = "A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais";
  }
  if (formData.senha !== formData.confirmarSenha) {
    errors.confirmarSenha = "As senhas devem coincidir";
  }
  if (menorDeIdade) {
    if (!formData.nomePai) errors.nomePai = "Campo obrigatório";
    if (!formData.nomeMae) errors.nomeMae = "Campo obrigatório";
  }

  return errors;
};

export const validateAge = (data) => {
  const nascimento = new Date(data);
  const hoje = new Date();
  return hoje.getFullYear() - nascimento.getFullYear();
};

export const validateCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false; // Verifica se tem 11 dígitos e se todos são iguais (como 111.111.111-11)
  }

  let soma = 0;
  let resto;

  // Validação do primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  // Validação do segundo dígito verificador
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return false;

  return true;
};
