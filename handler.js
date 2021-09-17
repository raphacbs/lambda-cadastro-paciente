'use strict';
const { v4: uuidv4 } = require('uuid');
const AWS = require("aws-sdk")
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: "PACIENTES",
}


module.exports.listarPacientes = async (event) => {

  try {
    let data = await dynamoDb.scan(params).promise();
    let pacientes = data.Items;
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          pacientes
        },
        null,
        2
      ),
    };
  } catch (err) {
    console.log("Error", err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      })
    }
  }


};

module.exports.obterPaciente = async (event) => {

  try {
    const { pacienteId } = event.pathParameters;
    const data = await dynamoDb.get({
      ...params,
      Key: {
        paciente_id: pacienteId
      }
    }).promise();

    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'Paciente não existe'
        },
          null,
          2)
      }
    }

    const paciente = data.Item;

    return {
      statusCode: 200,
      body: JSON.stringify(paciente,
        null,
        2)
    }


  } catch (err) {
    console.log("Error", err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      })
    }
  }
};

module.exports.cadastrarPaciente = async (event) => {

  console.log(event);

  let timestamp = new Date().getTime();
  let body = JSON.parse(event.body)

  const { nome, data_nascimento, email, telefone } = body;

  const paciente = {
    paciente_id: uuidv4(),
    nome,
    data_nascimento,
    email,
    telefone,
    criado_em: timestamp,
    atualizado_em: timestamp

  }

  await dynamoDb.put({
    TableName: "PACIENTES",
    Item: paciente
  })
  .promise();

  return {
    statusCode: 201
  }

}