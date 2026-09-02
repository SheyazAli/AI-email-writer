function getWeatherCondition(code) {
    if (code === 0) return "Clear sky";
    if (code === 1 || code === 2) return "Partly cloudy";
    if (code === 3) return "Overcast";
    if (code >= 51 && code <= 67) return "Rain";
    if (code >= 71 && code <= 77) return "Snow";
    if (code >= 80 && code <= 82) return "Rain showers";
    if (code >= 95) return "Thunderstorm";

    return "Unknown";
}

export async function getWeather(city) {

    //Convert city name → latitude/longitude
    const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );
    // console.log("geoResponse is " + geoResponse)

    const geoData = await geoResponse.json();
    console.log(geoData);

    if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`Could not find city: ${city}`);
    }

    const { latitude, longitude, name } = geoData.results[0];

    //Get real weather using coordinates
    const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=celsius`
    );

    const weatherData = await weatherResponse.json();

    //Return useful data to Zoe
    return {
        city: name,
        temperature: weatherData.current.temperature_2m,
        condition: getWeatherCondition(
            weatherData.current.weather_code
        )
    };
}