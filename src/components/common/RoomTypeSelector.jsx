import React, { useState, useEffect } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setroomTypes] = useState([""]);
  const [showNewRoomTypesInput, setshowNewRoomTypesInput] = useState(false);
  const [newRoomType, setnewRoomType] = useState("");

  useEffect(() => {
    getRoomTypes().then((data) => {
      console.log("Data fetched:", data);
      setroomTypes(data);
    });
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setnewRoomType(e.target.value);
  };

  const handleAddNewRoomType = () => {
    if (newRoomType !== "") {
      setroomTypes([...roomTypes, newRoomType]);
      setnewRoomType("");
      setshowNewRoomTypesInput(false);
    }
  };

  return (
    <>
      {roomTypes.length > 0 && (
        <div>
          <select
            id="roomType"
            name="roomType"
            value={newRoom.roomType}
            onChange={(e) => {
              if (e.target.value === "Add new") {
                setshowNewRoomTypesInput(true);
              } else {
                handleRoomInputChange(e);
              }
            }}
          >
            <option value={""}>Select a room type</option>
            <option value={"Add new"}>Add new</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          {showNewRoomTypesInput && (
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Enter a new room type"
                onChange={handleNewRoomTypeInputChange}
              />
              <button
                className="btn btn-hotel"
                type="button"
                onClick={handleAddNewRoomType}
              >
                Add
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RoomTypeSelector;
