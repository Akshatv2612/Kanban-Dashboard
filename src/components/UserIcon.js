import React, { useState, useEffect } from 'react';
import './UserIcon.css';

const UserIcon = ({ name, width, height, fill, available, ...rest }) => {
    const [iconUrl, setIconUrl] = useState(null);
    console.log(available);

    useEffect(() => {
        const formattedName = name.replace(/\s+/g, '+');
        const apiUrl = `https://api.dicebear.com/5.x/initials/svg?seed=${name}`;

        fetch(apiUrl)
            .then((response) => {
                if (response.ok) {
                    return response.blob();
                } else {
                    throw new Error(`API call failed with status: ${response.status}`);
                }
            })
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                setIconUrl(url);
            })
            .catch((error) => {
                console.error(`API call failed: ${error.message}`);
            });
    }, [name]);

    return (
        <div className='icon'>
            <div className='active-status' style={{ backgroundColor: available ? '#e8b602' : '#dfe1e4' }}></div>
            <img className='user-icon' src={iconUrl} width={width} height={height} alt={name} {...rest} />
        </div>
    );
};

export default UserIcon;