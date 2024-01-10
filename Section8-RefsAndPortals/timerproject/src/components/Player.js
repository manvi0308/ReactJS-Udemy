import { useState, useRef } from "react";
export default function Player() {

  //ToDo Clear the input field once I click set Name button
  const playerName = useRef(); // Its a JS Object
  const [userName, setuserName] = useState();

  function handleSubmit() {
    setuserName(playerName.current.value); //^ Imperative Mode
    playerName.current.value='';   //^ Manipulating DOM - Declarative Mode
  }
  return (
    <section id="player">
      <h2>Welcome {userName ?? "Unknown entity"} </h2>
      <p>
        {/*  ref={playerName} --> Connection of ref with this input field */}
        <input
          ref={playerName}
          type="text"
        />
        <button onClick={handleSubmit}>Set Name</button>
      </p>
    </section>
  );
}
