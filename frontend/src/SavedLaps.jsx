import React from "react";

export default function SavedLaps({
  setSaveLap,
  saveLap,
  laps,
  saveLapsFindId,
  handleOpenRenameButton,
  titleValue,
  setTitleValue,
  handleCloseRenameButton,
}) {
  // console.log(laps);

  const handleSaveRenameTitle = (lapId) => {
    const findingLapId = saveLap.map((lap) =>
      lap.saveLapId === lapId
        ? {
            ...lap,
            title: titleValue,
          }
        : lap
    );
    handleCloseRenameButton();
    setSaveLap(findingLapId);
  };

  const handleRemoveLaps = (lapId) => {
    const findingLapId = saveLap.filter((lap) => lap.saveLapId !== lapId);
    console.log(findingLapId);
    setSaveLap(findingLapId);
  };
  return (
    <div className="min-h-screen">
      <h3>
        {saveLapsFindId === laps.saveLapId ? (
          <div>
            <input
              style={{
                border: "none",
                fontSize: "18px",
                fontWeight: "800",
              }}
              type="text"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
            />
            <button onClick={() => handleSaveRenameTitle(laps.saveLapId)}>
              Save changes
            </button>
            <button onClick={handleCloseRenameButton}>Cancel</button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: 0,
            }}
          >
            <p
              style={{
                margin: "0 15px 0 0",
                fontWeight: "700",
              }}
            >
              {laps.title}
            </p>
            <button
              onClick={() => handleOpenRenameButton(laps.saveLapId, laps.title)}
            >
              Edit Title
            </button>
            <button onClick={() => handleRemoveLaps(laps.saveLapId)}>
              remove
            </button>
          </div>
        )}
      </h3>
      {laps.lapData.map((lap, lapIndex) => (
        <p key={lapIndex}>
          {lapIndex + 1}
          {"."} {lap}
        </p>
      ))}
    </div>
  );
}
