import json
from flask import Flask, request, jsonify
from db import conectar
from config import SECRET_KEY, FLASK_DEBUG
from flask_cors import CORS
from poc import dadosCursosTraduzidos

app = Flask(__name__)
CORS(app)

# def salvarCursosNoBanco(jsonDados):

#     conexao = conectar()
#     cursor = conexao.cursor()

#     cursos = json.loads(jsonDados)

#     for curso in cursos:
#         titulo = curso['titulo']
#         resumo = curso['resumo']
#         link = curso['link']
#         nivel = curso['nivel']
#         duracao = curso['duracao']

#         try:
#             cursor.execute(
#                 "INSERT INTO cursos (titulo, resumo, link, nivel, duracao) VALUES (%s, %s, %s, %s, %s)",
#                 (titulo, resumo, link, nivel, duracao)
#             )
#         except Exception as e:
#             print(e)
        
#     conexao.commit()
#     cursor.close()
#     conexao.close()


#TODO: melhorar essa lógica de login
@app.get("/login/<username>/<password>")
def login(username: str, password: str):
    conexao = conectar()
    cursor = conexao.cursor()
    logs = 0

    try:
        cursor.execute(
            "SELECT id FROM login WHERE username = %s AND password = %s",
            (username, password)
        )

        users = cursor.fetchall()
        if len(users) != 0:
            logs = 1

        cursor.close()
        conexao.close()
    
    except Exception as e:
        print(e)

    if logs == 0:
        return "0"
    return "1"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=FLASK_DEBUG)

