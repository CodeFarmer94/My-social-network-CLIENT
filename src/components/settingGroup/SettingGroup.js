// SettingsGroup.js
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { Button } from 'react-bootstrap';
import { AiFillEdit } from 'react-icons/ai';
import './settingGroup.css';


function SettingsGroup({ 
  // Use this to display the title of the setting group
    title,
    // Temporary user settings values
    tempMyUser, 
    // Temporary user settings show values
    tempMyUserSettings,
    // Setting prop name
    settingName, 
    propName,
    // Use this to update the temporary user settings values
    setTempMyUser, 
    // Use this to update the temporary user settings show values
    setTempMyUserSettings }) {
 
  // Use this to reference the input field 
  const inputRef = useRef(null);
  // Use this to keep track of whether the user wants to add a setting
  const [showAddSetting, setShowAddSetting] = useState(false);
      
 // Use this to update the temp user settings when the user clicks on the checkbox
  const handleShowSetting = () => {
    setTempMyUserSettings(prev => ({...prev, [settingName]: !prev[settingName]}));
}
  // Use this to show the input field when the user clicks on the add setting button
  const handleShowAddSetting = () => {
    setShowAddSetting(prev => !prev);}
  // Use this to update the temp user settings when the user clicks on the confirm button
  const handleConfirmAddSetting = () => {
    const inputValue = inputRef.current.value;
    setTempMyUser(prev => ({...prev, [propName]: inputValue}));
    handleShowAddSetting()
  };
  // Use this to update the temp user settings when the user presses the enter key
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleConfirmAddSetting();
    }
  };


  return (
    <div className='settings-group-container'>
      <h5 className='group-title'>
        {title}
      </h5>
      {tempMyUser[propName] && (
        <div className='settings-group'>
          <div className='wid-100'> 
            <h6 className='detail-value'>
                 {tempMyUser[propName]}
            </h6>
            <div className='settings-btns-group'>
              <button 
              onClick = {handleShowSetting}
              className={ tempMyUserSettings[settingName] ? 'setting-checked' : 'setting-disabled'}
              id='show-btn'
            >
              Show
              </button>
              <button onClick={handleShowAddSetting} id='edit-btn'>
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
      {(!tempMyUser[propName]||showAddSetting) && (
        <div>
          <label htmlFor={settingName} onClick={handleShowAddSetting}>
           <span id='add-icon'><MdOutlineAddCircleOutline /></span>  Add your {propName} description
          </label>
          <div className='add-setting'>
          <input
            type='text'
            className={showAddSetting ? 'display-inherit' : 'display-none'}
            ref={inputRef}
            placeholder={tempMyUser[propName] || `Add your ${propName} description`}
            onKeyDown={handleKeyDown}
          />
         { showAddSetting && <Button variant='primary' onClick={handleConfirmAddSetting}>
            Confirm
          </Button>}
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsGroup;
