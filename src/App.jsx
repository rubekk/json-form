import { useState } from 'react';
import './App.css';

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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <>
      {!showForm ? (
        <div className="form-container">
          <textarea
            onInput={handleTextArea}
            rows="15"
            cols="50"
            placeholder="Enter a JSON schema"
          ></textarea>
          <button onClick={generateForm}>Generate Form</button>
        </div>
      ) : jsonData.fields ? (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h1>{jsonData.title || 'Generated Form'}</h1>
            {jsonData.fields.map((field, i) => (
              <div key={i} className="inp-group">
                <label htmlFor={field.name}>{field.label}</label>

                {field.type === 'radio' && field.options && (
                  <div>
                    {field.options.map((option, j) => (
                      <div key={j} className="radio-option">
                        <input
                          type="radio"
                          id={`${field.name}_${option}`}
                          name={field.name}
                          value={option}
                          onChange={handleChange}
                          required={field.required}
                        />
                        <label
                          htmlFor={`${field.name}_${option}`}
                          className="radio-label"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {field.type === 'select' && field.options && (
                  <select
                    id={field.name}
                    name={field.name}
                    onChange={handleChange}
                    required={field.required}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option, j) => (
                      <option key={j} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}

                {field.type !== 'radio' && field.type !== 'select' && (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    onChange={handleChange}
                    required={field.required}
                  />
                )}
              </div>
            ))}
            <button type="submit">Submit</button>
          </form>
        </div>
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
