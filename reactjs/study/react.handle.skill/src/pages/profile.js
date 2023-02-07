import {useParams} from 'react-router-dom';

const data = {
    alice: {
        name: 'producer',
        desc: 'react app creator',
    },
    bob: {
        name: 'consumer',
        desc: 'react app user',
    },
}

const Profile = () => {
    const params = useParams();
    const profile = data[params.username]
    
    return (
        <div>
            <h1>프로필</h1>
            {
                profile? (
                    <div>
                        <h2>{profile.name}</h2>
                        <h2>{profile.desc}</h2>
                    </div>                    
                ) : (
                    <div>
                        <p>존재하지 않음</p>
                    </div>
                )
            }
        </div>
    )
}

export default Profile;