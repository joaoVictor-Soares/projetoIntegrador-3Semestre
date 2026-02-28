import "../styles/NavBar.css";

function NavBar(){
    return(
        <nav className="navbar">
            <h1>Plataforma de aprendizado</h1>
            <ul>
                <li>Home</li>
                <li>Ver Trilhas disponíveis</li>
                <li>Ver Certificados</li>
                <li>Ver Análise de Desempenho</li>
            </ul>
        </nav>
    )
}

export default NavBar;