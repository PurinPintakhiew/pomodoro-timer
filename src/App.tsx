import { useEffect, useState } from 'react'

function App() {
  const defaultSecond: number = 1000;
  const defaultMinute: number = defaultSecond * 60;
  const defaultTime: number = 25 * defaultMinute;


  const [start, setStart] = useState(false);
  const [time, setTime] = useState(defaultTime);

  const timeFormat = (value: number) => {
    const minute = Math.floor(value / defaultMinute);
    const second = Math.floor((value % defaultMinute) / defaultSecond);
    return `${minute || "00"}:${second || "00"}`;
  }

  useEffect(() => {
    if (time > 0 && start) {
      const timer: number = setTimeout(() => setTime(time - 1000), 1000);
      return () => clearTimeout(timer);
    } else {

    }
  }, [start, time]);

  return (
    <>
      <div className="bg-[#F56247] h-screen w-screen flex flex-col justify-center items-center">
        <h1 className='text-5xl font-bold text-white'>Pomodoro Timer</h1>
        <div className="rounded-md mt-4 p-8 bg-[#FA8E7A]">
          <h1 className='text-5xl font-bold text-white'>{timeFormat(time)}</h1>
          <div className="flex justify-center gap-2 mt-5">
            {
              start ?
                <button
                  className='rounded-2xl py-2 px-4 text-[#F56247] bg-[#FFEDD4] font-bold'
                  onClick={() => { setStart(false); }}
                >
                  Stop
                </button>
                :
                <button
                  className='rounded-2xl py-2 px-4 text-[#F56247] bg-[#FFEDD4] font-bold'
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
