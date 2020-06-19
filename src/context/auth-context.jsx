import React from 'react';

const authContext = React.createContext({ 
  loggedIn: false,
  updateAuth: () => {}
});

export default authContext;