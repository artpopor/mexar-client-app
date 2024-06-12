
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function App() {
  const navigate = useNavigate()
  useEffect(()=>{
    // check authen draft version

    const token = localStorage.getItem('access_token')
    !token && navigate('/login') || navigate('/home')
  },[])
  return (
    <div className="flex flex-col  justify-center gap-9 content-around h-full items-center drop-shadow-md">
    <div className="bg-[#9FC3F5] text-2xl text-white p-5 text-center  w-[90vw] md:w-[30vw] xl:w-[20vw] rounded-2xl flex flex-col gap-5 ">
     Checking Authentication...
    </div>
  </div>
  )
}

export default App
