import './timer.css'
function Timer({ time }) {
  return (
    <div className="timer">
      <img src="clock.png" alt="clock"></img> <h2>{time}</h2>
    </div>
  );
}



export default Timer;