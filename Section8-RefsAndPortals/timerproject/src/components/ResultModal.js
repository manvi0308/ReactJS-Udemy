import React, { forwardRef, useImperativeHandle, useRef } from "react"; //^ will only expose methods and functions that can be used in any environment
import { createPortal } from "react-dom"; //^ includes a couple of features and functions for DOM
//& createPortal lets you render some children into a different part of the DOM.

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  /*<dialog> can be closed using esc key, however currently onReset function will not be triggered, to do so
add onClose prop to dialog element and bind it to onReset prop value */
  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>You Lost </h2>}
      {!userLost && <h2>Your Score {score}</h2>}
      <p>
        Target Time was <strong>{targetTime}</strong> seconds
      </p>
      <p>
        You stopped timer with
        <strong> {formattedRemainingTime} seconds left </strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        {/* For closing the dialog */}
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
