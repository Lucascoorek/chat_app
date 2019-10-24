import uuid from 'uuid/v4';

const initialState = {
  messages: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'READ_MESSAGE':
      payload.id = uuid();
      return {
        ...state,
        messages: [payload, ...state.messages]
      };
    default:
      return state;
  }
}
