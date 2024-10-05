import React from 'react';

const JsonSchemaInput = ({ onInputChange, onGenerate }) => {
  return (
    <div className="form-container">
      <textarea
        onInput={onInputChange}
        rows="15"
        cols="50"
        placeholder="Enter a JSON schema"
      ></textarea>
      <button onClick={onGenerate}>Generate Form</button>
    </div>
  );
};

export default JsonSchemaInput;
