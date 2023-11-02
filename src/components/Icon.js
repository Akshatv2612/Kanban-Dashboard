import React from 'react';

const Icon = ({ name, width, height, fill, ...rest }) => {
    try {
        const icon = require(`../assets/icons/${name}.svg`);
        return <img src={icon} width={width} height={height} fill={fill} alt={name} {...rest} color='red' />;
    } catch (error) {
        console.error(`Icon "${name}.svg" not found.`);
        return null;
    }
};

export default Icon;