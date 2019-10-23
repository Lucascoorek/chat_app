const initialState = {
  error: null,
  users: [],
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_USER':
      return {
        ...state,
        user: payload,
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
