import '../style/App.css';

function App() {
  return (
    <div id="playground">
      <div class="outer square">
        <div class="place-holder top-left"></div>
        <div class="place-holder top-middle"></div>
        <div class="place-holder top-right"></div>
        <div class="place-holder middle-left"></div>
        <div class="place-holder middle-right"></div>
        <div class="place-holder bottom-left"></div>
        <div class="place-holder bottom-middle"></div>
        <div class="place-holder bottom-right"></div>
        <div class="middle square">
          <div class="place-holder top-left"></div>
          <div class="place-holder top-middle"></div>
          <div class="place-holder top-right"></div>
          <div class="place-holder middle-left"></div>
          <div class="place-holder middle-right"></div>
          <div class="place-holder bottom-left"></div>
          <div class="place-holder bottom-middle">
            <div class="piece"></div>
          </div>
          <div class="place-holder bottom-right">
            <div class="piece"></div>
          </div>
          <div class="inner square">
            <div class="place-holder top-left">
              <div class="piece"></div>
            </div>
            <div class="place-holder top-middle">
              <div class="piece enemy"></div>
            </div>
            <div class="place-holder top-right">
              <div class="piece"></div>
            </div>
            <div class="place-holder middle-left">
              <div class="piece enemy"></div>
            </div>
            <div class="place-holder middle-right">
              <div class="piece"></div>
            </div>
            <div class="place-holder bottom-left">
              <div class="piece enemy"></div>
            </div>
            <div class="place-holder bottom-middle">
              <div class="piece"></div>
            </div>
            <div class="place-holder bottom-right">
              <div class="piece"></div>
            </div>
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
