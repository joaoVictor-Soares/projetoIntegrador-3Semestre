USE gerenciamento;

CREATE TABLE IF NOT EXISTS cursos(
    
    id INT NOT NULL AUTO_INCREMENT,

    titulo VARCHAR(100) NOT NULL,

    resumo TEXT NOT NULL,

    link VARCHAR(200) NOT NULL,

    nivel VARCHAR(20) NOT NULL,

    duracao INT NOT NULL,

    PRIMARY KEY(id)
)

CREATE TABLE IF NOT EXISTS login(
    id 
)

