import React, {useRef, useState, useEffect} from 'react'
import { sumbitComment } from '../services'

const CommmentsForm = ({slug}) => {

  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const commentEl = useRef()
  const nameEl = useRef()
  const emailEl = useRef()
  const storeDataEl = useRef()

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name')
    emailEl.current.value = window.localStorage.getItem('email')

  }, [])
    
  const handleCommentSubmission = () => {
    setError(false)

    const { value: comment } = commentEl.current
    const { value: name } = nameEl.current
    const { value: email } = emailEl.current
    const { checked:  storeData } = storeDataEl.current

    if(!name || !comment || !email) {
      setError(true)
      return
    }

    const commentObj = { name, email, comment, slug }

    sumbitComment(commentObj)
      .then((res) => {
        setShowSuccessMessage(true)
        setTimeout(() =>{
          setShowSuccessMessage(false)
        }, 3000)
      }) 

    if(storeData){
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    }else {
      window.localStorage.removeItem('name', name)
      window.localStorage.removeItem('email', email)
    }
  }

  return (
    <div className='bg-white rounded-lg shadow-lg p-8 pb-12 mb-8'>
        <h3 className='text-xl mb-8 pb-4 border-b font-semibold'>CommmentsForm</h3>
        <div className='grid grid-cols-1 gap-4 mb-4'>
          <textarea 
            ref={commentEl} 
            className='p-4 outline-none w-full rounded-lg focus:ring-2 text-gray-700 focus:ring-gray-200 bg-gray-100'
            placeholder='Comment'
            name='comment'/>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
          <input 
            type='text' ref={nameEl}
            className='py-2 p-4 outline-none w-full rounded-lg focus:ring-2 text-gray-700 focus:ring-gray-200 bg-gray-100'
            placeholder='Name'
            name='name'
          />
          <input 
              type='email' ref={emailEl}
              className='py-2 p-4 outline-none w-full rounded-lg focus:ring-2 text-gray-700 focus:ring-gray-200 bg-gray-100'
              placeholder='Email'
              name='email'
            />
        </div>
        <div className='grid grid-cols-1 gap-4 mb-4'>
          <div >
            <input type="checkbox" id="storeData" name="storeData" value="true" ref={storeDataEl}/>
            <label className="text-gray-500 cursor-pointer ml-3" htmlFor="storeData"> Save my name, email for the next time I comment.</label>
            {showSuccessMessage && <span className=' align-middle float-right text-green-600'>Comment Posted</span>}
          </div>
        </div>
        {error && <p className='text-xs text-red-500'>All fields are required</p>}
        <div className='mt-8 w-full flex justify-center'>
          <button  
            onClick={handleCommentSubmission} 
            type='button'
            className='transition duration:500 ease hover:bg-indigo-800 bg-blue-600 text-white py-3 rounded-full px-8'
          >
            Post Comment
          </button>
        </div>
        <div className='w-full flex'>
          
        </div>
    </div>
  )
}

export default CommmentsForm