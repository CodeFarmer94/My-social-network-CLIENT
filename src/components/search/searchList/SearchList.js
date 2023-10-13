import { Image } from 'cloudinary-react';
import './../search.css'
import { Link } from 'react-router-dom'
function SearchList({searchList}) {
    
    
    return (  
        <div className="searchList">
            {searchList.map((user, index) => {
                return(
                <Link to={`/profile/user/${user.id}`}>
                    <div className="searchList-item" key={index}>
                            <Image cloudName="dnq3ef4tj" publicId={user.avatarPublicId} id='sl-profile-pic'/>
                            <h6>{user.firstName} {user.lastName}</h6>
                    </div>
                </Link>
                )
            }
            )}
        </div>
    );
}

export default SearchList
