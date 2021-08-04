const d = document;
const btn1 = d.querySelector("#btn-search");

const reqFunction = async (city) => {
    await fetch(`https://nodefv-07-weather.herokuapp.com/api/v1/cities/${city}`)
        .then(res => res.json())        
        .then(data => {            
            let html ="";
            const dataCities = data.data            
            const listCities = d.querySelector("#ul1");
            
            dataCities.forEach(el => {                                
                html += `
                            <div class="optionCity">
                            <input type="radio" id="${el.id}" name="city" value="${el.lat}">
                            <label for="${el.id}">${el.name}</label>                                                      
                            </div>      
                
                        `
            });

            html += `
                        <input type="button" id="select-button" name="btn" value="Get weather">    
                    `

            listCities.innerHTML = html;            
            getData();

        })
        .catch(err => {
            alert("Something went wrong")
        })
}


btn1.addEventListener("click", (e)=>{
    e.preventDefault();
    const cityText = d.querySelector("#mainInput");
    const cityStored = cityText.value;    
    const testLabel = d.querySelector("#test");
    testLabel.innerText = cityStored;

    //Get request
    reqFunction(cityStored);
    
});

const getData = ()=>{
    const btn2 = d.querySelector("#select-button");
    btn2.addEventListener("click", ()=>{    
        const cityName = d.querySelector("#test");
        let selected = d.querySelector('input[type="radio"]:checked');
        
        const result = d.querySelector("#test2");
        let citySaved = cityName.innerText //viene del mainInput
        let idSaved = selected.id;        
        
        getWeather(citySaved, idSaved);
              
    });
}

const getWeather = (city, id) =>{
    fetch(`https://nodefv-07-weather.herokuapp.com/api/v1/weather/${city}/${id}`)
        .then(res => res.json())
        .then(data => {
            let html = "";
            const tempData = d.querySelector("#temperature-data");
            html += `
                        <div>
                            <div>
                                <h3>Temperatura: ${data.data.temperature}</h3
                            </div>
                            <div>
                                <p>Descripcion: ${data.data.description}</p>
                            </div>
                            <div>
                                <p>Temperatura Minima: ${data.data.temperatureMin}</p>
                                <p>Temperatura Máxima: ${data.data.temperatureMax}</p>
                            </div>
                        </div>
                    `

            tempData.innerHTML = html;
        })
        .catch(err => {
            alert("Something went wrong")
        })
}

/*
const getGeoLocation = (lat, lon) => {

    const $target = d.getElementById("geolocation-map");

    html = `
                <a href="https://www.google.com/maps/@${lat},${lon},15z" target=_blank>Ver en Google Maps<a>
            `
    $target.innerHTML = html;

}*/



