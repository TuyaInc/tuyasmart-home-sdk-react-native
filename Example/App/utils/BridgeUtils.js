export function bindEventName(key, id) {
  return `${key}//${id}`;
}
export function formatData(data) {
  const d = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].productId == 'zWpmiNWIMKJNHOUq') {
      d.push(data[i]);
    }
  }
  return d;
}
export function formatShareData(data) {
  const d = [];
  for (let i = 0; i < data.length; i++) {
    if (!data[i].isShare) {
      d.push(data[i]);
    }
  }

  return d;
}
