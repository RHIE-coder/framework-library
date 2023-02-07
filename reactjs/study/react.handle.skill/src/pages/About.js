import {Link, useLocation, useSearchParams} from "react-router-dom";


const About = () => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get('q');
    const p = searchParams.get('p')
    const onIncrease = () => {
        setSearchParams({q:100, p:100})
    }
    return (
        <div>
            <h1>소개</h1>
            <h3>{location.search}</h3>
            <p>{q}</p>
            <p>{p}</p>
            <div>
                <Link to="/">홈</Link>
            </div>
            <button onClick={onIncrease}>CLICK</button>
        </div>
    )
}


export default About;