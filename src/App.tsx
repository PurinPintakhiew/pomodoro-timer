import { useEffect, useRef, useState } from 'react'
import NotificationSound from './assets/sounds/notification-alert.mp3';

function App() {
  const DEFAULT_SECOND = 1000;
  const DEFAULT_MINUTE = DEFAULT_SECOND * 60;
  const POMODORO_TIME = 25 * DEFAULT_MINUTE;
  const BREAK_TIME = 5 * DEFAULT_MINUTE;

  const [isBreak, setIsBreak] = useState(false);
  const [round, setRound] = useState(0);

  const [start, setStart] = useState(false);
  const [time, setTime] = useState(POMODORO_TIME);

  const audioPlayer: any = useRef(null);

  const playSound = () => {
    audioPlayer.current.play();
  };

  const handleStart = () => {
    if (round > 4) {
      setRound(0);
    }
    setStart(!start);
  }

  const handleWork = () => {
    setIsBreak(false);
    setTime(POMODORO_TIME);
  }

  const handleBreak = () => {
    setIsBreak(true);
    setTime(BREAK_TIME);
  }

  const timeFormat = (value: number) => {
    const minute = Math.floor(value / DEFAULT_MINUTE);
    const second = Math.floor((value % DEFAULT_MINUTE) / DEFAULT_SECOND);
    return `${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
  };


  useEffect(() => {
    if (round >= 4) {
      setStart(false);
      setIsBreak(false);
      setTime(POMODORO_TIME);
      setRound(0);
      return;
    }

    if (start) {
      if (time > 0) {
        const timer = setTimeout(() => setTime(prev => prev - 1000), 1000);
        return () => clearTimeout(timer);
      } else if (time <= 0 && !isBreak) {
        setIsBreak(true);
        setTime(BREAK_TIME);
        playSound();
      } else if (time <= 0 && isBreak) {
        setIsBreak(false);
        setTime(POMODORO_TIME);
        setRound(prev => prev + 1);
      }
    }
  }, [start, time, isBreak, round]);

  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center transition-all duration-500"
      style={{ background: isBreak ? "#2B7FFF" : "#F56247" }}
    >
      <h1 className="text-5xl font-bold text-white mb-4">Pomodoro Timer</h1>
      <div className="flex flex-col items-center gap-4 rounded-xl p-8 bg-white/20 backdrop-blur-md">
        <div className="flex justify-center gap-4 mb-4">
          <button
            className="rounded-2xl py-2 px-4 text-2xl font-bold cursor-pointer transition-all"
            style={{
              background: isBreak ? "#FFEDD4" : "#F56247",
              color: isBreak ? "#000" : "#fff",
            }}
            onClick={handleWork}
          >
            Work
          </button>
          <button
            className="rounded-2xl py-2 px-4 text-2xl font-bold cursor-pointer transition-all"
            style={{
              background: isBreak ? "#2B7FFF" : "#FFEDD4",
              color: isBreak ? "#fff" : "#000",
            }}
            onClick={handleBreak}
          >
            Break
          </button>
        </div>
        <h2 className="text-9xl font-bold text-white mb-2">{timeFormat(time)}</h2>
        <p className="text-xl font-semibold text-white">Round {round + 1}</p>
        <button
          className="rounded-2xl py-2 px-6 text-4xl font-bold text-[#F56247] bg-[#FFEDD4] hover:bg-[#F56247] hover:text-white transition-all cursor-pointer mt-6"
          onClick={handleStart}
        >
          {start ? "Stop" : "Start"}
        </button>
      </div>
      <audio ref={audioPlayer} src={NotificationSound} preload="auto" />
    </div>
  );
}

export default App
