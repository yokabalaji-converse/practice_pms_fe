import React, { useState, useEffect } from "react";

function LevelConfig({ register, setFormData, formData, editButtonClick }) {
  const [inputValues, setInputValues] = useState([]);

  useEffect(() => {
    if (Array.isArray(formData)) {
      setInputValues(formData);
    }
  }, [formData]);

  const handleLevelChange = (e) => {
    const levelsCount = parseInt(e.target.value, 10);
    if (!isNaN(levelsCount) && levelsCount > 0) {
      const levelsArray = new Array(levelsCount).fill(null).map(() => ({
        levelName: "",
        colorCode: "#ffffff",
      }));
      setFormData({ ...formData, ["levels"]: levelsArray });
      setInputValues(levelsArray);
    } else {
      setFormData([]);
      setInputValues([]);
    }
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedValues = [...inputValues];
    updatedValues[index] = { ...updatedValues[index], [name]: value };
    setInputValues(updatedValues);

    setFormData({ ...formData, ["levels"]: updatedValues });
  };

  const handleEditLevelChange = (e) => {
    const levelsCount = parseInt(e.target.value, 10);
    setFormData((prevData) => {
      let updatedLevels = [...prevData.levels];

      if (!isNaN(levelsCount) && levelsCount > 0) {
        if (levelsCount > updatedLevels.length) {
          const newLevels = new Array(levelsCount - updatedLevels.length)
            .fill(null)
            .map(() => ({
              levelName: "",
              colorCode: "#ffffff",
            }));
          updatedLevels = [...updatedLevels, ...newLevels];
        } else if (levelsCount < updatedLevels.length) {
          updatedLevels = updatedLevels.slice(0, levelsCount);
        }

        return {
          ...prevData,
          levels: updatedLevels,
        };
      }

      return {
        ...prevData,
        levels: [],
      };
    });
  };

  const handleInputEditChange = (index, event) => {
    const { name, value } = event.target;

    // Update the corresponding level's property (levelName or colorCode)
    setFormData((prevData) => {
      const updatedLevels = [...prevData.levels];
      updatedLevels[index] = {
        ...updatedLevels[index],
        [name]: value, // Update either 'levelName' or 'colorCode'
      };

      return {
        ...prevData,
        levels: updatedLevels,
      };
    });
  };

  return (
    <div>
      {!editButtonClick ? (
        <div>
          <input
            type="number"
            onChange={handleLevelChange}
            className="border text-sm rounded-lg block w-80 p-2.5"
            placeholder="Number Of Levels"
          />
          {Array.isArray(inputValues) &&
            inputValues.map((item, index) => (
              <div key={index} className="flex items-center my-5">
                <input
                  type="text"
                  name="levelName"
                  value={item.levelName}
                  onChange={(event) => handleInputChange(index, event)}
                  className="border text-sm rounded-lg block w-80 p-2.5"
                  placeholder={`Level ${index + 1}`}
                />
                <input
                  id={`colorPicker-${index}`}
                  name="colorCode"
                  type="color"
                  value={item.colorCode}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
            ))}
        </div>
      ) : (
        <div>
          <input
            type="number"
            onChange={handleEditLevelChange}
            className="border text-sm rounded-lg block w-80 p-2.5"
            placeholder="Number Of Levels"
            value={(formData.levels || []).length || 0}
          />
          <ul>
            {Array.isArray(formData.levels) &&
              formData.levels.map((item, index) => (
                <li key={item.id}>
                  <input
                    type="text"
                    name="levelName"
                    value={item.levelName}
                    onChange={(event) => handleInputEditChange(index, event)}
                    className="border text-sm rounded-lg block w-80 p-2.5"
                    placeholder={`Level ${index + 1}`}
                  />
                  <input
                    id={`colorPicker-${index}`}
                    name="colorCode"
                    type="color"
                    value={item.colorCode}
                    onChange={(event) => handleInputEditChange(index, event)}
                  />
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LevelConfig;
