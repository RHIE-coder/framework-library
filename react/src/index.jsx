import React from 'react';
import ReactDOM from 'react-dom/client';

class HelloWorld extends React.Component {
    render() {
        return React.createElement(
            'h1', 
            this.props, 
            `hello ${this.props.mainFrame} world`)
    }
}

const properties = [
    {id:"java", mainFrame:"spring", title:"java is good"},
    {id:"javascript", mainFrame:"node.js", title:"javscript is good"},
    {id:"python", mainFrame:"fastapi", title:"python is good"},
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    React.createElement(
        "div",
        null,
        React.createElement(HelloWorld,properties[0]),
        React.createElement(HelloWorld,properties[1]),
        React.createElement(HelloWorld,properties[2]),
    )
)