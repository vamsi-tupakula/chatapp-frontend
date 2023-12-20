import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

function Home({ socket }) {
    console.log(socket);
    const [msg, setMsg] = useState("");
    const [data, setData] = useState(null);
    const [currRoom, setCurrRoom] = useState("Vampires");
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            if (!localStorage.getItem('username')) {
                navigate('/');
            } else {
                setUsername(localStorage.getItem('username'));
                setLoading(false);
            }
        }, 500);
    }, [navigate])

    useEffect(() => {
        const getMessages = (data) => {
            console.log(data);
            setData(data);
        };
        socket.on("display", getMessages);
        socket.emit('get-messages');

        return () => {
            socket.off("display", getMessages);
        };
    }, [socket])


    const handleSend = (e) => {
        e.preventDefault();
        socket.emit("send-message", currRoom, { name: username, msg });
        setMsg("");
    };

    if (loading) {
        return (
            <div className='join__page'>
                <h1 className='heading'>Loading...</h1>
            </div>
        )
    }


    return (
        <div className='container'>
            <div className="left rooms">
                <h1 className="sub__heading">Rooms</h1>
                <ul>
                    {
                        data && data.map((room) => {
                            return (
                                <li key={room._id} className={`room ${room.name === currRoom && "active"}`} onClick={() => setCurrRoom(room.name)}>
                                    {room.name}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="right message__area">
                <div className="messages">
                    {
                        data && data.map((room) => {
                            if (room.name === currRoom) {
                                if (room.messages.length === 0) {
                                    return <h3>No messages found...</h3>
                                }
                                return room.messages.map((msg_, index) => {
                                    return <h3 className={msg_.name === username ? "you" : "other"} key={index}>{msg_.name} : {msg_.msg}</h3>
                                })
                            }
                            return null;
                        })
                    }
                </div>
                <form className="chat__form" onSubmit={handleSend}>
                    <input type="text" placeholder='Message' value={msg} onChange={(e) => setMsg(e.target.value)} />
                    <button className="btn">Send</button>
                </form>
            </div>
        </div>
    )
}

export default Home