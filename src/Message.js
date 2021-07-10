import { Avatar } from '@material-ui/core'
import React from 'react'
import "./Message.css"
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'

function Message({id,contents: {timestamp, displayName, email, message, photo, uid}}) {

    const user = useSelector(selectUser);

    return (
        <div className={user.email === email? "message message__sender": "message"}>
            <Avatar className="message__photo" src={photo}/>
            <div className="message__info">
                <p><strong>{displayName}</strong></p>
                <small>{message}</small>
                <small className="message__timestamp">{new Date(timestamp?.toDate()).toLocaleString()}</small>
            </div>
            
        </div>
    )
}

export default Message
