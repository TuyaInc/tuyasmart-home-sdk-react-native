
export const ConditionConfig = [
  {
    label: 'Weather',
    key: 'weather',
    type: 'condition',
  },
  {
    label: 'Temperature',
    key: 'temperature',
    type: 'temp',
  },
  {
    label: 'Humidity',
    key: 'humidity',
    type: 'humidity',
  },
  {
    label: 'Sunrises',
    key: 'sunrise',
    type: 'sunsetrise',
  },
  {
    label: 'AirQuality',
    key: 'airquality',
    type: 'aqi',
  },
];

export const weatherConfig = [
  {
    label: 'Sunny',
    key: 'Sunny',
  },
  {
    label: 'Snowy',
    key: 'Snow',
  },
  {
    label: 'Rainy',
    key: 'Rainy',
  },
  {
    label: 'Cloudy',
    key: 'Cloud',
  },
];

export const humidityConfig = [
  {
    label: 'Low',
    key: 'humiditylow',
  },
  {
    label: 'Medium',
    key: 'humiditymid',
  },
  {
    label: 'High',
    key: 'humidityhight',
  },
];
export const sunriseConfig = [
  {
    label: 'Sunrise',
    key: 'sunrisemoring',
  },
  {
    label: 'Sunset',
    key: 'sunnersetager',
  },
];
export const airConfig = [
  {
    label: 'Low',
    key: 'sunrisemoring',
  },
  {
    label: 'Medium',
    key: 'Ok',
  },
  {
    label: 'High',
    key: 'Polluted',
  },
];

export const conditionSettingConfig = {
  condition: weatherConfig,
  humidity: humidityConfig,
  sunsetrise: sunriseConfig,
  aqi: airConfig,
};
