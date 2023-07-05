import { useState } from 'react'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

const Input = ({ ...props }) => {
  const [localType, setLocalType] = useState(props.type || 'text')
  return (
    <div className={`${props.wrapperclasses || ''} w-full relative`}>
      <input {...props} className={twMerge(`w-full h-14 sm:h-16 bg-transparent border-[1px] focus:border-primary outline-none rounded-md text-gray-100 p-4 text-base font-normal hover:text-white transition duration-300 ${props.className}`, props.className)} type={localType} />
      {props.type === 'password' && (
        <div className={`w-fit h-full absolute right-3 top-0 flex justify-center items-center ${props.className.includes('hidden') || props.className.includes('opacity-0') ? 'hidden opacity-0' : ''}`}>
          {localType === 'password' ? <BsFillEyeFill className="w-[1.8rem] h-[1.8rem] text-gray-100 cursor-pointer" onClick={() => setLocalType('text')} /> : <BsFillEyeSlashFill className="w-[1.8rem] h-[1.8rem] text-gray-100 cursor-pointer" onClick={() => setLocalType('password')} />}
        </div>
      )}
    </div>
  )
}

export default Input
