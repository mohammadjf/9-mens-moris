import React, { useState } from 'react';

function PlaceHolder(props) {
    
    const [piece, setPiece] = useState('none');

    return (
        <div 
            className={"place-holder " + props.position}
            onClick={ () => {
                setPiece('myself');
            }}
        >
            {
                piece == 'myself' ? <div className="piece"></div> : ""
            }
        </div>
    );
}

export default PlaceHolder;