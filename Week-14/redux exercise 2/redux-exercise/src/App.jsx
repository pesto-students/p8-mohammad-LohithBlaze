import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Provider } from 'react-redux';
import { store } from './store';
import StepCounter from './StepCounter';

function App() {
  return <Provider store={store}>
    <StepCounter />
  </Provider>;
}

export default App
