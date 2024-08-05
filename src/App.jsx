import { useState, useCallback,useEffect,useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numAllow, setNumAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState("")
  const passRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllow) str += "0123456789"
    if (charAllow) str += "!@#$%*_-"

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char)
    }
    setPassword(pass)



  }, [length, numAllow, charAllow, setPassword])

  const copytext = useCallback (()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
   }, [password])

  useEffect(()=>
    passwordGenerator()
  , [numAllow, charAllow, length, passwordGenerator,])

 

   




  return (
    
    <div className="mt-20 max-w-md mx-auto shadow-md  rounded-lg px-4 py-3 bg-gray-300 bg-opacity-10 backdrop-blur-lg border border-gray-400 border-opacity-8 p-6 text-purple-800 font-bold ">
      <h1 className='text-purple-600 text-center my-3'>Password Generator</h1>
      <div className='flex shadow-md rounded-lg overflow-hidden mb-4'>
        <input type="text" 
        value={password}
        placeholder='password'
        readOnly
        className='outline-none w-full py-1 px-3' 
        ref={passRef}/>
        <button className='bg-blue-800 w-16 text-white px-3 py-4 shrink-0'
        onClick={copytext}
        >copy</button>
      </div>
      <div className='flex text-5m gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={6}
          max={100}
          value={length} 
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label >Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
           id="numberinput"
           defaultChecked ={setNumAllow}
           onChange={()=>{setNumAllow((prev)=> !prev)}}
            />Number
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultValue={charAllow}
          id="charinput"
          onChange={()=>{setCharAllow((prev)=> !prev)}}/>
          Characters
        </div>
      
      </div>
      </div>
      
    
  )
}

export default App
