import React from 'react';

export default (props)=>{
    return (
        <div>
            {props.status}
            <br/>
            Action:
            <br/>
            <input type="submit" value={props.statusActionText} onClick={props.statusAction}/>
        </div>
    );
}