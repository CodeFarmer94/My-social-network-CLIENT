import React from 'react';
import ProfileModal from '../../modals/profileModal/ProfileModal';
import './profileInfo.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectMyUser, selectMyUserSettings } from '../../../features/myUserSlice';
import { setMyUserSettings } from '../../../features/myUserSlice';
import { setUserSettings } from '../../../features/userSlice';
import { useLocation } from 'react-router-dom';

import {
  IoBagSharp,
  IoSchoolSharp,
  IoHomeSharp,
  IoHeartSharp,
  IoLocationSharp,
  IoPersonSharp
} from 'react-icons/io5';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';


export default function ProfileInfo({user}) {

  const dispatch = useDispatch();
  const myUser = useSelector(selectMyUser);
  const settingsData = useSelector(selectMyUserSettings);
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  
  const { bio, job, education, placeOfLiving, placeOfBirth, relationshipStatus } = user;
 
  const [showProfileModal, setShowProfileModal] = useState(false);
  const handleCloseProfileModal = () => setShowProfileModal(false);
  const handleShowProfileModal = () => setShowProfileModal(true);
  

  const {data, isLoading} = useQuery('userDetails', async () => {
    try{
      const res = await fetch(`http://localhost:8030/user/settings/${user.id}`, {
        method: 'GET',
        credentials: 'include'
      })
      if(!res.ok){
        throw new Error('Could not fetch user settings')
      }
      const data = await res.json()
      console.log(data)
      if(data){
        {path === 'me' && dispatch(setMyUserSettings(data))}
        {path !== 'me' && dispatch(setUserSettings(data))}
      }
      return data
    }
    catch(error){
      console.log(error)
    }
  }
)
if (isLoading) {
  return <div>Loading...</div>;
}
  
 
  return (
    <div className="profile-info-box">
      <h2>About me</h2>
      <form>
      <ul>
      { settingsData?.showBio &&  <li>
          <span>
              <IoPersonSharp className="io-icon-person" />
          </span>
          <p>
            {bio || 'Tell us something about yourself'}
          </p>
        </li>}
       { settingsData?.showJob && <li>
          <span className="io-icon">
            <IoBagSharp />
          </span>
          <p>
            {job || 'Add your job description'}
          </p>
        </li>}
        {settingsData?.showEducation && <li>
          <span className="io-icon">
            <IoSchoolSharp />
          </span>
          <p>
            {education || 'Add your educational background'}
          </p>
        </li>}
        {settingsData?.showPlaceOfLiving && <li>
          <span className="io-icon">
            <IoHomeSharp />
          </span>
          <p>
            {placeOfLiving || 'Add your current location'}
          </p>
        </li>}
        {settingsData?.showPlaceOfBirth && <li>
          <span className="io-icon">
            <IoLocationSharp />
          </span>
          <p>
            {placeOfBirth || 'Add your place of birth'}
          </p>
        </li>}
        {settingsData?.showPlaceOfLiving && <li>
          <span className="io-icon">
            <IoHeartSharp />    
          </span>
          <p>
            {relationshipStatus || 'Add your relationship status'}
          </p>
        </li>}
      </ul>
      </form>
      <div>
        {path === 'me' && <button onClick={handleShowProfileModal} className='edit-details-button'>Edit Details</button>}
      </div>
      <ProfileModal  show={showProfileModal} handleClose={ handleCloseProfileModal } />
    
    </div>
  );
}

