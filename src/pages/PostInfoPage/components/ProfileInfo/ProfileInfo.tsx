import { Button } from "antd";
import Star from "../../../../components/Star/Star";
import styles from "./ProfileInfo.module.css";
import React, { useEffect } from "react";
import { IRootState, useAppDispatch } from "../../../../store";
import { useSelector } from "react-redux";
import { getUser } from "../../../../store/user/actionCreators";

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
  id,
}: {
  createPost?: ProfileInfoProps;
  editProfile?: boolean;
  id: number|null;
}) => {
  const dispatch = useAppDispatch();
  if(!id){
    return <></>
  }

  const user = useSelector((state: IRootState) => state.user.userData);

  if(user.error){
    return <div>Error</div>
  }

  if(user.isLoading){
    return <div>Loading...</div>
  }
  
  const info = user ? (
    [
      { main: "Email", secondary: user.profile!.email },
      // { main: "Password", secondary: user.password },
      {
        main: "Phone number",
        secondary: user?.profile?.phoneNumber ? user.profile!.phoneNumber : "...",
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
          <div className="primary">
            {user.profile!.lastname} {user.profile!.firstname}
          </div>
          <div className="secondary2">
            Since{" "}
            {user && user.profile!.registrationDate
              ? new Date(user.profile!.registrationDate).toDateString()
              : "_"}
          </div>
        </div>
        <Star rating={user ? user.profile!.rating : 5}></Star>

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
