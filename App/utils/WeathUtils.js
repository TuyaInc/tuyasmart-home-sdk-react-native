export function getImage(data) {
  if (data == '晴') return require('../res/sunny.png');
  if (data == '雪') return require('../res/snow.png');
  if (data == '霾') return require('../res/polluted.png');
  if (data == '雨') return require('../res/rainy.png');
  if (data == '阴') return require('../res/cloud.png');
}
export function getText(data) {
  if (data == '晴') return 'Sunny';
  if (data == '雪') return 'Snow';
  if (data == '霾') return 'Polluted';
  if (data == '雨') return 'Rainy';
  if (data == '阴') return 'Cloud';
}
