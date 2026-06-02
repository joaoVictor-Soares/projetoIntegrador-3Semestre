import json
import secrets
import base64
import random
import os
import uuid
from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from db import conectar
from config import SECRET_KEY, FLASK_DEBUG
from flask_cors import CORS
from poc import dadosCursosTraduzidos

app = Flask(__name__)
CORS(app)

# CONFIGURAÇÕES PARA OS UPLOADS (VOLUME DOCKER)
UPLOAD_FOLDER = '/app/uploads'
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}

# Garante que a pasta mapeada no Docker exista
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def arquivo_permitido(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# TODO: melhorar essa lógica de login
@app.get("/login/<username>/<password>")
def login(username: str, password: str):
    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)
    user = ""
    
    try:
        cursor.execute(
            "SELECT * FROM login WHERE username = %s AND password = %s",
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

@app.get("/cursos_home")
def buscar_cursos_home():
    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)
    cursos = []

    try:
        cursor.execute("SELECT * from cursos ORDER BY RAND() LIMIT 3")
        cursos = cursor.fetchall()
    except Exception as e:
        return jsonify({"erro": str(e)})
    finally:
        conexao.close()
        cursor.close()
    return jsonify(cursos)

@app.get("/cursos_inscritos/<registro>")
def buscar_cursos_inscritos(registro: str, cursoId: str):
    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute(
        "SELECT c.titulo, in.status from cursos_iniciados as in inner join cursos as c on c.id = %s"
    )

# =========================================================================
#  NOVAS ROTAS: GESTÃO DE CERTIFICADOS (SALVAMENTO NO DOCKER + REFERÊNCIA DB)
# =========================================================================

# 1. ENVIAR CERTIFICADO (POST) -> Recebe 'usuario_id' e o arquivo via FormData
@app.post("/api/certificados/upload")
def upload_certificado():
    usuario_id = request.form.get("usuario_id") # Número de registro enviado pelo front
    
    if not usuario_id:
        return jsonify({"erro": "O campo 'usuario_id' (registro) é obrigatório"}), 400
        
    if 'arquivo' not in request.files:
        return jsonify({"erro": "Nenhum arquivo enviado"}), 400
        
    file = request.files['arquivo']
    if file.filename == '':
        return jsonify({"erro": "Arquivo inválido"}), 400
        
    if file and arquivo_permitido(file.filename):
        nome_original = secure_filename(file.filename)
        extensao = nome_original.rsplit('.', 1)[1].lower()
        
        # Nome único gerado para persistir na pasta do Docker
        nome_sistema = f"{uuid.uuid4()}.{extensao}"
        caminho_completo = os.path.join(UPLOAD_FOLDER, nome_sistema)
        
        # Salva o arquivo fisicamente dentro do Volume do Docker
        file.save(caminho_completo)
        
        # Salva as referências textuais no MySQL
        conexao = conectar()
        cursor = conexao.cursor()
        try:
            cursor.execute(
                "INSERT INTO certificados (usuario_id, nome_original, nome_sistema) VALUES (%s, %s, %s)",
                (usuario_id, nome_original, nome_sistema)
            )
            conexao.commit()
            return jsonify({"mensagem": "Certificado enviado com sucesso!"}), 201
        except Exception as e:
            return jsonify({"erro": f"Erro ao salvar no banco: {str(e)}"}), 500
        finally:
            cursor.close()
            conexao.close()
            
    return jsonify({"erro": "Formato de arquivo não permitido (Use PDF, PNG ou JPG)"}), 400


# 2. LISTAR TODOS OS CERTIFICADOS DE UM ÚNICO USUÁRIO (GET)
@app.get("/api/certificados")
def listar_certificados():
    usuario_id = request.args.get("usuario_id") # Pega o ?usuario_id=XXXX da URL
    
    if not usuario_id:
        return jsonify({"erro": "O parâmetro 'usuario_id' é obrigatório"}), 400
        
    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)
    try:
        cursor.execute(
            "SELECT id, nome_original, nome_sistema FROM certificados WHERE usuario_id = %s",
            (usuario_id,)
        )
        certificados = cursor.fetchall()
        
        # Monta a estrutura de resposta injetando a URL final dinâmica
        resultado = []
        for c in certificados:
            resultado.append({
                "id": c["id"],
                "nome_original": c["nome_original"],
                "url_download": f"http://localhost:5000/api/certificados/download?arquivo={c['nome_sistema']}&usuario_id={usuario_id}"
            })
            
        return jsonify(resultado), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500
    finally:
        cursor.close()
        conexao.close()


# 3. ACESSAR/BAIXAR O ARQUIVO DO DOCKER COM VALIDAÇÃO DE PARÂMETROS
@app.get("/api/certificados/download")
def baixar_certificado():
    nome_arquivo = request.args.get("arquivo")
    usuario_id = request.args.get("usuario_id")
    
    if not nome_arquivo or not usuario_id:
        return jsonify({"erro": "Os parâmetros 'arquivo' and 'usuario_id' são obrigatórios"}), 400
        
    # Evita manipulação maliciosa de caminhos de diretório (Path Traversal)
    nome_arquivo = os.path.basename(nome_arquivo)
    
    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)
    try:
        # Checa se esse arquivo específico realmente pertence a quem está pedindo
        cursor.execute(
            "SELECT id FROM certificados WHERE nome_sistema = %s AND usuario_id = %s",
            (nome_arquivo, usuario_id)
        )
        certificado = cursor.fetchone()
        
        if not certificado:
            return jsonify({"erro": "Acesso proibido ou arquivo inexistente para este usuário"}), 403
            
        # Tudo certo! Serve o arquivo direto da pasta do Docker
        return send_from_directory(UPLOAD_FOLDER, nome_arquivo)
    except Exception as e:
        return jsonify({"erro": str(e)}), 500
    finally:
        cursor.close()
        conexao.close()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=FLASK_DEBUG)