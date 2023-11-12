import { Button } from "antd";
import Star from "../../../../components/Star/Star";
import styles from "./ProfileInfo.module.css";
import CreatePost from "../../../../components/Modals/CreatePost/CreatePost";
import React, { useEffect } from "react";
import { IRootState, useAppDispatch } from "../../../../store";
import { getProfile } from "../../../../store/auth/actionCreators";
import { useSelector } from "react-redux";

const TwoLineInfo = ({
  main,
  secondary,
}: {
  main: string;
  secondary: string;
}) => {
  return (
    <div className={styles.blockWrapper}>
      <div className="secondary2">{main}</div>
      <div className="primary2">{secondary}</div>
    </div>
  );
};

type ProfileInfoProps = React.MouseEventHandler;

const ProfileInfo = ({ createPost }: { createPost: ProfileInfoProps }) => {

  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(getProfile());
  },[])

  const user = useSelector(
    (state: IRootState) => state.auth.profileData.profile
  );
  

// export interface IUserProfile {
//   id: number,
//   firstname: string,
//   lastname: string,
//   email: string,
//   password: string,
//   registrationDate: string,
//   balance: number,
//   rating: number
// }


  const info = user?[
    { main: "Email", secondary: user.email},
    { main: "Password", secondary: user.password },
  ].map((e) => <TwoLineInfo {...e} />):<h1>Loading</h1> 

  return (
    <>
      <img
        src="https://damion.club/uploads/posts/2022-09/1663879174_3-damion-club-p-dora-pevitsa-oboi-instagram-3.jpg"
        alt="photo"
        className={styles.profilePhoto}
      />

      <div className={styles.infoWrapper}>
        <div className={styles.mainInfoWrapper}>
          <div className="primary">Your name</div>
          <div className="secondary2">Since {user?.registrationDate.toDateString()}</div>
        </div>
        <Star rating={user?user.rating:5}></Star>

        <hr />

        {info}
      </div>

      <hr className={styles.hr} />

      <div className={styles.buttonWrapper}>
        <Button
          type="primary"
          onClick={createPost}
        >
          Add post
        </Button>
        <Button>Edit profile</Button>
      </div>
    </>
  );
};

export default ProfileInfo;
