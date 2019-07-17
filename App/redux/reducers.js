const HOME_ID = 'home_id';

const initState = {
  home_id: '',
};

export default function HomeIDStore(state = initState, action = []) {
  switch (action.type) {
    case HOME_ID:
      return {
        ...state,
        homeId: action.homeId,
      };

    default:
      return state;
  }
}
