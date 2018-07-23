import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// window.addEventListener("DOMContentLoaded", function (event) {
//     var appbarHeight = document.getElementById('appbar').clientHeight;

//     var height = window.innerHeight
//         || document.documentElement.clientHeight
//         || document.body.clientHeight;

//     var contentHeight = height - appbarHeight;

//     document.getElementById('content').setAttribute("style", `margin-top: ${appbarHeight}px;height: ${contentHeight}px`);
// });

// window.addEventListener("resize", function (event) {
//     var appbarHeight = document.getElementById('appbar').clientHeight;

//     var height = window.innerHeight
//         || document.documentElement.clientHeight
//         || document.body.clientHeight;

//     var contentHeight = height - appbarHeight;

//     document.getElementById('content').setAttribute("style", `margin-top: ${appbarHeight}px;height: ${contentHeight}px`);
// });
