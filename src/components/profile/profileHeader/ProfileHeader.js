import './profileHeader.css'
import profilePic from '../../../images/profile-pic.jpg';
import bgPic from '../../../images/bg-pic.jpg';
import ProfileNavbar from '../profileNavbar/ProfileNavbar';
import AvatarModal from '../../modals/avatarModal/AvatarModal';
import { Image } from 'cloudinary-react';
import { useState } from 'react';
import { useLocation} from 'react-router-dom';
export default function ProfileHeader({myUser}) {

    const [showAvatarModal, setShowAvatarModal] = useState(false);

    const location = useLocation();
    const path = location.pathname.split('/')[2];

    // only show avatar modal if user is on their own profile
    const handleCloseAvatarModal = () => path === 'me' && setShowAvatarModal(false);
    const handleShowAvatarModal = () => path === 'me' && setShowAvatarModal(true);
    
    const { firstName, lastName, friends, avatarPublicId } = myUser;
    const fullName = `${firstName} ${lastName}`;


    return(
        <div className="header-box">
        <header className='flex-column'>
          <div className="header-info-box" style={{backgroundImage:`url(${bgPic})`}}>
              <div className='header-info'>
                <Image className='avatar' cloudName='dnq3ef4tj' publicId={avatarPublicId} onClick={handleShowAvatarModal}/>
                <div className='flex-column'>
                   <h2>{ fullName }</h2>
                    <p>{friends} friends</p>
                </div>
               
              </div>
          </div>
          <ProfileNavbar />
        </header>
        <AvatarModal show={showAvatarModal} handleClose={ handleCloseAvatarModal}  myUserId={ myUser.id} />
        
      </div>
    )
}