import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { sendMessage, readMessage } from '../actions/messages';
import { removeUser, addUser, getUsers } from '../actions/users';
import { useBeforeunload } from 'react-beforeunload';
import moment from 'moment';
import Room from './Room';

const Chat = ({
  sendMessage,
  readMessage,
  messages,
  user,
  getUsers,
  removeUser,
  addUser
}) => {
  const socket = io('http://localhost:5000');
  useEffect(() => {
    if (user) addUser(user, socket);
    socket.on('message', message => readMessage(message));
    socket.on('usersData', usersData => getUsers(usersData));

    return function() {
      removeUser(user, socket);
    };
  }, []);
  useBeforeunload(() => removeUser(user, socket));
  const [txt, setForm] = useState('');
  const onChange = e => setForm(e.target.value);
  const onSubmit = e => {
    e.preventDefault();
    sendMessage(txt, user, socket);
    setForm('');
  };
  const ul = messages.map(message => (
    <li className='chat__message' key={message.id}>
      <p className='chat__message-top'>
        <span className='chat__user'>{message.username}</span>{' '}
        <span className='chat__date'>
          {moment(message.createdAt).fromNow()}
        </span>
      </p>
      <p className='chat__message-bottom'>{message.txt}</p>
    </li>
  ));
  return (
    <div className='chat'>
      <Room />
      <div>
        <form className='chat__form' onSubmit={e => onSubmit(e)}>
          <input
            type='text'
            name='username'
            id='username'
            value={txt}
            placeholder='type a message...'
            onChange={e => onChange(e)}
          />
          <input className='btn btn-primary' type='submit' value='Send' />
        </form>
      </div>
      <ul>{ul}</ul>
    </div>
  );
};

const mapStateToProps = state => ({
  messages: state.messages.messages,
  user: state.users.user
});
export default connect(
  mapStateToProps,
  { sendMessage, removeUser, readMessage, addUser, getUsers }
)(Chat);
