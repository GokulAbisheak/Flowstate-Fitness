import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, Outlet } from 'react-router-dom';

const LoggedRedirect = () => {

  const loggedUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  let notLogged;

  if (!loggedUser) {
    notLogged = true
  } else {
    notLogged = false
  }


  return (
    <>
      {notLogged === true ? <Outlet /> : <Navigate to='/user' />}
    </>
  );
};

export default LoggedRedirect;
