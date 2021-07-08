import React from 'react';
import { withRouter } from 'react-router-dom';
import SessionProvider from './Components/session/SessionProvider'
import './App.css';

import Routes from './Components/Routes';

function App(props) {
  return (
    <SessionProvider>
      <Routes {...props} />
    </SessionProvider>
  );

}

export default withRouter(App);