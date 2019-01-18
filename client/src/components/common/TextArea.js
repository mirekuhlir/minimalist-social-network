import React from 'react';
import classnames from 'classnames';
import './TextArea.scss';

const TextArea = ({ name, placeholder, value, error, info, onChange }) => {
  return (
    <>
      <textarea
        className={classnames('text-area-input', { 'is-invalid': error })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="text-area-invalid-feedback">{error}</div>}
    </>
  );
};

export default TextArea;
