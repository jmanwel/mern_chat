import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from "../../userContext";
import { Link } from "react-router-dom";
import RoomList from "./RoomList.jsx";
import io from "socket.io-client"

let socket;
const Home = () => {

    const ENDPOINT = "http://132.226.242.181:5000/";

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
    
    const setASJohn = ()=>{
        const john = {name: "John", 
                      mail: "john@email.com",
                      password: "123",
                      id: "123"
                    };
        setUser(john)
    }

    const setASTom = ()=>{
        const tom = {name: "Tom", 
                      mail: "tom@email.com",
                      password: "456",
                      id: "456"
                    };
        setUser(tom)
    }

    return (
        <div>
            <div className="row">
                <div className="col s12 m6">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Welcome { user ? user.name:"" }</span>
                            <div className="row">
                                <form onSubmit={ handleSubmit }>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input 
                                                placeholder="Enter a room name" 
                                                id="room" 
                                                type="text" 
                                                className="validate"
                                                value={ room }
                                                onChange={ e=>setRoom(e.target.value) }
                                            />
                                            <label htmlFor="room">Room</label>
                                        </div>
                                    </div>              
                                    <button className="btn">Create a room</button>              
                                </form>
                            </div>
                        </div>
                        <div className="card-action">
                            <a href="#" onClick={setASJohn}>set as John</a>
                            <a href="#" onClick={setASTom}>set as Tom</a>
                        </div>
                    </div>
                </div>
                <div className="col s6 m5 offset-1">
                    <RoomList rooms={rooms}/>
                </div>
            </div>
            <Link to="/chat">
                <button>Go to chat</button>
            </Link>
        </div>
    )
}

export default Home
