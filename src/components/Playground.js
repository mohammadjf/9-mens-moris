import '../style/App.css';
import PlaceHolder from './PlaceHolder';

function App() {

  const positions = [
    'top-left',
    'top-middle',
    'top-right',
    'middle-left',
    'middle-right',
    'bottom-left',
    'bottom-middle',
    'bottom-right'
  ];

  const renderPositions = () => {
    return positions.map(item => <PlaceHolder position={item}/>)
  }

  return (
    <div id="playground">
      <div class="outer square">
        { renderPositions() }
        <div class="middle square">
          { renderPositions() }
          <div class="inner square">
            { renderPositions() }
          </div>
        </div>
        <div class="connector up"></div>
        <div class="connector down"></div>
        <div class="connector right"></div>
        <div class="connector left"></div>
      </div>
    </div>
  );
}

export default App;
