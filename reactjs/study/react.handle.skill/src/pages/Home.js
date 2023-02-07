import { Link } from 'react-router-dom';


const Home = () => {

    return (
        <div>
            <h1>홈</h1>
            <Link to="/about">about</Link>
        </div>
    )
}

export default Home;