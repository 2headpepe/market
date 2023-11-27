import { Button, Input, List } from "antd";
import Star from "../../../../components/Star/Star";
import styles from "./ProfileInfo.module.css";
import React, { useEffect } from "react";
import { IRootState, useAppDispatch } from "../../../../store";
import { useSelector } from "react-redux";
import { getProfile, patchUser } from "../../../../store/user/actionCreators";

const TwoLineInfo = ({
  main,
  secondary,
  editMode,
  setValues,
  value,
}: {
  main: string;
  value: string;
  secondary: string;
  editMode: boolean;
  setValues: Function;
}) => {
  if (editMode) {
    return (
      <div className={styles.blockWrapperEdit}>
        <div className="secondary2">{main}</div>
        <Input
          className="primary2"
          value={secondary}
          onChange={(e) => setValues(e.target.value, value)}
          placeholder={main}
        />
      </div>
    );
  }
  if (value === "password") return;
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
  currentPosts,
  setCurrentPosts,
  posts,
}: {
  createPost?: ProfileInfoProps;
  editProfile?: boolean;
  currentPosts: number;
  setCurrentPosts: (val: number) => void;
  posts: string[];
}) => {
  const [editMode, setEditMode] = React.useState(false);
  const dispatch = useAppDispatch();

  const user = useSelector(
    (state: IRootState) => state.user.profileData.profile
  );

  const [userInfo, setUserInfo] = React.useState({
    firstname: user?.firstname ?? '',
    lastname: user?.lastname ?? '',
    email: user?.email ?? '',
    password: "",
  });
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    if(!user) return
    setUserInfo((state) => ({
      ...state,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    }));
  }, [user]);
  function setValues(newVal: string, val: string) {
    setUserInfo((state) => ({ ...state, [val]: newVal }));
    console.log(userInfo);
  }
  const info = user ? (
    [
      {
        main: "First name",
        value: "firstname",
        secondary: userInfo.firstname,
        setValues,
      },
      {
        main: "Last name",
        value: "lastname",
        secondary: userInfo.lastname,
        setValues,
      },
      { main: "Email", value: "email", secondary: userInfo.email, setValues },
      {
        main: "Password",
        secondary: userInfo.password,
        value: "password",
        setValues,
      },
      // {
      //   main: "Password",
      //   value: "password",
      //   secondary: user?.phoneNumber ? user?.phoneNumber : "...",
      //   setValues
      // },
    ].map((e) => <TwoLineInfo key={e.main} {...e} editMode={editMode} />)
  ) : (
    <h1>Loading</h1>
  );

  function handleEditClick() {
    if (editMode) {
      if (!user) return;
      dispatch(patchUser(userInfo));
      console.log(userInfo);
    }
    setEditMode((state) => !state);
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
      }}
    >
      <img
        src="https://damion.club/uploads/posts/2022-09/1663879174_3-damion-club-p-dora-pevitsa-oboi-instagram-3.jpg"
        alt="photo"
        className={styles.profilePhoto}
      />

      <div className={styles.infoWrapper}>
        <div className={styles.mainInfoWrapper}>
          {/* <div className="primary">
            {user?.lastname} {user?.firstname}
          </div> */}
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
      <List
        style={{ width: "100%" }}
        size="small"
        dataSource={posts}
        renderItem={(item, index) => (
          <List.Item
            style={{
              padding: "8px 0px",
              width: "100%",
              color: currentPosts + 1 === index ? "#1677ff" : "black",
            }}
            onClick={() => setCurrentPosts(index - 1)}
          >
            {item}
          </List.Item>
        )}
      />
      <hr className={styles.hr} />
      <div className={styles.buttonWrapper}>
        {createPost && !editMode && (
          <Button type="primary" onClick={createPost}>
            Add post
          </Button>
        )}
        {editProfile && (
          <Button onClick={handleEditClick}>
            {editMode ? "Confirm" : "Edit profile"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
