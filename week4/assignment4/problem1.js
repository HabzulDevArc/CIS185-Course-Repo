// Problem 1: Temperature Converter Suite
// William Allen
// 10/23/25

function celsiusToFahrenheit(celsius) {
    const fahrenheit = (celsius * 9/5) + 32;
    return fahrenheit;
}

function fahrenheitToCelsius(fahrenheit) {
    const celsius = (fahrenheit - 32) * 5/9;
    return celsius; 
}

function getTemperatureDescription(fahrenheit) {
    if (fahrenheit < 32) return "Freezing";
    if (fahrenheit < 50) return "Cold";
    if (fahrenheit < 70) return "Cool";
    if (fahrenheit < 85) return "Warm";
    return "Hot";
}

// Test cases
console.log("testing celsiusToFahrenheit");
console.log(celsiusToFahrenheit(0));
console.log(celsiusToFahrenheit(100));
console.log(celsiusToFahrenheit(-40));

console.log("Testing fahrenheitToCelsius:");
console.log(fahrenheitToCelsius(32));
console.log(fahrenheitToCelsius(68));
console.log(fahrenheitToCelsius(212));

console.log("Testing getTemperatureDescription:")
console.log(getTemperatureDescription(25));
console.log(getTemperatureDescription(75));
console.log(getTemperatureDescription(95));
