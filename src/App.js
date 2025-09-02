import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [cep, setCep] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Função para consultar o CEP na API ViaCEP
  const consultarCep = async () => {
    setError("");
    setResult(null);

    const cepLimpo = cep.replace(/\D/g, ""); // Remove tudo que não é número
    if (cepLimpo.length !== 8) {
      setError("Por favor, insira um CEP válido com 8 dígitos.");
      return;
    }

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();

      if (data.erro) {
        setError("CEP não encontrado.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Erro ao consultar o CEP. Tente novamente.");
    }
  };

  return (
    <div className="app-container">
      <h1>Consulta de CEP</h1>
      <input
        type="text"
        placeholder="Digite o CEP (somente números)"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        maxLength={9}
      />
      <button onClick={consultarCep}>Consultar</button>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="resultado">
          <h2>Resultado:</h2>
          <p><strong>CEP:</strong> {result.cep}</p>
          <p><strong>Logradouro:</strong> {result.logradouro}</p>
          <p><strong>Bairro:</strong> {result.bairro}</p>
          <p><strong>Cidade:</strong> {result.localidade}</p>
          <p><strong>Estado:</strong> {result.uf}</p>
        </div>
      )}
    </div>
  );
}
