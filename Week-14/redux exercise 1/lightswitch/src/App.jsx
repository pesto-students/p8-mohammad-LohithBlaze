import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Provider } from 'react-redux';
import { store } from "./store.js";
import Room from './Room';

function App() {
  return <Provider store={store}>
    <Room />
  </Provider>;
}

export default App
