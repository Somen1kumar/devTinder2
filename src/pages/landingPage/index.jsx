import React from 'react'
import Modal from '@/modal';
import SignUp from '@/components/Signup/index'

import '@/App.css';
import { useState } from 'react';

function Parent() {
  const [onSignUp, setOnSignUp] = useState(false);

  const onSignUpClickHandler = (e) => {
    e.preventDefault();
    setOnSignUp(prev => !prev);
  }

  return (
    <React.Fragment>
      <div className='hd-image'></div>
      <Modal 
        isOpen={onSignUp} 
        onClose={() => setOnSignUp(false)} 
      >
        <SignUp setOnSignUp={setOnSignUp} />
      </Modal>
      <div className='mt-[20%]'>
        <h1 className='font-bold text-center w-fit m-auto text-white text-8xl'>Start Something Epic</h1>
        <div className='text-center pt-4'>
          <button className="bg-[#ff2358] px-6 py-3 rounded-full text-white font-semibold text-base" onClick={onSignUpClickHandler}>Create Account</button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Parent;
