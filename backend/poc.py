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
       
def dadosCursosTraduzidos():
    """
    Função que exporta os dados dos cursos traduzidos:
    - titulo
    - resumo
    - link
    - nivel
    - duração
    """
    # busca os dados da função e confere o formato para posterior desmenbramento
    dados = buscarDados(url)
    if not isinstance(dados, dict):
        print("formato invalido")

    # pega apenas os módulos, pois la está os principais dados dos cursos
    lista_de_modulos = dados.get("modules", [])

    # percorre os dados dentro do módulo
    for modulo in lista_de_modulos[:100]:

        # pegamos os textos originais
        tituloOrigin = modulo.get("title", "")
        resumoOrigin = modulo.get("summary", "") 
        
        # transformamos a lista ['beginner'] em string "beginner"
        niveis_lista = modulo.get("levels", [])
        nivelOrigin = ", ".join(niveis_lista) if niveis_lista else "Não informado"

        # tradução 
        titulo = tradutor.translate(tituloOrigin)
        resumo = tradutor.translate(resumoOrigin)
        nivel = tradutor.translate(nivelOrigin)

        # json que será enviado para o front
        item_formatado = {
            "titulo": titulo,
            "resumo": resumo,
            "link": modulo.get("url"),
            "nivel": nivel.capitalize(),
            "duracao": modulo.get("duration_in_minutes") 
        }

        dados_exportaveis.append(item_formatado)

    # forma um json estruturado
    dadosJson = json.dumps(dados_exportaveis, indent=4, ensure_ascii=False)

    return(dadosJson)


