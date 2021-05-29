import React, { Fragment, useState, useEffect } from 'react';
import '../style/App.css';
import PlaceHolder from './PlaceHolder';
import { positions } from '../config/constants';

function App(props) {
  // a state to store socket signal data.
  const [signal, setSignal] = useState(0);

  props.channel.bind('my-event', function(data) {
    if(data && data.payload) {
      let sdata = JSON.parse(data.payload);

      if(sdata.player != props.userId) {
        setSignal(sdata);
      }
    }
  });

  const renderPositions = (box) => {
    return positions.map((item, key) => <PlaceHolder 
                                            key={key}
                                            box={box}
                                            position={item}
                                            socketSignal={signal}
                                            player={props.userId}
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
