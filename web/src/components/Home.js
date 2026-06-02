import React, { useState, useEffect } from 'react';
import '../styles/Home.css'; 

function Home() {
  const [cursos, setCursos] = useState([])
  const [termoPalavra, setTermoPalavra] = useState('')
  const [naoLocalizado, setNaoLocalizado] = useState(false)
  const [mensagemErro, setMensagemErro] = useState('')

  useEffect(() => {
   buscar_cursos()
  }, [])

  async function buscar_cursos() {
     try{
      const response = await fetch("http://localhost:5000/cursos_home")
      const data = await response.json()
      setCursos(data)
    }catch{
      console.log("erro")
    }
  }

async function buscarPorPalavra(e) {
  const palavra = e.target.value; 

  if (!palavra.trim()) {
    buscar_cursos();
    return;
  }

  setCursos([]);
  try {
    const response = await fetch(`http://localhost:5000/buscar_cursos_palavras/${palavra}`);
    const data = await response.json();
    if(data.resultado){
      setNaoLocalizado(true)
      setMensagemErro(data.resultado)
    }
    else{
      setNaoLocalizado(false)
      setCursos(data);
    }
  } catch {
    console.log("erro");
  }
}

  console.log(cursos)

  return (
    <div className="home-wrapper">
      <div className="home-content">
        
        <h1 className="home-title">Bem Vindo!</h1>
        <p className="home-subtitle">Pesquise o curso desejado da Microsoft para realizar!</p>
        
        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Buscar cursos..." 
            onChange={(e) => buscarPorPalavra(e)}
          />
          <button className="search-button">
            Buscar
          </button>
        </div>

        {!naoLocalizado ? (
          <div className="cursos-disponiveis-section">
          <h2 className="section-subtitle">Novos Cursos Disponíveis</h2>
          <div className="cursos-grid">

          {cursos.map((c) => (
            <div className="curso-novo-card" key={c.id || c.titulo}>
              <h4>{c.titulo}</h4>
              <p className="curso-info">{c.resumo}</p>
              <span className="curso-carga">{c.duracao}</span>
              <span className="curso-carga">{c.nivel}</span>
              <button className="btn-inscrever" >Inscrever-se</button>
              <br></br>
              <a className="btn-inscrever" href={c.link}>Ver Curso</a>
            </div>
          ))}
         </div>
        </div>
        ) : (
          <div className="cursos-disponiveis-section">
            {mensagemErro}
          </div>
        )}
        <br></br>
        <br></br>
        <br></br>
        <br></br>

      </div>
    </div>
  );
}

export default Home;