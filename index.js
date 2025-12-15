const weatherform=document.querySelector(".weatherform");
const cityInput=document.querySelector(".cityInput")
const card=document.querySelector(".card");
const apikey="//use your own";

weatherform.addEventListener("submit",async event=>{
     event.preventDefault();
    const city=cityInput.value;

    if(city){
       try{
           const weatherData=await getWeatherdata(city);
           displayWeatherInfo(weatherData);



       }catch(error){
        console.error(error);
        displayError(error);
       }
    }
    else{
        displayError("Please enter correct city!!")
    }


})

 async function getWeatherdata(city){
     const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
     const response=await fetch(apiUrl);

     console.log(response);
     if(!response.ok){
        throw new Error("could not fetch weather data");
     }
     return await response.json();
 }
 function displayWeatherInfo(data){
     
    const {name:city,
        main:{temp,humidity},
        weather:[{description,id}]}=data;

        card.textContent="";
        card.style.display="flex";


        const cityDisplay=document.createElement("h1");
        const tempDisplay=document.createElement("p");
        const humiditydisplay=document.createElement("p");
        const descDisplay=document.createElement("p");
        const weatheremoji=document.createElement("h1");
        
        cityDisplay.textContent=city;
         tempDisplay.textContent=`${(temp-273.15).toFixed(1)}C`; 
         humiditydisplay.textContent=`Humidity:${humidity}%`;
         descDisplay.textContent=description;
         weatheremoji.textContent=getWeatherEmoji(id)


     card.appendChild(cityDisplay);
     card.appendChild(tempDisplay);
     card.appendChild(humiditydisplay);
     card.appendChild(descDisplay);
     card.appendChild(weatheremoji);
 }
 function getWeatherEmoji(weathetId){


 }
 function displayError(message){
      const errorDisplay=document.createElement("p");
      errorDisplay.textContent=message;
      errorDisplay.classList.add("errorDisplay");
      card.textContent="";
      card.style.display="flex";
      card.appendChild(errorDisplay);

 }