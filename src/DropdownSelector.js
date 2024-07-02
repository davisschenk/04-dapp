import React, { useState } from 'react';

const DropdownSelector = ({ options, onSelect, render = (i) => i }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue); // Pass selected value to parent component if needed
  };

  return (
    <div>
      <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
        <option value="">Select...</option>
        {options.map((option, index) => (
          <option key={index} value={index}>{render(option)}</option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSelector;
