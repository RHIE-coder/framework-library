import React from 'react';
import ReactDOM from 'react-dom/client';

const MyContext = React.createContext({
    user: 'rhie-coder',
    age: 30,
})

class App extends React.Component {
    render() {
        return (
            <MyContext.Provider value={{
                user: 'alice',
                age: 22,
            }}>
                <UserInfo />
            </MyContext.Provider>
        )
    }
}

class UserInfo extends React.Component {

    componentDidMount() {
        console.log(this.context);
    }

    render() {
        return (
            <div>
                <h1>test</h1>
            </div>
        );
    }
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)