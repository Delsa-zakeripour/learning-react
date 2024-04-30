import React, { useState } from "react";
import "./App.css";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income ",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [test, setTest] = useState({ name: " study" });
  const [isOpen, setIsOpen] = useState(true);

  function handleNextButton() {
    if (step < 3) {
      setStep((s) => s + 1);
      // setStep(step + 1);
      // test.name = "JOB";    FALSE 
      setTest({ name: "job" });
    }
  }
  function handlePreviosButton() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handlePreAlert() {
    if (step < messages.length - 1) {
      alert(`"you must start learning"`);
    }
  } 

  // function handleCloseBtn() {
  //   setIsOpen(false);
  // }

  return (
    <>
      <button
        className="close"
        // onClick={handleCloseBtn}
        onClick={() => setIsOpen(!isOpen)}
      >
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`${step >= 1 ? "active" : ""}`}>1</div>
            {/* when use useState don't need to use `${}` */}
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            step={step} : {messages[step - 1]}
            {test.name}
          </p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePreviosButton}
              onMouseDown={handlePreAlert}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNextButton}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
