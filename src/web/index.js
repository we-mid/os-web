
import React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './App'
import './App.css'


injectTapEventPlugin()

let root = document.getElementById('root')
render(<App />, root)
