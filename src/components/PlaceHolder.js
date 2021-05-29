import React from 'react';

function PlaceHolder(props) {

    const renderPiece = () => {
        if(props.piece === 'myself') {
            return <div className="piece"></div>;
        } else if(props.piece === 'enemy') {
            return <div className="piece enemy"></div>;
        }
        return;
    };

    return (
        <div 
            className={"place-holder " + props.position}
            onClick={ () => {
                props.setPlace({position: props.position, box: props.box, side: props.piece});
            }}
        >
            { renderPiece() }
        </div>
    );
}

export default PlaceHolder;