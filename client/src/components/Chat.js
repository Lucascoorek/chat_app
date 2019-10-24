import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import io from 'socket.io-client';
import { sendMessage } from '../actions/messages';
import { removeUser } from '../actions/users';
import socket from '../socket';
import { useBeforeunload } from 'react-beforeunload';
import moment from 'moment';
import Room from './Room';

const Chat = ({ sendMessage, messages, user, removeUser }) => {
  // useEffect(() => {
  //   return () => removeUser(socket, user);
  // }, [removeUser, user]);
  useBeforeunload(() => removeUser(socket, user));
  const [txt, setForm] = useState('');
  const onChange = e => setForm(e.target.value);
  const onSubmit = e => {
    e.preventDefault();
    sendMessage(socket, txt, user);
    setForm('');
  };
  const ul = messages.map(message => (
    <li key={message.id}>
      <p>
        <span>{message.username}</span>{' '}
        <span>{moment(message.createdAt).fromNow()}</span>
      </p>
      <p>{message.txt}</p>
    </li>
  ));
  return (
    <div>
      <Room />
      <div className='form-group'>
        <form onSubmit={e => onSubmit(e)}>
          <input
            type='text'
            name='username'
            id='username'
            value={txt}
            onChange={e => onChange(e)}
          />
          <input type='submit' value='Send' />
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
  { sendMessage, removeUser }
)(Chat);
