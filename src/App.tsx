import { useEffect, useState } from 'react'

function App() {
  const defaultSecond: number = 1000;
  const defaultMinute: number = defaultSecond * 60;
  const pomodoroTime: number = 1 * defaultMinute;
  const breakTime: number = 1 * defaultMinute;
  const [isBreak, setIsBreak] = useState(false);


  const [start, setStart] = useState(false);
  const [time, setTime] = useState(pomodoroTime);

  const timeFormat = (value: number) => {
    const minute = Math.floor(value / defaultMinute);
    const second = Math.floor((value % defaultMinute) / defaultSecond);
    return `${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
  }

  useEffect(() => {
    if (start) {
      if (time > 0) {
        const timer: number = setTimeout(() => setTime(time - 1000), 1000);
        return () => clearTimeout(timer);
      } else if (time <= 0 && !isBreak) {
        setIsBreak(true);
        setTime(breakTime);
      } else if (time <= 0 && isBreak) {
        setIsBreak(false);
        setTime(pomodoroTime);
      }
    }
  }, [start, time, isBreak]);

  return (
    <>
      <div className="bg-[#F56247] h-screen w-screen flex flex-col justify-center items-center">
        <h1 className='text-5xl font-bold text-white'>Pomodoro Timer</h1>
        <div className="rounded-md mt-4 p-8 bg-[#FA8E7A]">
          <div className='flex justify-center gap-2'>
            <div className='rounded-2xl py-2 px-4 text-2xl font-bold text-white'
              style={{ background: isBreak ? "#FFEDD4" : "#F56247" }}
            >
              Work
            </div>
            <div className='rounded-2xl py-2 px-4 text-2xl font-bold text-white'
              style={{ background: isBreak ? "#F56247" : "#FFEDD4" }}
            >
              Break
            </div>
          </div>
          <h1 className='text-9xl font-bold text-white mb-10'>{timeFormat(time)}</h1>
          <div className="flex justify-center gap-2 mt-5">
            {
              start ?
                <button
                  className='rounded-2xl py-2 px-4 text-[#F56247] bg-[#FFEDD4] font-bold hover:bg-[#F56247] hover:text-white text-4xl'
                  onClick={() => { setStart(false); }}
                >
                  Stop
                </button>
                :
                <button
                  className='rounded-2xl py-2 px-4 text-[#F56247] bg-[#FFEDD4] font-bold hover:bg-[#F56247] hover:text-white text-4xl'
                  onClick={() => { setStart(true); }}
                >
                  Start
                </button>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
