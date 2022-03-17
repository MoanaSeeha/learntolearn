import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './state/store'
import './styles/style.scss'; // imports twice somehow
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from "react-moralis";

// strict mode makes it run twice??
// https://stackoverflow.com/questions/50819162/why-is-my-function-being-called-twice-in-react
// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );


// https://docs.moralis.io/moralis-server/tools/react-moralis
let serverUrl = process.env.M_SERVER_URL
let appId =  process.env.M_APP_ID;
// ReactDOM.render(
//     <Provider store={store}>
//       <MoralisProvider appId={appId} serverUrl={serverUrl}>
//         <App />
//       </MoralisProvider>
//     </Provider>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <Provider store={store}>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <App />
    </MoralisProvider>
  </Provider>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
