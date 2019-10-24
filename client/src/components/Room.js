import React from 'react';
import { connect } from 'react-redux';

const Room = ({ users, room }) => {
  const ul = users.map(user => <li key={user._id}>{user.username}</li>);
  return (
    <div>
      <p>Room component</p>
      <p>Room is: {room}</p>
      <ul>{ul}</ul>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users.users,
  room: state.users.room
});
export default connect(mapStateToProps)(Room);
