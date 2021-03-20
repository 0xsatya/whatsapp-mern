import React, { useEffect, useState } from 'react';
import  './App.css';
import "./Sidebar.css";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { IconButton, Avatar } from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db from "./firebase";

const Sidebar = () => {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => 
                ({
                    id: doc.id,
                    data: doc.data(),
                })
                ))
        ));
        }, [])
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src="https://avatars.githubusercontent.com/u/63343224?s=400&u=d2cbe75e47b84b4d31c8b249b7f099af7933ae54&v=4"/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new Chat" type="text" />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id}
                    name={room.data.name}/>                    
                ))}
                
            </div>
        </div>
    )
}

export default Sidebar
