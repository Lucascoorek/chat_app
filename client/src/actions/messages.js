// import socket from '../socket';

export const readMessage = data => dispatch => {
  dispatch({
    type: 'READ_MESSAGE',
    payload: data
  });
};
export const sendMessage = (txt, user, socket) => dispatch => {
  socket.emit('sendMessage', txt, user);
};
export const removeMessages = () => dispatch => {
  dispatch({
    type: 'REMOVE_MESSAGES'
  });
};
