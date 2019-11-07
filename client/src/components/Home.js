import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addUser, getUsers, addUserToStore } from '../actions/users';
import { readMessage, removeMessages } from '../actions/messages';
import { Link } from 'react-router-dom';
// import socket from '../socket';

const Home = ({
  addUser,
  readMessage,
  userStore,
  history,
  getUsers,
  addUserToStore
}) => {
  const [form, setForm] = useState({
    username: '',
    room: ''
  });
  const { username, room } = form;
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    addUserToStore({ username, room }, history);
  };

  if (!userStore) {
    return (
      <section className='home'>
        <div className='form-group'>
          <h1>Welcome to ChatON</h1>
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
              className='btn btn-warning'
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
  user: state.users.userStore
});
export default connect(
  mapStateToProps,
  { addUser, readMessage, getUsers, removeMessages, addUserToStore }
)(Home);
