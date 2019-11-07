import { removeMessages } from './messages';

export const addUser = ({ username, room }, socket) => dispatch => {
  console.log({ username, room });

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
    }
  });
};
export const getUsers = usersData => dispatch => {
  dispatch({
    type: 'ADD_USERS',
    payload: usersData
  });
};
export const removeUser = (user, socket) => dispatch => {
  console.log(user);
  socket.emit('removeUser', user);
  dispatch({
    type: 'REMOVE_USER'
  });
  dispatch(removeMessages());
};
export const addUserToStore = ({ username, room }, history) => dispatch => {
  dispatch({
    type: 'ADD_USER_TO_STORE',
    payload: { username, room }
  });
  history.push('/chat');
};
