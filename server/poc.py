# importações
import requests
import json

# trabalha em cima do google tradutor
from deep_translator import GoogleTranslator # resposável pelo envio dos dados traduzidos para interface

# link documentação: https://learn.microsoft.com/pt-br/training/support/catalog-api-developer-reference
# ?type=modules é para pegar apenas os modulos de cursos

# URL disponibilizada pela microsoft com dados sobre cursos da empresa
url = "https://learn.microsoft.com/api/catalog/?type=modules"

# instanciando o tradutor de inglês para português
tradutor = GoogleTranslator(source='en', target='pt')
# criação de uma lista vazia que servirá de base para o json com os dados
dados_exportaveis = []

def buscarDados(api):
    """
        Função que consome a API da microsoft

        Caso resposta positiva, retorna o objeto para consumo
    """
    resposta = requests.get(api)
    if resposta.status_code == 200:
        return resposta.json()
    else:
        print("erro")
       
#TODO: terminar de documentar o código

dados = buscarDados(url)
if not isinstance(dados, dict):
    print("formato invalido")

# print(dados.keys())
lista_de_modulos = dados.get("modules", [])

for modulo in lista_de_modulos[:10]:

    # 1. Pegamos os textos originais
    tituloOrigin = modulo.get("title", "")
    resumoOrigin = modulo.get("summary", "") 
    
    # 2. TRATAMENTO DO NÍVEL: Transformamos a lista ['beginner'] em string "beginner"
    niveis_lista = modulo.get("levels", [])
    nivelOrigin = ", ".join(niveis_lista) if niveis_lista else "Não informado"

    # 3. Tradução (agora tudo é String, o tradutor não vai reclamar)
    titulo = tradutor.translate(tituloOrigin)
    resumo = tradutor.translate(resumoOrigin)
    nivel = tradutor.translate(nivelOrigin)

    # 4. Montagem do item para o seu JSON final
    item_formatado = {
        "titulo": titulo,
        "resumo": resumo,
        "link": modulo.get("url"),
        "nivel": nivel,
        "duracao": modulo.get("duration_in_minutes") 
    }

    dados_exportaveis.append(item_formatado)

dadosJson = json.dumps(dados_exportaveis, indent=4, ensure_ascii=False)

print(dadosJson)
#tamanho = len(dados)



