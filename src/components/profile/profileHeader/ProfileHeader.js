import './profileHeader.css';
import FriendRequestBtn from '../../friendRequest/FriendRequestBtn';
import bgPic from '../../../images/bg-pic.jpg';
import AvatarModal from '../../modals/avatarModal/AvatarModal';
import FriendRequestModal from '../../modals/friendReqModal/FriendRequestModal';
import OpenChat from '../../messenger/OpenChat';
import { Image } from 'cloudinary-react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ProfileHeader({ user }) {
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showFriendRequestModal, setShowFriendRequestModal] = useState(false);
  const [areReqPending, setAreReqPending] = useState(false);



  // check if there are any pending friend requests
  useEffect(() => {
    if (!user) return;
    const findReceived = user.user?.receivedFriendRequests.find(
      (request) => request.receiverId === user.id && request.status === 'pending'
    );
    if (findReceived) {
      setAreReqPending(true);
    } else {
      setAreReqPending(false);
    }
  }, [user]);

  const location = useLocation();
  const path = location.pathname.split('/')[2];
  
  // only show avatar modal if the user is on their own profile
  const handleCloseAvatarModal = () => path === 'me' && setShowAvatarModal(false);
  const handleShowAvatarModal = () => path === 'me' && setShowAvatarModal(true);
  
  const handleCloseFriendRequestModal = () => setShowFriendRequestModal(false);
  const handleShowFriendRequestModal = () => setShowFriendRequestModal(true);



  if(!user) return (<div>Loading...</div>)

  const { firstName, lastName, avatarPublicId, id } = user;
  const fullName = `${firstName} ${lastName}`;
  const receivedFriendRequests = user.user?.receivedFriendRequests;
  const sentFriendRequests = user.user?.sentFriendRequests;
  const totalFriendRequests = receivedFriendRequests?.concat(sentFriendRequests)
  const totalAcceptedFriendRequests = totalFriendRequests?.filter((request) => request.status === 'accepted')
 
  
  return (
    <div className="header-box">
      <header className="flex-column">
        <div className="header-info-box" style={{ backgroundImage: `url(${bgPic})` }}>
          <div className="header-info">
            <Image className="avatar" cloudName="dnq3ef4tj" publicId={avatarPublicId} onClick={handleShowAvatarModal} />
            
              <div className='profile-header-column'>
                  <h2>{fullName}</h2>
                  <p>{Number.isNaN(totalAcceptedFriendRequests?.length) ? '0' : totalAcceptedFriendRequests?.length} friends</p>
              </div>
             
              {/* only show friend request button if the user is on another user's profile */}
              <div className='profile-header-buttons'>
                      {path === 'user' && <FriendRequestBtn receiverId={id} />}
                      {path === 'user' && <OpenChat user={user} />}
                      {/* only show pending requests if the user is on their own profile */}
                      {path === 'me' && areReqPending && <button className="btn btn-primary" onClick={handleShowFriendRequestModal}
                      >Friend request pending
                      </button>}
              </div>
            
        
          </div>
        </div>
      </header>
      <AvatarModal show={showAvatarModal} handleClose={handleCloseAvatarModal} myUserId={id} />
      <FriendRequestModal show={showFriendRequestModal} handleClose={handleCloseFriendRequestModal} receivedFriendRequests={user.user?.receivedFriendRequests} />
    </div>
  );
}
