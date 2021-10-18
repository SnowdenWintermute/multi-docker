import React, { useState, useEffect } from "react";
import axios from "axios";

const Fib = () => {
  const [seenIndices, setSeenIndices] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    fetchValues();
    fetchIndices();
  }, []);

  async function fetchValues() {
    const values = await axios.get("/api/values/current");
    setValues(values.data);
  }
  async function fetchIndices() {
    const seenIndices = await axios.get("/api/values/all");
    setSeenIndices(seenIndices.data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/values", {
      index,
    });
    setIndex("");
  };

  const renderSeenIndices = () =>
    seenIndices?.map(({ number }) => number).join(", ");

  const renderValues = () =>
    values && Object.keys.values?.length
      ? Object.keys.values.map((value) => (
          <div>
            For index {value} I calculated {values[value]}
          </div>
        ))
      : "";

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index</label>
        <input value={index} onChange={(e) => setIndex(e.target.value)} />
        <button>Submit</button>
      </form>
      <h3>Indices seen:</h3>
      {renderSeenIndices()}
      <h3>Calculated values: </h3>
      {renderValues()}
    </div>
  );
};
export default Fib;
