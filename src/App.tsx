
import { useEffect } from 'react'
function App() {
  useEffect(()=>{
    window.open('/login',"_self")
  },[])
  return (
    <>
      <div className='bg-white'>hello</div>
    </>
  )
}

export default App
