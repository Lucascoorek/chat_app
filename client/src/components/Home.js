import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../actions/users';
import { readMessage } from '../actions/messages';
import socket from '../socket';

const Home = ({ addUser, readMessage, user, history }) => {
  useEffect(() => {
    socket.on('message', message => readMessage(message));
  }, [readMessage]);

  const [form, setForm] = useState({
    username: '',
    room: ''
  });
  const { username, room } = form;
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    addUser(socket, { username, room }, history);
  };

  return (
    <section className='home'>
      <h1>Welcome to ChatON</h1>
      <div>
        <form onSubmit={e => onSubmit(e)}>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={e => onChange(e)}
          />
          <label htmlFor='room'>Room</label>
          <input
            type='text'
            name='room'
            id='room'
            value={room}
            onChange={e => onChange(e)}
          />
          <input type='submit' value='Start a chat' />
        </form>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  user: state.users.user
});
export default connect(
  mapStateToProps,
  { addUser, readMessage }
)(Home);
