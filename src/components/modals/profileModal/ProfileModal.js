// ProfileModal.js

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './profileModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectMyUser, selectMyUserSettings, setMyUser, setMyUserSettings } from '../../../features/myUserSlice';
import { useState, useEffect } from 'react';
import SettingsGroup from '../../settingGroup/SettingGroup';
import { useMutation } from 'react-query';
import { set } from 'react-hook-form';


export default function ProfileModal({ handleClose, show }) {


  const dispatch = useDispatch();


  // Use this to get the user object from the store
  const myUser = useSelector(selectMyUser);
  // Use this to get the user settings object from the store
  const myUserSettings = useSelector(selectMyUserSettings)
  // Use this to store the temporary user settings values
  const [tempMyUser, setTempMyUser] = useState(myUser); 
  // Use this to store the temporary user settings show values
  const [tempMyUserSettings, setTempMyUserSettings] = useState(myUserSettings); 
  
    // Use useEffect to update tempMyUser when data is fetched from the server
    useEffect(() => {
      setTempMyUser(myUser);
      setTempMyUserSettings(myUserSettings);
    }, [myUser, myUserSettings]);

   // Use this to update the user settings on the server
  const updateUser = async () => {
    try {
      const res = await fetch('http://localhost:8030/user/me', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tempMyUser),
      });
      if (!res.ok) {
        throw new Error('Could not update user');
      }
      dispatch(setMyUser(tempMyUser))
      const data = await res.json();
    } catch (error) {
      console.log(error);
    }
  }
  
  // Use this to update the user settings on the server
  const updateUserSettings = async () => {
    try {
      const res = await fetch('http://localhost:8030/user/settings', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tempMyUserSettings),
      });
      if (!res.ok) {
        throw new Error('Could not update user settings');
      }
      dispatch(setMyUserSettings(tempMyUserSettings))
      const data = await res.json();
      
    } catch (error) {
      console.log(error);
    }
  }

  const { mutate: mutateUser } = useMutation(updateUser);
  const { mutate: mutateUserSettings } = useMutation(updateUserSettings);

  // Use this to update the user and user settings on the server when button confirm is clicked
  const handleSaveChanges = () => {
    mutateUser();
    mutateUserSettings();
    handleClose();
  }


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h4 className='modal-title'>
            Edit Details
          </h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className='modal-container'>
        <header>     
          <h5>
            Customize Your Presentation
          </h5>
          <p>
            The information you choose will be made public. You can change this later.
          </p>
        </header>


        {/* Use the SettingsGroup component for education */}
        <SettingsGroup
          title="Education"
          tempMyUser = {tempMyUser} 
          setTempMyUser = {setTempMyUser} 
          tempMyUserSettings = {tempMyUserSettings}
          setTempMyUserSettings = {setTempMyUserSettings}
          settingName="showEducation" 
          propName = 'education'
          // Pass a unique identifier for education
        />

        {/* Use the SettingsGroup component for place of living */}
        <SettingsGroup
          title="Place of Living"
          tempMyUser = {tempMyUser} 
          setTempMyUser = {setTempMyUser} 
          tempMyUserSettings = {tempMyUserSettings}
          setTempMyUserSettings = {setTempMyUserSettings}
          settingName="showPlaceOfLiving"
          propName = 'placeOfLiving'
           // Pass a unique identifier for place of living
        />
          
          {/* Use the SettingsGroup component for place of birth */}
        <SettingsGroup
          title="Place of Birth"
          tempMyUser={tempMyUser}
          setTempMyUser={setTempMyUser}
          tempMyUserSettings={tempMyUserSettings}
          setTempMyUserSettings={setTempMyUserSettings}
          settingName="showPlaceOfBirth" 
          propName = 'placeOfBirth'
            // Pass a unique identifier for place of birth
        />
          
          {/* Use the SettingsGroup component for relationship status */} 
        <SettingsGroup
          title="Relationship Status"
          tempMyUser={tempMyUser}
          setTempMyUser={setTempMyUser}
          tempMyUserSettings={tempMyUserSettings}
          setTempMyUserSettings={setTempMyUserSettings}
          settingName="showRelationshipStatus" 
          propName = 'relationshipStatus'
          // Pass a unique identifier for relationship status
        />
          
          {/* Use the SettingsGroup component for job */} 
        <SettingsGroup
          title="Job"
          tempMyUser={tempMyUser}
          setTempMyUser={setTempMyUser}
          tempMyUserSettings={tempMyUserSettings}
          setTempMyUserSettings={setTempMyUserSettings}
          propName = 'job'
          settingName="showJob" // Pass a unique identifier for job
        />
      </div>
        

      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
