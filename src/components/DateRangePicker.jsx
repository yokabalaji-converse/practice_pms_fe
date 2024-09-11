import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
export const DateRangePicker = ({ formData, setFormData, register }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const compareDates = (start, end) => {
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);

    if (startDateObj > endDateObj) {
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "startDate") {
      setStartDate(value);
      if (endDate && !compareDates(value, endDate)) {
        setError("Start Date cannot be after End Date");
      } else {
        setError("");
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
    } else if (name === "endDate") {
      setEndDate(value);

      if (startDate && !compareDates(startDate, value)) {
        setError("End Date cannot be before Start Date");
      } else {
        setError("");
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
    }
  };
  return (
    <div>
      <label htmlFor="startDate" className="ml-2">
        {" "}
        startDate
        <input
          id="startDate"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          className="border p-2 rounded ml-2"
        />
      </label>
      <label htmlFor="endingDate" className="ml-2">
        endDate
        <input
          id="endingDate"
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
          className="border p-2 rounded ml-2"
        />
      </label>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DateRangePicker;
