export const convertKelvinToCelsius = (kelvin: number) => {
  return kelvin - 273.15;
};

export const convertKelvinToFahrenheit = (kelvin: number) => {
  return (kelvin * 9) / 5 - 459.67;
};
