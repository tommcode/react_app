import React from 'react';

const Select = (props) => {
  const { optionValue, change } = props;

  const valueMusicTabs = optionValue.map((musicTab, index) => {
    return <option name={optionValue[index]} key={index}> {optionValue[index]} </option>
  })

  return (
    <select onChange={change}>
      {valueMusicTabs}
    </select>
  )
};

export default Select;