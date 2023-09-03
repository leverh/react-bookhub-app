// import React from "react";
// import styles from "../../styles/Profile.module.css";
// import btnStyles from "../../styles/Button.module.css";
// import { useCurrentUser } from "../../contexts/CurrentUserContext";
// import { Link } from "react-router-dom";
// import Avatar from "../../components/Avatar";
// import { Button } from "react-bootstrap";

// const Profile = (props) => {
//   const { profile, imageSize = 55 } = props;
//   const { id, image, owner, following_id } = profile;

//   const currentUser = useCurrentUser();
//   const is_owner = currentUser?.username === owner;

//   return (
//     <div className="my-3 d-flex align-items-center">
//       <div>
//         <Link className="align-self-center" to={`/profiles/${id}`}>
//           <Avatar src={image} height={imageSize} />
//         </Link>
//       </div>
//       <div className={`mx-2 ${styles.WordBreak}`}>
//         <strong>{owner}</strong>
//       </div>
//       <div className="text-right ml-auto">
//         {currentUser && !is_owner && (
//           <Button
//             className={`${btnStyles.Button} ${
//               following_id ? btnStyles.BlackOutline : btnStyles.Black
//             }`}
//             onClick={() => {}}
//           >
//             {following_id ? "unfollow" : "follow"}
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";

const Profile = (props) => {
  const { profile, imageSize = 55 } = props;
  const { id, image, owner, following_id } = profile;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const handleFollowUnfollow = async () => {
    try {
      if (following_id) {
        // Unfollow
        await axiosReq.delete(`/followers/${following_id}/`);
        // Update the state to reflect that the current user is no longer following the profile user
      } else {
        // Follow
        const { data } = await axiosReq.post("/followers/", {
          followed: id,
        });
        // Update the state to reflect that the current user is now following the profile user
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.ProfileContainer}>
      <div className={styles.AvatarContainer}>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
        <div className={styles.UserName}>{owner}</div>
        <div className="text-right ml-auto">
          {currentUser && !is_owner && (
            <Button
              className={styles.FollowButton}
              onClick={handleFollowUnfollow}
            >
              {following_id ? "unfollow" : "follow"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
