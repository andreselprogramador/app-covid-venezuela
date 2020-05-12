const positivos = document.querySelector("#positivos"),
      activos = document.querySelector("#activos"),
      recuperados = document.querySelector("#recuperados"),
      fallecidos = document.querySelector("#fallecidos"),
      lista = document.querySelector("#lista"),
      masculino = document.querySelector("#masculinos"),
      femenino = document.querySelector("#femeninos"),
      listaEdad = document.querySelector("#lista-edad"),
      URL = "https://covid19.patria.org.ve/api/v1/summary";


let estadosAfectados = [];

obtenerDatos();

async function obtenerDatos(){
    const respuesta = await fetch(URL);
    const datosObtenidos = await respuesta.json();
    try{
        estadosAfectados.push(datosObtenidos.Confirmed.ByState);
        positivos.innerHTML = `<p class="verde" id="positivos">${datosObtenidos.Confirmed.Count}</p>`;
        activos.innerHTML = `<p class="morado" id="positivos">${datosObtenidos.Active.Count}</p>`;
        recuperados.innerHTML = `<p class="azul" id="recuperados">${datosObtenidos.Recovered.Count}</p>`;
        fallecidos.innerHTML = `<p class="rojo" id="fallecidos">${datosObtenidos.Deaths.Count}</p>`;
        masculino.innerHTML = `<p>Masculino: <span id="masculinos">${datosObtenidos.Confirmed.ByGender.male}</span> <span class="casos">casos</span></p>`;
        femenino.innerHTML = `<p class="rosado" class="femeninos">Femenino: <span>${datosObtenidos.Confirmed.ByGender.female}</span> <span class="casos">casos</span></p>`;

    }catch(error){
        console.error(error);
    }
} 

async function obtenerDatosParaRecorrerlos(){
    const respuesta_1 = await fetch(URL);
    const datosObtenidos_1 = await respuesta_1.json();
    try{
        let estados = datosObtenidos_1.Confirmed.ByState;
        console.log(estados);
        for(let casosEstados in estados){
            let crearLista = document.createElement("li");
            crearLista.innerHTML = `<li>${casosEstados}: <span>${estados[casosEstados]} <span class="texto">casos</span></span></li>`;
            lista.append(crearLista);
        }
        let rangoEtario = datosObtenidos_1.Confirmed.ByAgeRange;
        for(let edad in rangoEtario){
            let crearLista_1 = document.createElement("li");
            crearLista_1.innerHTML = `<li>${edad} años: <span>${rangoEtario[edad]} <span class="texto">casos</span></span></li>`;
            listaEdad.append(crearLista_1);
        }
    }catch(error){
        console.error(error);
    }
}

obtenerDatosParaRecorrerlos();