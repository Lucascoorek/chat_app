export const addUser = (socket, { username, room }, history) => dispatch => {
  socket.emit('addUser', { username, room }, (error, user) => {
    if (error) {
      dispatch({
        type: 'USER_ERROR',
        payload: error
      });
    } else {
      dispatch({
        type: 'ADD_USER',
        payload: user
      });
      history.push('/chat');
    }
  });
};
