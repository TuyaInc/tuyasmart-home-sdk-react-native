const HOME_ID = 'home_id';

export function storeHomeId(homeId) {
  return {
    type: HOME_ID,
    homeId,
  };
}
