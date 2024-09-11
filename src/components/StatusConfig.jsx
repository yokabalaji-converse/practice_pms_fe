import React, { useState } from "react";

function StatusConfig({ formData, setFormData, register, editButtonClick }) {
  const [inputs, setInputs] = useState([]);

  const addStatusState = (index, event) => {
    const { name, value } = event.target;
    const updatedValues = [...inputs];
    updatedValues[index] = { ...updatedValues[index], [name]: value };
    setInputs(updatedValues);

    setFormData({ ...formData, status: updatedValues });
  };

  const handleRemoveInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);

    setFormData({ ...formData, status: newInputs });
  };

  const handleAddInput = () => {
    setInputs([...inputs, { statusName: "", colourCode: "" }]);
  };

  const handleAddInputEdit = () => {
    setFormData((prevData) => {
      // Create a new empty status entry with default values
      const newStatus = {
        statusName: "",
        colourCode: "#ffffff",
      };

      // Append the new entry to the existing status array
      const updatedStatus = [...prevData.status, newStatus];

      return {
        ...prevData,
        status: updatedStatus, // Update status with appended new entry
      };
    });
  };

  const addStatusStateEdit = (index, event) => {
    const { name, value } = event.target;

    setFormData((prevData) => {
      const updatedStatus = [...prevData.status];

      updatedStatus[index] = { ...updatedStatus[index], [name]: value };

      return {
        ...prevData,
        status: updatedStatus,
      };
    });
  };

  const handleRemoveInputEdit = (index) => {
    setFormData((prevData) => {
      const updatedStatus = [...prevData.status];
      updatedStatus.splice(index, 1);

      return {
        ...prevData,
        status: updatedStatus,
      };
    });
  };

  return (
    <>
      {!editButtonClick ? (
        <div>
          {inputs.map((input, index) => (
            <div key={index} className="flex flex-row gap-2 items-center">
              <input
                type="text"
                name="statusName"
                value={input.statusName}
                onChange={(event) => addStatusState(index, event)}
                placeholder="Enter status name"
                className="border mt-2 p-2 rounded"
              />
              <input
                id={`colorPicker-${index}`}
                name="colourCode"
                type="color"
                value={input.colourCode}
                onChange={(event) => addStatusState(index, event)}
              />

              <button
                onClick={() => handleRemoveInput(index)}
                className="h-[20px] w-[60px] rounded-md bg-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={handleAddInput}
            className="h-[20px] w-[50px] mt-4 rounded-md bg-green-500"
          >
            ADD
          </button>
        </div>
      ) : (
        <div>
          {Array.isArray(formData.status) &&
            formData.status?.map((input, index) => (
              <div key={index} className="flex flex-row gap-2 items-center">
                <input
                  type="text"
                  name="statusName"
                  value={input.statusName}
                  onChange={(event) => addStatusStateEdit(index, event)}
                  placeholder="Enter status name"
                  className="border mt-2 p-2 rounded"
                />
                <input
                  id={`colorPicker-${index}`}
                  name="colourCode"
                  type="color"
                  value={input.colourCode}
                  onChange={(event) => addStatusStateEdit(index, event)}
                />

                <button
                  onClick={() => handleRemoveInputEdit(index)}
                  className="h-[20px] w-[60px] rounded-md bg-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          <button
            onClick={handleAddInputEdit}
            className="h-[20px] w-[50px] mt-4 rounded-md bg-green-500"
          >
            ADD
          </button>
        </div>
      )}
    </>
  );
}

export default StatusConfig;
