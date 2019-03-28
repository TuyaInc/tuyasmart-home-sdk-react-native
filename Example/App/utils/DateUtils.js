export function formartMessate(inputTime) {
  const date = new Date(inputTime * 1000);
  const y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? `0${m}` : m;
  let d = date.getDate();
  d = d < 10 ? `0${d}` : d;
  let h = date.getHours();
  h = h < 10 ? `0${h}` : h;
  let minute = date.getMinutes();
  let second = date.getSeconds();
  minute = minute < 10 ? `0${minute}` : minute;
  second = second < 10 ? `0${second}` : second;
  return `${m}-${d} ${h}:${minute}`;
}
/**
 * 根据经度转时区
 * @param {经度}} lon
 */
export function formatLon(lon) {
  const l = parseFloat(lon);
  if (l <= 7.5 && l >= -7.5) {
    timezone = 0;
  } else if (l <= 22.5 && l >= 7.5) {
    timezone = 1;
  } else if (l <= 37.5 && l >= 22.5) {
    timezone = 2;
  } else if (l <= 52.5 && l >= 37.5) {
    timezone = 3;
  } else if (l <= 67.5 && l >= 52.5) {
    timezone = 4;
  } else if (l <= 82.5 && l >= 67.5) {
    timezone = 5;
  } else if (l <= 97.5 && l >= 82.5) {
    timezone = 6;
  } else if (l <= 112.5 && l >= 97.5) {
    timezone = 7;
  } else if (l <= 127.5 && l >= 112.5) {
    timezone = 8;
  } else if (l <= 142.5 && l >= 127.5) {
    timezone = 9;
  } else if (l <= 157.5 && l >= 142.5) {
    timezone = 10;
  } else if (l <= 172.5 && l >= 157.5) {
    timezone = 11;
  } else if (l <= -172.5 || l >= 172.5) {
    timezone = 12;
  } else if (l <= -157.5 && l >= -172.5) {
    timezone = -11;
  } else if (l <= -142.5 && l >= -157.5) {
    timezone = -10;
  } else if (l <= -127.5 && l >= -142.5) {
    timezone = -9;
  } else if (l <= -112.5 && l >= -127.5) {
    timezone = -8;
  } else if (l <= -97.5 && l >= -112.5) {
    timezone = -7;
  } else if (l <= -82.5 && l >= -97.5) {
    timezone = -6;
  } else if (l <= -67.5 && l >= -82.5) {
    timezone = -5;
  } else if (l <= -52.5 && l >= -67.5) {
    timezone = -4;
  } else if (l <= -37.5 && l >= -52.5) {
    timezone = -3;
  } else if (l <= -22.5 && l >= -37.5) {
    timezone = -2;
  } else if (l <= -7.5 && l >= -22.5) {
    timezone = -1;
  }
  return timezone;
}
