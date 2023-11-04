import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function JoinPage() {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            if (localStorage.getItem('username')) {
                navigate('/chat');
            } else {
                setLoading(false);
            }
        }, 1000);
    }, [navigate])

    function handleRoomJoin(e) {
        e.preventDefault();
        if (username.length === 0) return;
        localStorage.setItem('username', username);
        setTimeout(() => {
            navigate('/chat');
        }, 300)
    }

    if (loading) {
        return (
            <div className='join__page'>
                <h1 className='heading'>Loading...</h1>
            </div>
        )
    }

    return (
        <div className='join__page'>
            <h1 className='heading'>Welcome to ChatNow</h1>
            <form onSubmit={handleRoomJoin} className='join__form'>
                <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <button className="join__btn btn">Join Chat</button>
            </form>
        </div>
    )
}

export default JoinPage