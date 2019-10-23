import React, { useState } from 'react';
import { connect } from 'react-redux';
// import io from 'socket.io-client';
import { sendMessage } from '../actions/messages';
import socket from '../socket';

const Chat = ({ sendMessage, messages }) => {
  const [txt, setForm] = useState('');
  const onChange = e => setForm(e.target.value);
  const onSubmit = e => {
    e.preventDefault();
    sendMessage(socket, txt);
    setForm('');
  };
  const ul = messages.map(message => (
    <li key={message.createdAt}>{message.txt}</li>
  ));
  return (
    <div>
      <div>
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
  messages: state.messages.messages
});
export default connect(
  mapStateToProps,
  { sendMessage }
)(Chat);
