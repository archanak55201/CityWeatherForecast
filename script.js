const apiKey = "7afea6734fcf093e0b4d5cff26721863";
console.log("script is connected");

const MainContent = document.getElementsByClassName("main-content")[0];
const set = new Set();
const button = document.getElementById("search");
const clearbtn = document.getElementById("cleardata");
button.addEventListener("click",function(event){
    event.preventDefault();
    const cityName = document.getElementById("cityName");
    const city = cityName.value;
    
    set.add(city);
    console.log(set);
    weatherReport();

})

async function weatherReport(){
    const weatherData =[];
    for(const city of set){
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);
        const result = await response.json();
        console.log(result);
        if(result.cod==="404"){
           
            const del=set.delete(city);
            console.log(del);
            alert(`${city} city is not found`);

        }
        const obj ={
            name:`${result.name}`,//
            type:`${result.weather[0].main}`,//
            temp:`${result.main.temp}`,//
            tempmin:`${result.main.temp_min}`,//
            tempmax:`${result.main.temp_max}`,//
            humidity:`${result.main.humidity}`,//
            pressure:`${result.main.pressure}`,//
            winds:`${result.wind.speed}`,//
            deg:`${result.wind.deg}`,//
            cloudp:`${result.clouds.all}`,//
            code:`${result.sys.country}`,//
            sunrise:`${result.sys.sunrise}`,
            sunset:`${result.sys.sunset}`
        }
        weatherData.push(obj);
    }

    weatherData.sort((a,b) => a.temp-b.temp);
    console.log(weatherData);

    MainContent.innerHTML="";
    weatherData.forEach((value)=>{

        const weathertype = getWeatherImg(value.type);
        console.log(weathertype);

    const gridItem = document.createElement("div");
    gridItem.innerHTML = `
            <div class="grid-content">
                            
                <div style=" display: flex;flex-direction: row;justify-content: space-between;font-size: 26px;white-space: nowrap;">
                    <div  style=" display: flex;flex-direction: column; padding-bottom: 5px;padding-top: 3vh;">
                    <span><i class="fa-solid fa-gauge-simple-high" style="color: #e6ebf4;padding-right: 7px;"></i>${value.winds}km/h</span> 
                    <span><i class="fa-regular fa-compass" style="color: #eaecf0;padding-right: 7px;"></i>${value.deg}</span> 
                    <span><i class="fa-solid fa-droplet" style="color: #f0f2f5;padding-right: 7px;"></i>${value.cloudp}%</span> 
                        
                        
                    </div>
                    <img src="${weathertype}" style="height: 13vh;width: 13vw; padding-right: 2vw;">
                </div>
                
                <div class="details">
                    <div style="font-size: 5rem;">
                
                        ${value.temp}<sup style="font-size: 20px;position: absolute;">o</sup>
            
                    </div>
                    <div class="high-low">
                        <div>H:${value.tempmin}<sup>o</sup></div>
                        <div>L:${value.tempmax}<sup>o</sup></div>
                    </div>
                    <div class="high-low">
                        <div>Humidity:${value.humidity}</div>
                        <div>pressure:${value.pressure}</div>
                    </div>
                    <div class="cot-type">
                        <div>${value.name},${value.code}</div>   
                        <div class="dayType">- ${value.type}</div>   
                    </div>
                </div>

            </div>
    `;

    MainContent.appendChild(gridItem);
    gridItem.className="grid-item";
    });
}


function getWeatherImg(type){
    if(type==="Fog"||type==="Haze"||type==="Smoke"||type==="Clouds"||type==="Mist"||type==="Dust"||type==="Sand"){
        return "wind.svg"
    }
    else if(type==="Snow"||type==="Squall"){
        return "srain.svg"
    }
    else if(type==="Drizzle"||type==="Rain"){
        return "mrain.svg";
    }

    else if(type==="Thunderstorm"||type==="Tornado"){
        return "Tornado.svg";
    }else{
        return "sun.svg";
    }
}

clearbtn.addEventListener("click",()=>{
    MainContent.innerHTML="";
    MainContent.innerHTML=`
    <div class="grid-item">
    <div class="grid-content">
       
        <div style=" display: flex;flex-direction: row;justify-content: space-between;font-size: 26px;white-space: nowrap;">
            <div  style=" display: flex;flex-direction: column;padding-bottom: 5px;">
               <!-- <span><i class="fa-solid fa-gauge-simple-high" style="color: #e6ebf4;padding-right: 7px;"></i>5km/h</span> 
               <span><i class="fa-regular fa-compass" style="color: #eaecf0;padding-right: 7px;"></i>northeast</span> 
               <span><i class="fa-solid fa-droplet" style="color: #f0f2f5;padding-right: 7px;"></i>100%</span> 
                
                 -->
            </div>
            <img src="sun.svg" alt="." style="height: 15vh;padding-right: 2vw;">
        </div>
        
        <div class="details" style="padding-bottom: 3vh;">
            <div style="font-size: 35px;">
          
                Search city to get the Weather Report...
            </div>
            <div class="high-low">
                Search city to get the Weather Report...
            </div>
            <div class="high-low">
                <!-- <div>Humidity:23</div>
                <div>pressure:55</div> -->
            </div>
            <div class="cot-type">
                <!-- <div> Tokya,Japan</div>   
                <div class="dayType"> shower</div>    -->
            </div>
        </div>

    </div>
</div>
    `;
})

