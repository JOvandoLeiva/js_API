var datos = [];

async function traerDatos(){
 
    const resultado = await fetch("https://mindicador.cl/api");
     datos = await resultado.json();
    console.log(datos)

    var datitos = Object.entries(datos);
    datitos.splice(0,3);
    console.log(datitos);

    const traerCodigo = () => {
        let codigo = document.querySelector("#moneda")
        codigo.innerHTML = ''
    
        datitos.forEach(moneda => {
            var dato = moneda[1];
            codigo.innerHTML += `
                    <option value="${dato.codigo}">${dato.codigo}</option>
            `
        })
    }
    
    traerCodigo();
}

traerDatos();

function convertir(){

    let pesos = document.querySelector('#pesitos').value;
    let moneda = document.querySelector('#moneda').value;
    const valorcito = Object.entries(datos).filter((key) => key.includes(moneda))[0][1].valor;
    // let valorMoneda=valorcito[1].valor;
     console.log(valorcito);  
    var resultadoFinal = pesos/valorcito;
    document.querySelector('#resultado').innerHTML = resultadoFinal;
    obtenerIndicadores(moneda, pesos);
}

const ctx = document.getElementById('estadistica')
let grafico = new Chart(ctx, {
    type: 'line',
    data: {
    //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      labels: [],
      datasets: [{
        label: '# of Votes',
        // data: [12, 19, 3, 5, 2, 3],
        data: [],
        borderWidth: 1
      }]
    },
    options: {
    //   scales: {
    //     y: {
    //       beginAtZero: true
    //     }
    //   }
    }
});


async function obtenerIndicadores(moneda, pesos){
    let peticion = await fetch("https://mindicador.cl/api")
    let indicadores = await peticion.json()
    let conversion = pesos / indicadores[moneda].valor

    let peticionFechas = await fetch(`https://mindicador.cl/api/${moneda}`)
    let indicadorFechas = await peticionFechas.json()

    let fechas = indicadorFechas.serie.splice(0,10);

    let labels = []
    let valores = []

    fechas.forEach(element => {
        let fecha = moment(element.fecha).format('DD/MM/YYYY')
        labels.push(fecha)
        valores.push(element.valor)
    });

    labels.reverse()
    valores.reverse()

    grafico.data.labels = labels
    grafico.data.datasets[0].data = valores
    grafico.update()
    // console.log(grafico);
}

// obtenerIndicadores(moneda, pesos);

