import { useState, useRef } from "react";
export default function Player() {
  //ToDo Understanding diff b/w useState and useRef
  const playerName = useRef(""); // Its a JS Object
  const [userName, setuserName] = useState(); //^ Getting rid of state entirely

  function handleSubmit() {
    setuserName(playerName.current.value);
    playerName.current.value = "";
  }
  return (
    <section id="player">
      <h2>
        Welcome {userName ? userName : " Unknown entity"}
      </h2>
      <p>
        {/*  ref={playerName} --> Connection of ref with this input field */}
        <input ref={playerName} type="text" />
        <button onClick={handleSubmit}>Set Name</button>
      </p>
    </section>
  );
}
