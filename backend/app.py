from flask import Flask, request, jsonify
from flask_cors import CORS
from poc import dadosCursosTraduzidos

app = Flask(__name__)
CORS(app)

@app.get("/buscar_cursos")
def buscarCursos():

    dados = dadosCursosTraduzidos()
    return dados

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=4567, debug=False)

