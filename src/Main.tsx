import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const container = document.getElementById('root');
const root = createRoot(container!); 
root.render(<div>hello 怎么可以没有编译出来<App /></div>)
