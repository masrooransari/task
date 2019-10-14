import React from 'react';
import logo from './logo.svg';
import './App.css';
function App(props) {
  return (
    <div>
      <span>Hello World! {props.name}</span>      
    </div>
  );
}

export default App;