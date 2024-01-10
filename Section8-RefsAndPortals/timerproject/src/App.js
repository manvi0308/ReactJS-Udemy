import Player from './components/Player.js';
import TimerChallenge from './components/TimerChallenge.js';

function App() {
  return (
    <>
      <Player/>
      <div id="challenges">
        <TimerChallenge title="Easy" targetTime={1}/>
        <TimerChallenge title="Not Easy" targetTime={5}/>
        <TimerChallenge title="Getting Tough" targetTime={10}/>
        <TimerChallenge title="Pros Only" targetTime={20}/>

      </div>
    </>
  );
}

export default App;
