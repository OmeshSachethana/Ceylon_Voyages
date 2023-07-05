import { getNotifications, addNotifications, updateNotifications } from '../services/notifications'
import React, { useState, useRef, useEffect } from 'react';

export function Notification() {
    const [notificationMenu, setNotificationMenu] = useState(false)
    const [notifications, setNotifications] = useState([]);
    const [isRead, setIsRead] = useState();

    //notification count
    var count = 0;
    notifications.map((notification) => {
        if (notification.isRead == false) {
            count++;
        }
        console.log(count);
    })
    const notificationCount = count;

    // fetching notifications
    const fetchData = async () => {
        try {
            const response = await getNotifications(false)
            setNotifications(response.data);
            setIsRead(response.data.isRead);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        const interval = setInterval(() => {
            fetchData();
        }, 5000);
        return () => clearInterval(interval);
    }, [])

    const currentTime = new Date().toISOString();
    const handleNotificaiton = async (e) => {
        const updatedNotifications = [];
        for (const notification of notifications) {
            const data = { isRead: true };
            if (!notification.isRead) {
                data.time = currentTime;
            }
            const response = await updateNotifications(notification._id, data, true);
            updatedNotifications.push(response.data);
        }
        setNotifications(updatedNotifications);
        setNotificationMenu(!notificationMenu);
    }

    return (
        <>
            <div>
                <button onClick={handleNotificaiton}>
                    <i className="fa fa-bell icon-circle icon-circle" />
                </button>

            </div>
            {/*Notification*/}
            <div className='relative'>
                <button onClick={() => setNotificationMenu(!notificationMenu)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" />
                    {notificationCount > 0 && <span className="absolute -top-3 -right-0 px-2 rounded-full bg-red-500 text-white text-xs">{notificationCount}</span>}
                </button>
                <div className={`50 ${notificationMenu ? '' : 'hidden'}  absolute right-5  top-25 z-30 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown`} style={{ maxHeight: '150px', overflowY: 'scroll' }}>
                    <div className="px-4 py-3">
                        {notifications.map((notification) => {
                            const time = new Date(notification.time).toLocaleTimeString();
                            return (
                                <div key={notification._id}>
                                    <span className="block text-sm text-gray-900 dark:text-white">{notification.notification_title}</span>
                                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{notification.message}</span>
                                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400" style={{ textAlign: 'right' }}>{time}</span>
                                    <hr />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notification;


