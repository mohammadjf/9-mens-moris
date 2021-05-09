import React from 'react';
import ReactDOM from 'react-dom';
import Playground from './components/Playground';
import reportWebVitals from './reportWebVitals';
import Pusher from 'pusher-js';

const pusher = new Pusher('b85457c928f6ef3b43d3', {
  cluster: 'ap2'
});

let channel = pusher.subscribe('my-channel');

ReactDOM.render(
  <React.StrictMode>
    <Playground channel={channel} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
