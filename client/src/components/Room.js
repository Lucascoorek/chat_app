import React from 'react';
import { connect } from 'react-redux';

const Room = ({ users, room }) => {
  const ul = users.map(user => <li key={user._id}>{user.username}</li>);
  return (
    <div className='room'>
      <h1>
        Room: <span className='room__title'>{room}</span>
      </h1>
      <div className='room__list'>
        <h2>Users:</h2>
        <ul>{ul}</ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users.users,
  room: state.users.room
});
export default connect(mapStateToProps)(Room);
