import mysql.connector
from flask import Flask, make_response, jsonify, request
from flask_cors import CORS

mydb = mysql.connector.connect(
    host="localhost", user="root", password="dev123", database="python_teste"
)
app = Flask(__name__)
app.json.sort_keys = False
CORS(app)


@app.route("/pessoas", methods=["GET"])
def get_pessoas():
    my_cursor = mydb.cursor()
    my_cursor.execute("SELECT * FROM pessoas")
    my_pessoas = my_cursor.fetchall()

    pessoas = list()

    for pessoa in my_pessoas:
        pessoas.append(
            {
                "id": pessoa[0],
                "nome": pessoa[1],
                "rg": pessoa[2],
                "cpf": pessoa[3],
                "data_nascimento": pessoa[4],
                "data_admissao": pessoa[5],
                "funcao": pessoa[6],
            }
        )

    return make_response(jsonify(pessoas))


@app.route("/pessoa/<int:id_pessoa>", methods=["GET"])
def get_pessoa_by_id(id_pessoa):
    my_cursor = mydb.cursor()
    select_sql = "SELECT * FROM pessoas WHERE id_pessoa = %s"
    my_cursor.execute(select_sql, (id_pessoa,))
    pessoa = my_cursor.fetchone()

    if pessoa is None:
        return make_response(jsonify(message="Pessoa não encontrada", data=None), 404)

    pessoa_dict = {
        "id": pessoa[0],
        "nome": pessoa[1],
        "rg": pessoa[2],
        "cpf": pessoa[3],
        "data_nascimento": pessoa[4].strftime("%d/%m/%y"),
        "data_admissao": pessoa[5].strftime("%d/%m/%y"),
        "funcao": pessoa[6],
    }

    return make_response(jsonify(pessoa_dict))


@app.route("/pessoas", methods=["POST"])
def create_pessoa():
    pessoa = request.json

    my_cursor = mydb.cursor()
    sql = "INSERT INTO pessoas(`nome`, `rg`, `cpf`, `data_nascimento`, `data_admissao`, `funcao`) VALUES (%s, %s, %s, %s, %s, %s)"
    values = (
        pessoa["nome"],
        pessoa["rg"],
        pessoa["cpf"],
        pessoa["data_nascimento"],
        pessoa["data_admissao"],
        pessoa["funcao"],
    )
    my_cursor.execute(sql, values)

    mydb.commit()

    return make_response(jsonify(message="Pessoa cadastrada com sucesso", data=pessoa))


@app.route("/pessoa/<int:id_pessoa>", methods=["PUT"])
def update_pessoa(id_pessoa):
    pessoa = request.json

    my_cursor = mydb.cursor()

    check_sql = "SELECT id_pessoa FROM pessoas WHERE id_pessoa = %s"
    my_cursor.execute(check_sql, (id_pessoa,))
    existing_pessoa = my_cursor.fetchone()

    if existing_pessoa is None:
        return make_response(jsonify(message="Pessoa não encontrada", data=None), 404)

    update_sql = "UPDATE pessoas SET nome = %s, funcao = %s WHERE id_pessoa = %s"
    values = (
        pessoa["nome"],
        pessoa["funcao"],
        id_pessoa,
    )

    my_cursor.execute(update_sql, values)
    mydb.commit()

    return make_response(jsonify(message="Pessoa atualizada com sucesso", data=pessoa))


@app.route("/pessoa/<int:id_pessoa>", methods=["DELETE"])
def delete_pessoa(id_pessoa):
    my_cursor = mydb.cursor()

    check_sql = "SELECT id_pessoa FROM pessoas WHERE id_pessoa = %s"
    my_cursor.execute(check_sql, (id_pessoa,))
    existing_pessoa = my_cursor.fetchone()

    if existing_pessoa is None:
        return make_response(jsonify(message="Pessoa não encontrada"), 404)

    delete_sql = "DELETE FROM pessoas WHERE id_pessoa = %s"
    my_cursor.execute(delete_sql, (id_pessoa,))
    mydb.commit()

    return make_response(jsonify(message="Pessoa excluída com sucesso"))


app.run(host="192.168.0.110")
