import './navbar.css'
import navbarLogo from '../../images/navbar-logo.png';
import { TbWorldSearch } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { selectMyUser } from '../../features/myUserSlice';
import { Image } from 'cloudinary-react';
import { SiGooglemessages } from 'react-icons/si';
import {MdNotifications } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Search from '../search/Search';
function Navbar() {

    // Redux State
    const myUser = useSelector(selectMyUser);
    const myUserAvatar = myUser.avatarPublicId;

  return (
    <div className='navbar-container'>
        <img src={navbarLogo} alt= "logo" id="navbar-logo" />
        <Search />
        <div className='user-group'>
            <Link to='/profile/me'>
                <Image cloudName="dnq3ef4tj" publicId={myUserAvatar} id='sl-profile-pic'/>
            </Link>
            <SiGooglemessages id='chat-icon'/>
            <MdNotifications id='notification-icon'/>
        </div>
    </div>
  );
}

export default Navbar;