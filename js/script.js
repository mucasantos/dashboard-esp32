//Tamanho do Array readSensor (12)--> 0 até 11
//Endereço do servidor para consulta de dados
const url = "https://esp32-zjts.onrender.com/read";

const charts = document.querySelector(".chart");
//Pega a tabela do HTML a partir do ID
const myTable = document.getElementById("table");
//Lista que será alimentada com os dados vindos do servidor.

testIntervalo()

function testIntervalo() {
  let hora = new Date().toLocaleTimeString();
  console.log(hora)

  fetch(url)
    .then(resultado => resultado.json())
    .then(readSensor => createScreen(readSensor))
}

setInterval(testIntervalo, 120000);

function createScreen(readSensor) {
  //Para cada elemento no Array (lista), expõe os dados
  //de forma visual na tabela.
  var labels = [];
  myTable.innerHTML = ""

  readSensor.sensorData.forEach(dadosLeitura => {
    const myTr = document.createElement("tr");

    console.log(dadosLeitura.createdAt)
    //Inserir na lista, os dados que necessito
    labels.push(dadosLeitura.createdAt);
    //Cria o elemento tr e adiona os dados
    myTr.innerHTML = `
      <td>${dadosLeitura.local}</td>
      <td>${dadosLeitura.humidity}</td>
      <td>${dadosLeitura.temp}</td>
      <td>${dadosLeitura.createdAt}</td>
  `
    //adiciona a tr à tabela HTML
    myTable.appendChild(myTr);
  });

  //A manipulação dos Arrays podem ser utilizando o map.
  //Exemplo:   readSensor.sensorData.map(temperatura => temperatura.temp),
  // Ele cria um novo array com as informações solicitadas, no caso,
  //temperura.temp

  if (window.myChart instanceof Chart) {
    window.myChart.destroy();
  }

  var ctx = charts.getContext("2d");

  window.myChart = new Chart(ctx, {
    // type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Temperatura",
          type: "bar",
          data: readSensor.sensorData.map(temperatura => temperatura.temp),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
        {
          label: "Umidade",
          data: readSensor.sensorData.map(umidade => umidade.humidity),

          type: "line",
          backgroundColor: [
            "rgba(255, 99, 32, 0.2)",
            "rgba(54, 162, 35, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 55, 0.2)",
            "rgba(255, 159, 4, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 2,
        },

      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

}

$(document).ready(function () {
    $(".data-table").each(function (_, table) {
      $(table).DataTable();
    });
  });

