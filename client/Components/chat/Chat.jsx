import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../userContext";
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";
import Messages from "./messages/Messages";
import Input from "./input/Input";
import "./Chat.css";

let socket;
const Chat = () => {

    const ENDPOINT = import.meta.env.VITE_ENDPOINT;

    const {user, setUser} = useContext(UserContext);

    let {room_id, room_name} = useParams();
    
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        socket = io(ENDPOINT);
        socket.emit("join", { name:user.name, room_id, user_id: user._id })
    },[]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message])
        })
    }, [messages]);

    useEffect(() => {
        socket.emit('get-messages-history', room_id)
        socket.on('output-messages', messages => {
            setMessages(messages)
        })
    }, [])

    const sendMessage = event =>{
        event.preventDefault();
        if(message){
            console.log(message);
            socket.emit("send-message", message, room_id, ()=>setMessage(""));
        }
    }

    return (
        <div className='outerContainer'>
            <div className="container">
                <Messages messages={ messages } user_id={ user._id }/>
                <Input 
                    message={ message }
                    setMessage={ setMessage }
                    sendMessage={ sendMessage }
                />
            </div>
        </div>
    )
}

export default Chat
