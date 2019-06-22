import React from 'react';

export default (props)=>{
    return (
        <div className={`status status-${props.type}`}>{props.text}</div>
    );
}