import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addUser, getUsers } from '../actions/users';
import { readMessage } from '../actions/messages';
import socket from '../socket';
import { Link } from 'react-router-dom';

const Home = ({ addUser, readMessage, user, history, getUsers }) => {
  useEffect(() => {
    socket.on('message', message => readMessage(message));
    socket.on('usersData', usersData => getUsers(usersData));
  }, [readMessage, getUsers]);

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

  if (!user) {
    return (
      <section className='home'>
        <h1>Welcome to ChatON</h1>
        <div className='form-group'>
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
            <input
              className='btn btn-dark'
              type='submit'
              value='Start a chat'
            />
          </form>
        </div>
      </section>
    );
  } else {
    return (
      <section className='home'>
        <Link className='btn btn-dark' to='/chat'>
          Back to Chat
        </Link>
      </section>
    );
  }
};

const mapStateToProps = state => ({
  user: state.users.user
});
export default connect(
  mapStateToProps,
  { addUser, readMessage, getUsers }
)(Home);
