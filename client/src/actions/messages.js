export const readMessage = data => dispatch => {
  dispatch({
    type: 'READ_MESSAGE',
    payload: data
  });
};
export const sendMessage = (socket, txt) => dispatch => {
  socket.emit('sendMessage', txt);
};
