import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

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
        (async() => {
            const res = await axios({
                baseURL: 'http://172.22.11.249:3001',
                url: '/test',
                method: 'get',
                data: {
                    greeting: 'hello world',
                }
            }) 
            console.log(res)
            console.log(res.data)
        })()
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
    <App name="rhie" />
)