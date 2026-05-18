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

#     for curso in jsonDados:
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

# @app.route("/")
# def cursosBanco():
#     dados = dadosCursosTraduzidos()
#     salvarCursosNoBanco(dados)
#     return("salvando dados")


#TODO: melhorar essa lógica de login
@app.get("/login/<username>/<password>")
def login(username: str, password: str):
    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)
    user = ""
    
    try:
        cursor.execute(
            "SELECT name, numero_registro, cargo, departamento FROM login WHERE username = %s AND password = %s",
            (username, password)
        )

        user = cursor.fetchall()

        cursor.close()
        conexao.close()
    
    except Exception as e:
        print(e)

    if not user:
        return jsonify({
            "erro": "Usuário ou senha incorretos", 
            "status": 405
            })
    return jsonify({
        "user": user,
        "status": 201
    })

@app.post("/cadastro")
def cadastro():
    id = 0
    dados = request.get_json(force=True)

    if not dados or "username" not in dados or "password" not in dados:
        return jsonify({
            "erro": "Campos inválidos"
        })

    username = dados["username"]
    password = dados["password"]
    name = dados["name"]
    numero_registro = dados["numero_registro"]
    cargo = dados ["cargo"]
    departamento = dados["departamento"]

    conexao = conectar()
    cursor = conexao.cursor()

    try:
        cursor.execute(
            "INSERT INTO login (username, password, name, numero_registro, cargo, departamento) VALUES(%s, %s, %s, %s, %s, %s)",
            (username, password, name, numero_registro, cargo, departamento)
        )

        conexao.commit()
        cursor.close()
        conexao.close()

        return jsonify({
            "status": 201,
            "token": numero_registro
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
    
@app.get("/buscar_cursos_palavras/<palavra>")
def buscar_cursos_palavras(palavra: str):
    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)
    cursos = []
    busca = f"%{palavra}%"
    query =  "SELECT titulo, resumo, link, nivel, duracao FROM cursos WHERE titulo LIKE %s"

    try:
        cursor.execute(query, (busca,))
        cursos = cursor.fetchall()
    except Exception as e:
        return jsonify({"erro": str(e)})
    finally:
        conexao.close()
        cursor.close()

    if not cursos:
        return jsonify({"resultado": "Nenhuma resposta para essa palavra"})
    return jsonify(cursos)

@app.get("/buscar_cursos_realizados/<registro>")
def buscar_cursos_realizados(registro: str):
    cursos = []

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=FLASK_DEBUG)

