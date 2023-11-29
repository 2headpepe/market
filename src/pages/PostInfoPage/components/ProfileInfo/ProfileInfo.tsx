import { Button } from "antd";
import Star from "../../../../components/Star/Star";
import styles from "./ProfileInfo.module.css";
import React from "react";
import { IRootState } from "../../../../store";
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

const ProfileInfo = ({
  createPost,
  editProfile,
  id,
  openListings,
}: {
  createPost?: ProfileInfoProps;
  editProfile?: boolean;
  id: number | null;
  openListings:Function
}) => {
  // const dispatch = useAppDispatch();
  const user = useSelector((state: IRootState) => state.user.userData);
  if (!id) {
    return <></>;
  }

  if (user.error) {
    return <div>Error</div>;
  }

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  const info = user ? (
    [
      { main: "First name", secondary: user.profile!.firstname },
      {
        main: "Last name",
        secondary: user.profile!.lastname,
      },
      { main: "Email", secondary: user.profile!.email },
      {
        main: "Phone number",
        secondary: user.profile!.phone,
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
        <hr className={styles.hr} />
        <div style={{ display:"flex",alignItems: "center",justifyContent:"center",marginTop:"20px" }}>
          <Button type="primary" onClick={()=>openListings()}>Reviews</Button>
        </div>
      </div>

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
