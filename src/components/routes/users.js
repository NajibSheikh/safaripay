import React from "react";
import { Link } from "react-router-dom";

const Users = () => {
  return (
    <div className="home">
      <h1>Users</h1>
      <Link to="/users/addUser">Add User</Link>
      <Link to="/users/loadUsers">Load Users</Link>
    </div>
  );
};

export default Users;
