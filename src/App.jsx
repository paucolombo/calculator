import Calculator from './components/Calculator';
import './App.css'
import { useTimer } from './hooks/useTimer';
import Timer from './components/Timer';

function App() {
  const { time } = useTimer();

  return (
    <main>
      <Timer time={time} />
      <Calculator />
    </main>
  )
}

export default App
