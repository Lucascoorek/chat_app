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
export const getUsers = usersData => dispatch => {
  dispatch({
    type: 'ADD_USERS',
    payload: usersData
  });
};
export const removeUser = (socket, user) => dispatch => {
  socket.emit('removeUser', user);
  dispatch({
    type: 'REMOVE_USER'
  });
};
