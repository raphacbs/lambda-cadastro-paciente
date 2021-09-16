'use strict';

module.exports.listarPacientes = async (event) => {

  console.log(event)
  const pacientes = [
    { id: 1, nome: "Maria", dataNascimento: '1984-01-11' },
    { id: 2, nome: "Joao", dataNascimento: '1983-01-11 ' },
    { id: 3, nome: "Jose", dataNascimento: '1959-07-15' }
  ];

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
};

module.exports.obterPaciente = async (event) => {

  console.log(event)
  const pacientes = [
    { id: 1, nome: "Maria", dataNascimento: '1984-01-11' },
    { id: 2, nome: "Joao", dataNascimento: '1983-01-11 ' },
    { id: 3, nome: "Jose", dataNascimento: '1959-07-15' }
  ];

  const { pacienteId } = event.pathParameters;

  const paciente = pacientes.find(paciente => paciente.id == pacienteId)

  if (paciente === undefined) {
    return {
      statusCode: 404,
      body: JSON.stringify(
        {
          "error": "Paciente não existe"
        },
        null,
        2
      ),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        paciente
      },
      null,
      2
    ),
  };
};
