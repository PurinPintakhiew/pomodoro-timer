import { useState } from 'react'

function App() {
  const defaultTime: number = 24 * 1000 * 60;

  const [start, setStart] = useState(false);
  const [time, setTime] = useState(defaultTime);

  const timeFormat = (time: number) => {
    const minute = time || "00";
    const second = time || "00";
    return `${minute}:${second}`;
  }

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
                >
                  Stop
                </button>
                :
                <button
                  className='rounded-2xl py-2 px-4 text-[#F56247] bg-[#FFEDD4] font-bold'
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
