import React, {useReducer} from 'react';
import ReactDOM from 'react-dom/client';

function reducer(state, action) {
    console.log(action.type);
    return { num: state.num + 1 }
}

const Counter = () => {
    const [state, dispatch] = useReducer(reducer, {num: 100})

    return (
        <React.Fragment>
            <p>COUNT: {state.num}</p>
            <button onClick={()=> dispatch({type: "something"})}>+</button>
        </React.Fragment>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Counter></Counter>
)