import React, { useEffect, useState } from 'react';
import { socketSendUrl } from '../config/constants';
import axios from "axios";

function PlaceHolder(props) {
    
    const [piece, setPiece] = useState('none');

    useEffect(() => {
        signalMatch();
    }, [props.socketSignal]);
    /**
     * set related css class to each node and propagate it via socket.
     */
    const setPlace = () => {
        
        if(piece !== 'none') return;

        let formData = new FormData();
        formData.set('payload', JSON.stringify({position: props.position, box: props.box, player: props.player}));
        // send event to socket
        axios.post(socketSendUrl,
                formData,
                {
                    headers: {
                        "Accept": '*/*',
                        "Content-Type": 'multipart/form-data'
                    }
                }
            )
            .then(res => {
                setPiece('myself');
            })
            .catch(err => {
                console.log(err);
            });
    }
    // check if recieved socket signal should change the node or not.
    const signalMatch = () => {
        const signal = props.socketSignal;
        
        console.log(props, 'props');
        console.log(signal, 'signal');

        if(signal) {
            if(props.box === signal.box && props.position === signal.position) {
                setPiece('enemy');
            }
        }

        return false;
    };

    const renderPiece = () => {
        if(piece === 'myself') {
            return <div className="piece"></div>;
        } else if(piece === 'enemy') {
            return <div className="piece enemy"></div>;
        }
        return;
    };

    return (
        <div 
            className={"place-holder " + props.position}
            onClick={ setPlace }
        >
            { renderPiece() }
        </div>
    );
}

export default PlaceHolder;