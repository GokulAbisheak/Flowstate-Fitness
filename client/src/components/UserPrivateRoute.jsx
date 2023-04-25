import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, Outlet } from 'react-router-dom';

const UserPrivateRoute = () => {

  const loggedUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  let type;

  if (!loggedUser) {
    type = 'notuser'
  } else if (loggedUser.type === 'user') {
    type = 'user'
  } else {
    type = 'notuser'
  }


  return (
    <>
      {type === 'user' ? <Outlet /> : <Navigate to='/login' />}
    </>
  );
};

export default UserPrivateRoute;
