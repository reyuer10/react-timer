import React, { useState } from "react";
import SavedLaps from "./SavedLaps";

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [miliseconds, setMiliSeconds] = useState(0);

  const [lapData, setLapData] = useState([]);
  const [saveLap, setSaveLap] = useState([]);
  const [folderLap, setFolderLap] = useState([]);

  const [intervalId, setIntervalId] = useState(null);
  const [isButtonStart, setIsButtonStart] = useState(false);
  const [isButtonSaveClick, setIsButtonSaveClick] = useState(false);

  const [titleValue, setTitleValue] = useState("");

  const [isButtonFolderClick, setIsButtonFolderClick] = useState(false);
  const [isNewTimerButtonClick, setIsNewTimerButtonClick] = useState(false);

  const [renameButton, setRenameButton] = useState(false);
  const [saveLapsValue, setSaveLapsValue] = useState("");
  const [saveLapsFindId, setSaveLapsFindId] = useState(null);

  const handleOpenRenameButton = (lapsId, titlePrevValue) => {
    setTitleValue(titlePrevValue);
    setSaveLapsFindId(lapsId);
    setSaveLapsValue(lapsId);
    setRenameButton(true);
  };

  const handleCloseRenameButton = () => {
    setSaveLapsFindId(null);
  };

  const handleOpenFolder = () => {
    setIsButtonFolderClick(true);
  };

  const handleCloseFolder = () => {
    setIsButtonFolderClick(false);
  };

  const handleStartTimer = () => {
    const intervalId = setInterval(() => {
      setMiliSeconds((prevSeconds) => prevSeconds + 1);
    }, 10);
    setIsButtonStart(!isButtonStart);
    setIntervalId(intervalId);
    setIsNewTimerButtonClick(false);
    setIsButtonFolderClick(false);

    return () => clearInterval(intervalId);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);

    if (isButtonStart === false) {
      setIsButtonStart(false);
    } else {
      setIsButtonStart(!isButtonStart);
    }
  };

  let hourFormat = hours < 10 ? "0" + hours : hours;
  let minutesFormat = minutes < 10 ? "0" + minutes : minutes;
  let secondsFormat = seconds < 10 ? "0" + seconds : seconds;
  let miliSecondsFormat = miliseconds < 10 ? "0" + miliseconds : miliseconds;

  if (miliseconds > 99) {
    miliSecondsFormat = setMiliSeconds(0);
    secondsFormat = setSeconds((prev) => prev + 1);
  } else if (seconds > 59) {
    secondsFormat = setSeconds(0);
    minutesFormat = setMinutes((prev) => prev + 1);
  } else if (minutes > 59) {
    hourFormat = setHours((prev) => prev + 1);
    minutesFormat = setMinutes(0);
  }

  const handleLapTimer = () => {
    let lap = `${minutesFormat}:${secondsFormat}:${miliSecondsFormat}`;
    const updateLapData = setLapData([...lapData, lap]);
    return updateLapData;
  };

  const handleSaveLapData = () => {
    // const saveLapObj = [...lapData];
    const updateSaveLapData = setSaveLap([
      ...saveLap,
      {
        saveLapId:
          saveLap.length === 0 ? 1 : saveLap[saveLap.length - 1].saveLapId + 1,
        title: `Title`,
        lapData,
      },
    ]);
    const saveLapObjIntoArr = [...saveLap];
    setFolderLap([...folderLap, saveLapObjIntoArr]);
    setIsButtonSaveClick(true);
    console.log(saveLap);
    return updateSaveLapData;
  };

  const handleNewTimer = () => {
    setLapData([]);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setMiliSeconds(0);
    stopTimer();
    setIsButtonSaveClick(false);
    setIsNewTimerButtonClick(true);
  };

  return (
    <div className="poppins-regular min-h-screen justify-center text-center flex items-center">
      <div className="  bg-[#c9c9c9] p-10 rounded-lg flex space-x-10">
        <div>
          <div className="flex text-center items-center justify-center text-[48px] font-bold">
            {/* <p>: {hourFormat}</p> */}
            <p>{minutesFormat}</p>
            <p>:{secondsFormat}</p>
            <p>:{miliSecondsFormat}</p>
          </div>
          <div className=" flex flex-col gap-2">
            <div className="space-x-3">
              <button
                className={`${
                  isButtonStart ? " opacity-[50%]" : ""
                } rounded-lg bg-black text-white px-6 py-2`}
                onClick={handleStartTimer}
                disabled={isButtonStart}
              >
                Start
              </button>
              <button
                className={`rounded-lg bg-black text-white px-6 py-2`}
                onClick={stopTimer}
              >
                Stop
              </button>
            </div>
            <div className="space-x-3">
              <button
                className="rounded-lg bg-black text-white px-5 py-2"
                onClick={() => {
                  setHours(0);
                  setMinutes(0);
                  setSeconds(0);
                  setMiliSeconds(0);
                  stopTimer();
                  handleNewTimer();
                }}
              >
                Reset
              </button>
              <button
                className={`rounded-lg bg-black text-white px-7 py-2`}
                onClick={handleLapTimer}
                disabled={!isButtonStart}
              >
                Lap
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-black text-white p-4 rounded-xl text-[24px] font-semibold h-[180px] w-[200px] text-left overflow-y-auto">
            {lapData.map((lap, index) => {
              return (
                <p key={index}>
                  {index === 0 ? 1 + ". " : index + 1 + ". "}
                  {lap}
                </p>
              );
            })}
          </div>
        </div>
        {/* {lapData.length === 0 ? (
          <></>
        ) : (
          <>
            {isButtonSaveClick ? (
              <>
                <span
                  style={{
                    color: "gray",
                    fontStyle: "italic",
                    fontSize: "12px",
                  }}
                >
                  Laps saved!
                </span>
              </>
            ) : (
              <>
                <button onClick={handleSaveLapData}>Save laps</button>
              </>
            )}

            <button
              onClick={handleNewTimer}
              style={{
                marginLeft: "10px",
              }}
            >
              New timer
            </button>
          </>
        )} */}
        <>
          {/* {isNewTimerButtonClick ? (
            <>
              {isButtonFolderClick ? (
                <div
                  style={{
                    margin: "10px",
                  }}
                >
                  <button onClick={handleCloseFolder}>Back</button>
                  <h4>Saved Laps:</h4>
                  {saveLap.map((laps) => (
                    <SavedLaps
                      setSaveLap={setSaveLap}
                      laps={laps}
                      key={laps.saveLapId}
                      saveLap={saveLap}
                      saveLapsFindId={saveLapsFindId}
                      handleOpenRenameButton={handleOpenRenameButton}
                      renameButton={renameButton}
                      titleValue={titleValue}
                      setTitleValue={setTitleValue}
                      handleCloseRenameButton={handleCloseRenameButton}
                    />
                  ))}
                </div>
              ) : (
                <>
                  <button
                    style={{
                      margin: "10px",
                    }}
                    onClick={handleOpenFolder}
                  >
                    Open Saved Lap
                  </button>
                </>
              )}
            </>
          ) : null} */}
        </>
      </div>
    </div>
  );
}
