import React, { useState } from "react";
import "./estilo.css";
import { Mask } from "./masks";
import { validateAge, validateCPF, validateForm } from "./validations";

export const FormPeople = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    dataNascimento: "",
    cpf: "",
    telefoneFixo: "",
    celular: "",
    cep: "",
    endereco: "",
    numero: "",
    cidade: "",
    estado: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    nomePai: "",
    nomeMae: "",
  });

  const [errors, setErrors] = useState({});
  const [menorDeIdade, setMenorDeIdade] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "cpf") {
      newValue = Mask.cpf(value);
      if (newValue.length === 14) {
        setErrors((prevErrors) => ({ ...prevErrors, cpf: validateCPF(newValue.replace(/\D/g, "")) ? "" : "CPF inválido" }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, cpf: "" }));
      }
    }
    if (name === "telefoneFixo") newValue = Mask.telefone(value);
    if (name === "celular") newValue = Mask.celular(value);
    if (name === "cep") newValue = Mask.cep(value);

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: newValue };
      const validationErrors = validateForm(updatedFormData, menorDeIdade);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: validationErrors[name] || "" }));
      return updatedFormData;
    });

    if (name === "dataNascimento") {
      const idade = validateAge(value);
      setMenorDeIdade(idade < 18);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, menorDeIdade);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Dados enviados:", formData);
      alert("Cadastro realizado com sucesso!");
    }
  };

  return (
    <div className="container">
      <form className="formulario" onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
        <h3>Informações Pessoais</h3>
        <input name="nomeCompleto" placeholder="Nome Completo" onChange={handleChange} value={formData.nomeCompleto} />
        <p>{errors.nomeCompleto}</p>

        <input type="date" name="dataNascimento" onChange={handleChange} value={formData.dataNascimento} />
        <p>{errors.dataNascimento}</p>

        <input name="cpf" placeholder="CPF" onChange={handleChange} value={formData.cpf} maxLength="14" />
        <p>{errors.cpf}</p>

        <input name="telefoneFixo" placeholder="Telefone Fixo" onChange={handleChange} value={formData.telefoneFixo} />
        <p>{errors.telefoneFixo}</p>

        <input name="celular" placeholder="Celular" onChange={handleChange} value={formData.celular} />
        <p>{errors.celular}</p>

        {menorDeIdade && (
          <>
            <h3>Informações Complementares</h3>
            <input name="nomePai" placeholder="Nome do Pai" onChange={handleChange} value={formData.nomePai} />
            <p>{errors.nomePai}</p>
            <input name="nomeMae" placeholder="Nome da Mãe" onChange={handleChange} value={formData.nomeMae} />
            <p>{errors.nomeMae}</p>
          </>
        )}

        <h3>Endereço</h3>
        <input name="cep" placeholder="CEP" onChange={handleChange} value={formData.cep} />
        <p>{errors.cep}</p>

        <input name="endereco" placeholder="Endereço" onChange={handleChange} value={formData.endereco} />
        <p>{errors.endereco}</p>

        <input name="numero" placeholder="Número" onChange={handleChange} value={formData.numero} />
        <p>{errors.numero}</p>

        <input name="cidade" placeholder="Cidade" onChange={handleChange} value={formData.cidade} />
        <p>{errors.cidade}</p>

        <input name="estado" placeholder="Estado" onChange={handleChange} value={formData.estado} />
        <p>{errors.estado}</p>

        <h3>Informações da Conta</h3>
        <input name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
        <p>{errors.email}</p>

        <input type="password" name="senha" placeholder="Senha" onChange={handleChange} value={formData.senha} />
        <p>{errors.senha}</p>

        <input type="password" name="confirmarSenha" placeholder="Confirmar Senha" onChange={handleChange} value={formData.confirmarSenha} />
        <p>{errors.confirmarSenha}</p>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
