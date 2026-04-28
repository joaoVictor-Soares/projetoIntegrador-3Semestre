import json
import secrets
import base64
import random
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
    users = ""

    try:
        cursor.execute(
            "SELECT token FROM login WHERE username = %s AND password = %s",
            (username, password)
        )

        users = cursor.fetchall()

        cursor.close()
        conexao.close()
    
    except Exception as e:
        print(e)

    if not users:
        return jsonify({"erro": "Usuário ou senha incorretos"}), 401
    return users

@app.post("/cadastro")
def cadastro():
    dados = request.get_json(force=True)

    if not dados or "username" not in dados or "password" not in dados:
        return jsonify({
            "erro": "Campos inválidos"
        })

    #id = random.randint(1,100)
    username = dados["username"]
    password = dados["password"]
    token = secrets.token_bytes(16)
    token_string = base64.b64encode(token).decode('utf-8')

    conexao = conectar()
    cursor = conexao.cursor()

    try:
        cursor.execute(
            "INSERT INTO login (username, password, token) VALUES(%s, %s, %s)",
            (username, password, token_string)
        )

        conexao.commit()
        cursor.close()
        conexao.close()

        return jsonify({
            "status": 201,
            "token": token_string
        })
        
    except Exception as e:
         return jsonify({"erro": str(e)}), 500
    
@app.get("/buscar_cursos")
def buscarCursos():

    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT id, titulo, resumo, link, nivel, duracao FROM cursos"
        )

        cursos = cursor.fetchall()

        return jsonify(cursos)

    except Exception as e:
        return jsonify({"erro": str(e)}), 500
    finally:
        cursor.close()
        conexao.close()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=FLASK_DEBUG)

