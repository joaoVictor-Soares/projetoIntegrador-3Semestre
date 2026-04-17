import { useState } from "react"

function Funcionario() {

const [funcionario] = useState({
nome: "João Silva",
cargo: "Desenvolvedor Júnior",
departamento: "Tecnologia"
})

const [trilhas, setTrilhas] = useState([
{
nome: "Trilha React",
modulos: [
{ nome: "Introdução ao React", concluido: false },
{ nome: "Componentes", concluido: false },
{ nome: "Hooks", concluido: false }
]
},
{
nome: "Trilha Python",
modulos: [
{ nome: "Python Básico", concluido: false },
{ nome: "Flask", concluido: false },
{ nome: "Banco de Dados", concluido: false }
]
}
])

const toggleModulo = (trilhaIndex, moduloIndex) => {

const novasTrilhas = [...trilhas]

novasTrilhas[trilhaIndex]
.modulos[moduloIndex]
.concluido = !novasTrilhas[trilhaIndex]
.modulos[moduloIndex]
.concluido

setTrilhas(novasTrilhas)

}

const calcularProgresso = (modulos) => {

const concluidos = modulos.filter(m => m.concluido).length
return Math.round((concluidos / modulos.length) * 100)

}

return (

<div style={styles.container}>

<h1>Área do Funcionário</h1>

<div style={styles.card}>
<h2>Dados Pessoais</h2>
<p><strong>Nome:</strong> {funcionario.nome}</p>
<p><strong>Cargo:</strong> {funcionario.cargo}</p>
<p><strong>Departamento:</strong> {funcionario.departamento}</p>
</div>

<h2>Suas Trilhas de Aprendizado</h2>

{trilhas.map((trilha, trilhaIndex) => (

<div key={trilhaIndex} style={styles.card}>

<h3>{trilha.nome}</h3>

<p>
Progresso: {calcularProgresso(trilha.modulos)}%
</p>

{trilha.modulos.map((modulo, moduloIndex) => (

<div key={moduloIndex}>

<input
type="checkbox"
checked={modulo.concluido}
onChange={() => toggleModulo(trilhaIndex, moduloIndex)}
/>

{modulo.nome}

</div>

))}

</div>

))}

<div style={styles.card}>
<h2>Novos Cursos Disponíveis</h2>

<ul>
<li>Docker Básico</li>
<li>Git Avançado</li>
<li>TypeScript</li>
<li>Cloud Computing</li>
</ul>

</div>

</div>

)

}

const styles = {

container:{
padding:"20px",
background:"#f5f5f5",
minHeight:"100vh"
},

card:{
background:"white",
padding:"20px",
marginBottom:"20px",
borderRadius:"8px",
boxShadow:"0 0 5px rgba(0,0,0,0.1)"
}

}

export default Funcionario