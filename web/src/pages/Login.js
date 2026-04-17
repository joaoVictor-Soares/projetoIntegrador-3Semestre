import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {

const navigate = useNavigate()

const [email, setEmail] = useState("")
const [senha, setSenha] = useState("")
const [tipo, setTipo] = useState("funcionario")

const handleLogin = (e) => {
e.preventDefault()

if(tipo === "funcionario"){
navigate("/funcionario")
}else{
navigate("/rh")
}

}

return (
<div>

<h1>Login Plataforma</h1>

<form onSubmit={handleLogin}>

<select
value={tipo}
onChange={(e)=>setTipo(e.target.value)}
>
<option value="funcionario">Funcionário</option>
<option value="rh">RH</option>
</select>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Senha"
value={senha}
onChange={(e)=>setSenha(e.target.value)}
/>

<button>Entrar</button>

</form>

</div>
)

}

export default Login