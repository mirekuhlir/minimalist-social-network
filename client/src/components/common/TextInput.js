import React from 'react';
import './TextInput.scss';
import classnames from 'classnames';

const TextInput = ({
  placeholder,
  name,
  value,
  inputType,
  onChange,
  disabled,
  label,
  error
}) => {
  return (
    <>
      <input
        type={inputType}
        //if error is true, string is "form__text-input is-invalid"
        className={classnames('form__text-input', { 'is-invalid': error })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {/*Display error message under input  */}
      {error && <div className="text-input-invalid-feedback">{error}</div>}
    </>
  );
};

export default TextInput;
