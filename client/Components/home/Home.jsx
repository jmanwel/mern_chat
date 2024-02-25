import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from "../../userContext";
import { Navigate } from "react-router-dom";
import RoomList from "./RoomList.jsx";
import io from "socket.io-client"

let socket;
const Home = () => {

    const ENDPOINT = import.meta.env.VITE_ENDPOINT;

    useEffect(()=>{
        socket = io(ENDPOINT, {rejectUnauthorized: false,withCredentials: true, extraHeaders: {"my-custom-header": "abcd"}});
        return ()=>{
            socket.emit("disconnect");
            socket.off();
        }
    },[ENDPOINT]);

    const {user, setUser} = useContext(UserContext);

    const [room, setRoom] = useState('');
    
    const [rooms, setRooms] = useState([]);

    useEffect( ()=> {
        socket.on("room-created", room =>{
            setRooms([...rooms, room]);
        })
    }, [rooms]);

    useEffect( ()=>{
        socket.on("output-rooms", rooms => { setRooms(rooms) })
    }, [])

    useEffect( ()=> {
        console.log(rooms)
    }, [rooms]);

    const handleSubmit = e =>{
        e.preventDefault();
        socket.emit("create-room", room);
        console.log(room);
        setRoom('');

    }
    
    if (!user){
        return <Navigate to="/login" />
    }
    return (
        <div className="text-center">
            <div className="row">
                <div className="col s12 m6">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Welcome { user ? user.name:"" }!</span>
                            <div className="row">
                                <form className="container" onSubmit={ handleSubmit }>
                                    <br />
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <br />
                                            <input 
                                                id="room" 
                                                type="text" 
                                                className="validate form-control"
                                                value={ room }
                                                onChange={ e=>setRoom(e.target.value) }
                                            />
                                            <label htmlFor="room">Room</label>
                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <div className="row">
                                        <button className="btn btn-success">Create a new room</button>              
                                    </div>              
                                    <br />
                                    <br />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col s6 m5 offset-1">
                    <RoomList rooms={rooms}/>
                </div>
            </div>
        </div>
    )
}

export default Home
