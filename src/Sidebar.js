import React, {useState,useEffect} from 'react'
import "./Sidebar.css"
import Message from "./Message"
import {useSelector} from 'react-redux'
import {selectUser} from './features/userSlice'
import db from './firebase'
import firebase from 'firebase'

function Sidebar() {

    const user = useSelector(selectUser);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
            db.collection("messages")
            .orderBy('timestamp', 'desc')
            .onSnapshot( snapshot => 
            setMessages(snapshot.docs.map( doc => ({
                id: doc.id,
                data: doc.data()
            }))));
    },[]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("messages")
        .add({
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput("");
    };

    return (
        <div className="sidebar">

            <div className="sidebar__messages">
            
                {messages.map(({ id, data}) => (
                        <Message key={id} contents={data} />
                    ))}
            </div>
            
            <div className="sidebar__input">
                <form>
                    <input
                    value={input}
                    onChange={(e) => {setInput(e.target.value)}}
                    placeholder="Send Message" type="text"/>
                    <button 
                    onClick={sendMessage}></button>
                </form>
            </div>
        </div>
    )
}

export default Sidebar
