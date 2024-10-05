import { useState } from 'react';
import './App.css';
import JsonSchemaInput from './components/JsonSchemaInput.jsx';
import GeneratedForm from './components/GeneratedForm.jsx';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [jsonData, setJsonData] = useState({});
  const [formData, setFormData] = useState({});

  const handleTextArea = (e) => {
    try {
      setJsonData(JSON.parse(e.target.value));
    } catch (error) {
      console.error("Invalid JSON format", error);
    }
  };

  const generateForm = () => {
    setShowForm(true);
  };

  const tryAgain = () => {
    window.location.reload();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: prev[name] ? [...prev[name], value] : [value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <>
      {!showForm ? (
        <JsonSchemaInput
          onInputChange={handleTextArea}
          onGenerate={generateForm}
        />
      ) : jsonData.fields ? (
        <GeneratedForm
          jsonData={jsonData}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      ) : (
        <div className="form-container">
          <p className="error-message">Sorry, could not generate form.</p>
          <button onClick={tryAgain}>Try Again</button>
        </div>
      )}
    </>
  );
}

export default App;
