import React from 'react';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';


const Notification = (props) => {
    return (
        <div className="app-container">
            <ReactNotification />
        </div>
    );
};


export default Notification;