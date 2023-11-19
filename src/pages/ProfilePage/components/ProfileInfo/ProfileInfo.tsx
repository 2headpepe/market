import { Button } from "antd";
import Star from "../../../../components/Star/Star";
import styles from "./ProfileInfo.module.css";
import React, { useEffect } from "react";
import { IRootState, useAppDispatch } from "../../../../store";
import { useSelector } from "react-redux";
import { getProfile } from "../../../../store/user/actionCreators";

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

const ProfileInfo = ({
  createPost,
  editProfile,
}: {
  createPost?: ProfileInfoProps;
  editProfile?: boolean;
}) => {
  const dispatch = useAppDispatch();

  const user = useSelector(
    (state: IRootState) => state.user.profileData.profile
  )

  useEffect(()=>{
    dispatch(getProfile());
  },[]);
  const info = user ? (
    [
      { main: "Email", secondary: user.email },
      // { main: "Password", secondary: user.password },
      {
        main: "Phone number",
        secondary: user?.phoneNumber ? user?.phoneNumber : "...",
      },
    ].map((e) => <TwoLineInfo key={e.main} {...e} />)
  ) : (
    <h1>Loading</h1>
  );

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img
        src="https://damion.club/uploads/posts/2022-09/1663879174_3-damion-club-p-dora-pevitsa-oboi-instagram-3.jpg"
        alt="photo"
        className={styles.profilePhoto}
      />

      <div className={styles.infoWrapper}>
        <div className={styles.mainInfoWrapper}>
          <div className="primary">{user?.lastname} {user?.firstname}</div>
          <div className="secondary2">
            Since{" "}
            {user && user.registrationDate
              ? new Date(user?.registrationDate).toDateString()
              : "_"}
          </div>
        </div>
        <Star rating={user ? user.rating : 5}></Star>

        <hr />

        {info}
      </div>

      <hr className={styles.hr} />
      <div className={styles.buttonWrapper}>
        {createPost && (
          <Button type="primary" onClick={createPost}>
            Add post
          </Button>
        )}
        {editProfile != undefined && editProfile && (
          <Button>Edit profile</Button>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
