import React from 'react';

const GeneratedForm = ({ jsonData, onSubmit, onChange }) => {
  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
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
                      onChange={onChange}
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
                onChange={onChange}
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

            {field.type === 'checkbox' && field.options && (
              <div>
                {field.options.map((option, j) => (
                  <div key={j} className="checkbox-option">
                    <input
                      type="checkbox"
                      id={`${field.name}_${option}`}
                      name={field.name}
                      value={option}
                      onChange={onChange}
                    />
                    <label
                      htmlFor={`${field.name}_${option}`}
                      className="checkbox-label"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {field.type === 'file' && (
              <input
                type="file"
                id={field.name}
                name={field.name}
                onChange={onChange}
                required={field.required}
              />
            )}

            {field.type !== 'radio' &&
              field.type !== 'select' &&
              field.type !== 'checkbox' &&
              field.type !== 'file' && (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  onChange={onChange}
                  required={field.required}
                />
              )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default GeneratedForm;
