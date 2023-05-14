import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, Outlet } from 'react-router-dom';

const AdminPrivateRoute = () => {

  const loggedUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  let type;

  if (!loggedUser) {
    type = 'nouser'
  } else if (loggedUser.type === 'admin') {
    type = 'admin'
  } else {
    type = 'notadmin'
  }


  return (
    <>
      {type === 'admin' ? <Outlet /> : type === 'nouser' ? <Navigate to='/login' /> : <Navigate to='/user' />}
    </>
  );
};

export default AdminPrivateRoute;
