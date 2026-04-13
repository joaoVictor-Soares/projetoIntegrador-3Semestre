import { useState } from "react"

function RH() {

const [funcionarios, setFuncionarios] = useState([
{
nome: "João Silva",
cargo: "Desenvolvedor",
progresso: 70
},
{
nome: "Maria Souza",
cargo: "Analista",
progresso: 40
},
{
nome: "Carlos Lima",
cargo: "Suporte",
progresso: 90
}
])

const [novaTrilha, setNovaTrilha] = useState("")
const [trilhas, setTrilhas] = useState([
"React",
"Python",
"Segurança da Informação"
])

const adicionarTrilha = () => {
if(novaTrilha !== ""){
setTrilhas([...trilhas, novaTrilha])
setNovaTrilha("")
}
}

const [novoFuncionario, setNovoFuncionario] = useState("")
const adicionarFuncionario = () => {

if(novoFuncionario !== ""){
setFuncionarios([
...funcionarios,
{
nome: novoFuncionario,
cargo: "Novo",
progresso: 0
}
])

setNovoFuncionario("")
}

}

return (

<div style={styles.container}>

<h1>Painel RH</h1>

{/* Dashboard */}

<div style={styles.card}>
<h2>Dashboard Funcionários</h2>

<p>Total Funcionários: {funcionarios.length}</p>

<p>
Média Progresso: {
Math.round(
funcionarios.reduce((acc, f) => acc + f.progresso, 0) 
/ funcionarios.length
)
}%
</p>

</div>

{/* Lista Funcionários */}

<div style={styles.card}>
<h2>Funcionários</h2>

{funcionarios.map((f, index) => (

<div key={index} style={styles.funcionario}>

<div>
<strong>{f.nome}</strong>
<p>{f.cargo}</p>
</div>

<div>
<p>{f.progresso}%</p>

<div style={styles.barra}>
<div 
style={{
...styles.progresso,
width: `${f.progresso}%`
}}
/>

</div>

</div>

</div>

))}

</div>

{/* Adicionar Funcionário */}

<div style={styles.card}>

<h2>Adicionar Funcionário</h2>

<input
placeholder="Nome do funcionário"
value={novoFuncionario}
onChange={(e)=>setNovoFuncionario(e.target.value)}
style={styles.input}
/>

<button onClick={adicionarFuncionario} style={styles.button}>
Adicionar
</button>

</div>

{/* Trilhas */}

<div style={styles.card}>

<h2>Trilhas de Aprendizado</h2>

<ul>
{trilhas.map((t, index)=>(
<li key={index}>{t}</li>
))}
</ul>

<input
placeholder="Nova trilha"
value={novaTrilha}
onChange={(e)=>setNovaTrilha(e.target.value)}
style={styles.input}
/>

<button onClick={adicionarTrilha} style={styles.button}>
Adicionar Trilha
</button>

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
},

funcionario:{
display:"flex",
justifyContent:"space-between",
marginBottom:"15px"
},

barra:{
width:"150px",
height:"10px",
background:"#ddd",
borderRadius:"5px"
},

progresso:{
height:"10px",
background:"#007bff",
borderRadius:"5px"
},

input:{
padding:"10px",
marginTop:"10px",
marginRight:"10px"
},

button:{
padding:"10px",
background:"#007bff",
color:"white",
border:"none",
borderRadius:"5px",
cursor:"pointer"
}

}

export default RH