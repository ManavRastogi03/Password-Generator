import { useState,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length,setLength]=useState(8);
  const [numAllowed,setNumAllowed]=useState(false);
  const [characterAllowed,setCharacterAllowed]=useState(false);
  const [password,setPassword]=useState("")

  const PasswordRef=useRef(null);
  const PasswordGenrator = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed)  str+="1234567890"
    if(characterAllowed) str+="@#$%^&*()"
    for (let i =1; i <= length; i++) {
      // const element = array[i];
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)

    }
    setPassword(pass)
  },[length,numAllowed,characterAllowed,setPassword]);
  const copyPasswordtoclip= useCallback(()=>{
    PasswordRef.current?.select()
    PasswordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  },[password]);
  useEffect(()=>{
    PasswordGenrator()
  },[length,numAllowed,characterAllowed,PasswordGenrator])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 font-bold bg-gray-500 mb-4 pb-2'>
    <h1 className='text-2xl text-center text-white my-3 font-style: italic'>Password Genrator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
    <input type='text'
      value={password}
      className='outline-none w-full py-1px-3'
      placeholder='Password'
      ref={PasswordRef}
    />
    <button class="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
    <div onClick={copyPasswordtoclip}  class="absolute inset-0 w-3 bg-blue-500 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
    <span class="relative text-black group-hover:text-white">Copy</span>
  </button>
    </div>
    <div className='flex text-sm gap-x-2'>
     <div className='flex item-center gap-x-1 '>
      <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
      <label >length:{length}</label>
     </div>
     <div className='flex items-center gap-x-1'>
     <input type='checkbox' defaultChecked={numAllowed} id="numberInput" onChange={()=>{setNumAllowed((prev)=>!prev)}}/>
    <label forHTML='NumberInput'>Numbers</label>
     </div>
     <div className='flex items-center gap-x-1'>
     <input type='checkbox' defaultChecked={characterAllowed} id="numberInput" onChange={()=>{setCharacterAllowed((prev)=>!prev)}}/>
    <label forHTML='CharacterInput'>Charceter</label>
     </div>
     </div>
    </div>
    </>
  )
}

export default App
