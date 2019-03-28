import Strings from '../i18n';

export const ConditionConfig = [
  {
    label: Strings.Weather,
    key: 'weather',
    type: 'condition',
  },
  {
    label: Strings.Temperature,
    key: 'temperature',
    type: 'temp',
  },
  {
    label: Strings.Humidity,
    key: 'humidity',
    type: 'humidity',
  },
  {
    label: Strings.Sunrises,
    key: 'sunrise',
    type: 'sunsetrise',
  },
  {
    label: Strings.AirQuality,
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
