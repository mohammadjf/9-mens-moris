import React, { Fragment, useState, useEffect } from 'react';
import '../style/App.css';
import PlaceHolder from './PlaceHolder';
import {positions, socketSendUrl} from '../config/constants';
import axios from "axios";

function App(props) {
  // a state to store socket signal data.
  const [piece, setPiece] = useState({side:'none', position: 0, box: false});

  props.channel.bind('my-event', function(data) {
    if(data && data.payload) {
      let sdata = JSON.parse(data.payload);

      if(sdata.player != props.userId) {
        console.log(sdata, 'signal');
        setPiece({side:'enemy', position:sdata.position, box: sdata.box});
      }
    }
  });

  /**
   * set related css class to each node and propagate it via socket.
   */
  const setPlace = (node) => {

    if(node.side !== 'none') return;

    let formData = new FormData();
    formData.set('payload', JSON.stringify({position: node.position, box: node.box, player: props.userId}));
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
          setPiece({...node, side: 'myself'});
        })
        .catch(err => {
          console.log(err);
        });
  };

  const renderPositions = (box) => {
    return positions.map((item, key) => <PlaceHolder 
                                            key={key}
                                            box={box}
                                            position={item}
                                            setPlace={setPlace}
                                            piece={(piece.box == box && piece.position==item) ? piece.side : 'none'}
                                            // player={props.userId}
                                        />
  )};

  return (
    <Fragment>
      <div id="playground">
        <div className="outer square">
          { renderPositions('outer') }
          <div className="middle square">
            { renderPositions('middle') }
            <div className="inner square">
              { renderPositions('inner') }
            </div>
          </div>
          <div className="connector up"></div>
          <div className="connector down"></div>
          <div className="connector right"></div>
          <div className="connector left"></div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
