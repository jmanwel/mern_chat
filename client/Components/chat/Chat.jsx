import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../userContext";
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";
import Messages from "./messages/Messages";

let socket;
const Chat = () => {

    const ENDPOINT = "http://132.226.242.181:5000/";

    const {user, setUser} = useContext(UserContext);

    let {room_id, room_name} = useParams();
    
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        socket = io(ENDPOINT);
        socket.emit("join", { name:user.name, room_id, user_id: user.id })
    },[]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message])
        })
    }, [messages]);

    const sendMessage = event =>{
        event.preventDefault();
        if(message){
            console.log(message);
            socket.emit("send-message", message, room_id, ()=>setMessage(""));
        }
    }

    return (
        <div>
            <Messages messages={ messages } user_id={ user.id }/>
            <form action ="" onSubmit={ sendMessage }>
                <input 
                    type="text" 
                    value={message}
                    onChange={ event=>setMessage(event.target.value) }
                    onKeyPress={ event=>event.key === "Enter"?sendMessage(event): null }
                />
                <button>Send message</button>
            </form>
        </div>
    )
}

export default Chat
