import React, { useEffect } from "react";
import styles from "./ProfilePage.module.css";
import {data,imagesData} from "../../data.js";
import PostList from "../../components/PostList/PostList";
import Card from "../../components/Cards";
import Header from "../../components/Header/Header";
import Modal from "../../components/Modals/Modal/Modal";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import PhotoModal from "../../components/Modals/PhotoModal/PhotoModal";
import CreatePost from "../../components/Modals/CreatePost/CreatePost";
import PostsModal from "../../components/Modals/PostsModal/PostsModal";
import { IRootState, useAppDispatch } from "../../store";
import { getProfile } from "../../store/auth/actionCreators";
import { useSelector } from "react-redux";
import { getMyListings } from "../../store/listings/actionCreators";
import { getListingImages } from "../../store/images/actionCreators";
import { getMyBuys, getMySells } from "../../store/orders/actionCreators";
import ExtendedCard from "./components/ExtendedCard/ExtendedCard";

interface IModal {
  posts: boolean;
  buys: boolean;
}
const ProfilePage = () => {
  const [createPostModal, setCreatePostModal] = React.useState(false);

  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(getMyListings());
    dispatch(getMySells());
    dispatch(getMyBuys());
  },[]);
  const myListings = useSelector((state: IRootState) => state.listings.myListings.listings)??[];
 
  const mySells = useSelector((state: IRootState) => state.orders.sells.listings)??[];

  const myBuys = useSelector((state: IRootState) => state.orders.buys.listings)??[];



  return (
    //style={{}}
    <div className={styles.profilePageWrapper}>
      <Header
        showTitle
        showSearch
        showMoney
        showInfo
      ></Header>
      <div style={{ display: "flex", marginTop: "20px" }}>
        <div className={styles.profileWrapper}>
        <ProfileInfo
            createPost={function (
              event: React.MouseEvent<Element, MouseEvent>
            ): void {
              setCreatePostModal((createPostModal) => !createPostModal);
            }}
          />
        </div>

        <div>
          <ExtendedCard listings={myListings} title={"Your products"}></ExtendedCard>
          <ExtendedCard listings={myBuys} title={"Your buys"}></ExtendedCard>
          <ExtendedCard listings={mySells} title={"Your sells"}></ExtendedCard>
        </div>
      </div>

      <CreatePost
        modal={createPostModal}
        setModal={setCreatePostModal}
        createPost={console.log}
      ></CreatePost>
    </div>
  );
};

export default ProfilePage;
