import React, { forwardRef } from "react";

const ResultModal = forwardRef(function ResultModal(
  { result, targetTime },
  ref
) {
  return (
    <dialog ref={ref} className="result-modal">
      <h2>You {result} </h2>
      <p>
        Target Time was <strong>{targetTime}</strong> seconds
      </p>
      <p>
        You stopped timer with <strong> X seconds left </strong>
      </p>
      <form  method="dialog">
        {/* For closing the dialog */}
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
