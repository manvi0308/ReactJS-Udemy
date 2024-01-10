import { useState } from 'react';
export default function Player() {
  function handleChange(event) {
    // will handle the input field change
    setuserName(event.target.value);
    console.log(userName);
  }

  function handleSubmit(){
    console.log('Handle submit');
    setsubmitted(true);
    
  }
  const [userName, setuserName] = useState('')
  const [submitted, setsubmitted] = useState(false);
    return (
      <section id="player">
        <h2>Welcome { submitted ? userName : 'Unknown entity'} </h2>
        <p>
          <input type="text" onChange={handleChange} value={userName}/>
          <button onClick={handleSubmit}>Set Name</button>
        </p>
      </section>
    );
  }
  