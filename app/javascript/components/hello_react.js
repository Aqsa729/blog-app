import React from 'react'
import ReactDOM from 'react-dom'

const Hello = props => (
  React.createElement('div', null, `Hello ${props.name}`)
  // jsx not working: `<div>hi {name}<div/>`
)

Hello.defaultProps = {
  name: 'David'
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    React.createElement(Hello, {name: 'Rails 8'}, null),
    document.getElementById('app'),
  )
})