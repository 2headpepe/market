import { Button, Input, List, message } from "antd";
import Star from "../../../../components/Star/Star";
import styles from "./ProfileInfo.module.css";
import React, { useEffect } from "react";
import { IRootState, useAppDispatch } from "../../../../store";
import { useSelector } from "react-redux";
import {
  deleteUser,
  getProfile,
  patchUser,
} from "../../../../store/user/actionCreators";
import { PlusOutlined } from "@ant-design/icons";
import { postImage } from "../../../../store/images/actionCreators";

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
  deleteProfile,
  createPost,
  editProfile,
  currentPosts,
  setCurrentPosts,
  posts,
}: {
  deleteProfile?: boolean;
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
    firstname: user?.firstname ?? "",
    lastname: user?.lastname ?? "",
    email: user?.email ?? "",
    password: "",
    phone: user?.phone ?? "",
  });
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    if (!user) return;
    setUserInfo((state) => ({
      ...state,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
    }));
  }, [user]);
  function setValues(newVal: string, val: string) {
    setUserInfo((state) => ({ ...state, [val]: newVal }));
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
      {
        main: "Phone number",
        secondary: userInfo.phone,
        value: "phone",
        setValues,
      },
    ].map((e) => <TwoLineInfo key={e.main} {...e} editMode={editMode} />)
  ) : (
    <h1>Loading</h1>
  );
  const [file, setFile] = React.useState<File | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  function handleEditClick() {
    if (editMode) {
      if (userInfo.password.length < 8) {
        message.error(
          { content: "Password must contain a minimum of 8 characters" },
          2,
          () => {
            return;
          }
        );
      } else {
        setEditMode((state) => !state);
        message.success(
          { content: "Success" },
          2,
          () => {
            return;
          }
        );
      }
      if (!user) return;
      if (file) {
        postImage(file).then((url) => {
          dispatch(patchUser({ ...userInfo, image: url })).then(() => {
            dispatch(getProfile());
          });
        });
      } else {
        dispatch(patchUser({ ...userInfo })).then(() => {
          dispatch(getProfile());
        });
      }
    } else {
      setEditMode((state) => !state);
    }
  }

  function handleSetFile(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setFile(target.files[0]);
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
        height: "100%",
      }}
    >
      {contextHolder}
      {editMode ? (
        <div>
          <label
            htmlFor={"inputFile"}
            className={styles.profilePhoto}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "0.5px solid grey",
            }}
          >
            <PlusOutlined />
          </label>
          <input
            type="file"
            id="inputFile"
            style={{ display: "none" }}
            onChange={handleSetFile}
          />
        </div>
      ) : (
        <img
          src={user?.image ?? "images/user.png"}
          alt="photo"
          className={styles.profilePhoto}
        />
      )}

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
          <div className="primary" style={{ marginTop: "10px" }}>
            {user?.firstname + " " + user?.lastname}
          </div>
        </div>
        <Star rating={user ? user.rating : 5}></Star>

        <hr />
        {editMode &&
        <div>
          {info}

          <hr className={styles.hr} />
        </div>}
      </div>

      {!editMode && (
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
      )}

      <hr className={styles.hr} />
      <div className={styles.buttonWrapper} style={{ marginTop: "10px" }}>
        {createPost && !editMode && (
          <Button
            type="primary"
            onClick={createPost}
            style={{ width: "100px" }}
          >
            Add post
          </Button>
        )}
      </div>
      <div className={styles.buttonWrapper} style={{ marginTop: "10px" }}>
        {editProfile && (
          <Button onClick={handleEditClick} style={{ width: "100px" }}>
            {editMode ? "Confirm" : "Edit profile"}
          </Button>
        )}
      </div>
      <div
        className={styles.buttonWrapper}
        style={{ marginTop: "60px", position: "relative", height: "100%" }}
      >
        {deleteProfile && !editMode && (
          <Button
            type="primary"
            onClick={() => {
              dispatch(deleteUser());
            }}
            danger
            style={{ width: "100px", position: "absolute", bottom: "1vh" }}
          >
            Delete user
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
