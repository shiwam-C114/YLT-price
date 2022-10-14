import React from 'react'
import ReactDOM from 'react-dom';
// import { MoralisProvider } from 'react-moralis';
import App from './App'


ReactDOM.render(
  <React.StrictMode>
    {/* <MoralisProvider> */}
    <App />
    {/* </MoralisProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
)
