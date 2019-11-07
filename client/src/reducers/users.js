const initialState = {
  error: null,
  users: [],
  user: null,
  userStore: null,
  room: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_USER':
    case 'ADD_USER_TO_STORE':
      return {
        ...state,
        user: payload,
        error: null
      };
    case 'REMOVE_USER':
      return {
        ...state,
        user: null,
        users: [],
        error: null,
        room: null
      };
    case 'ADD_USERS':
      return {
        ...state,
        users: payload.users,
        room: payload.room,
        error: null
      };
    case 'USER_ERROR':
      return {
        ...state,
        error: payload,
        user: null
      };
    default:
      return state;
  }
}
