import React from 'react'
import ReactDOM from 'react-dom'

const fetchApi = async function(){
  const response = await fetch('http://localhost:3000/api')
  const json = await response.json();
  console.log('fetched from react', json);
}

const Hello = props => {
  fetchApi();
  return React.createElement('div', null, `Hello ${props.name}`)
  
}

Hello.defaultProps = {
  name: 'David'
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    React.createElement(Hello, {name: 'Rails 8'}, null),
    document.getElementById('app'),
  )
})