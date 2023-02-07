import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const Home = React.lazy(()=>import("./pages/Home")) 
const About = React.lazy(()=>import("./pages/About"))
const Profile = React.lazy(()=>import("./pages/profile"))

const App = () => {

    return (
        <React.Fragment>
            <React.Suspense fallback={<div>wait plz</div>}>
            <h1>Hello World</h1>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/profiles/:username" element={<Profile />} />
            </Routes>
            </React.Suspense>
        </React.Fragment>
    )
}


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)