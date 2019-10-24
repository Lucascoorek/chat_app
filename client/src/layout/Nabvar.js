import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = user => {
  return (
    <nav>
      <h1>
        <i className='fas fa-comments'></i> ChatOn
      </h1>
      <Link className='btn' to='/'>
        Home
      </Link>
    </nav>
  );
};
const mapStateToProps = state => ({
  user: state.users.user
});
export default connect(mapStateToProps)(Navbar);
