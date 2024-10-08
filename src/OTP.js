import { useState } from "react";

export const OTP = () => {
  const [timer, setTimer] = useState(5);

  const handleButtonClick = () => {
    const intervalID = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          clearInterval(intervalID);
          setTimer(5);
        }
        else{
            return prev - 1;
        }
      });
    }, 1000);
  };

  return (
    <button disabled={timer !== 5 ? true : false} onClick={handleButtonClick}>
      {timer === 5 ? "send OTP" : timer}
    </button>
  );
};
