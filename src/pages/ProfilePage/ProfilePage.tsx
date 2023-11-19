import React, { useEffect } from "react";
import styles from "./ProfilePage.module.css";
import Header from "../../components/Header/Header";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import CreatePost from "../../components/Modals/CreatePost/CreatePost";
import { IRootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { getMyListings } from "../../store/listings/actionCreators";
import ExtendedCard from "./components/ExtendedCard/ExtendedCard";
import {
  getActiveBuys,
  getActiveSells,
  getApprovedBuys,
  getApprovedSells,
  getDisapprovedBuys,
  getDisapprovedSells,
} from "../../store/orders/actionCreators";
import { IPaginationListings } from "../../api/listings/types";
import { useParams } from "react-router";

const limit = 10;

const ProfilePage = () => {
  const [createPostModal, setCreatePostModal] = React.useState(false);

  const [pagination, setPagination] = React.useState({
    myListings: {
      offset: 0,
    },
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMyListings({ offset: pagination.myListings.offset, limit }));

    dispatch(getApprovedBuys());
    dispatch(getApprovedSells());
    dispatch(getDisapprovedBuys());
    dispatch(getDisapprovedSells());
    dispatch(getActiveBuys());
    dispatch(getActiveSells());
  }, []);
  const myListings: IPaginationListings = useSelector(
    (state: IRootState) => state.listings.myListings.listings ?? []
  );

  const myApprovedBuys =
    useSelector((state: IRootState) => state.orders.approvedBuys.listings);
  const myApprovedSells =
    useSelector((state: IRootState) => state.orders.approvedSells.listings);
  const myDisapprovedBuys =
    useSelector((state: IRootState) => state.orders.disapprovedBuys.listings);
  const myDisapprovedSells =
    useSelector((state: IRootState) => state.orders.disapprovedBuys.listings);
  const myActiveBuys =
    useSelector((state: IRootState) => state.orders.activeBuys.listings);
  const myActiveSells =
    useSelector((state: IRootState) => state.orders.activeBuys.listings);

  // const list = [
  //   "Listings",
  //   "Approved",
  //   "Disapproved",
  //   "Waiting for approve",
  //   "Approved",
  //   "Disapproved",
  //   "Waiting for approve",
  // ];
  // const list = [
  //   myListings.listingResponseList,
  //   myApprovedBuys?.orderResponseList,
  //   myDisapprovedBuys?.orderResponseList,
  //   myActiveBuys?.orderResponseList,
  //   myApprovedSells?.orderResponseList,
  //   myDisapprovedSells?.orderResponseList,
  //   myActiveSells?.orderResponseList,
  // ];

  const [active, setActive] = React.useState(0);

  return (
    <div className={styles.profilePageWrapper}>
      <Header showTitle showSearch showMoney showInfo></Header>
      <div style={{ display: "flex", marginTop: "20px" }}>
        <div className={styles.profileWrapper}>
          <ProfileInfo
            createPost={() => {
              setCreatePostModal((createPostModal) => !createPostModal);
            }}
          />
        </div>

        <div>
          <ExtendedCard
            listings={myListings.listingResponseList}
            title={"Your products"}
          ></ExtendedCard>
          {/* <ExtendedCard listings={myBuys} title={"Your buys"}></ExtendedCard> */}
          {/* <ExtendedCard listings={mySells} title={"Your sells"}></ExtendedCard> */}
        </div>
      </div>

      <CreatePost
        modal={createPostModal}
        setModal={setCreatePostModal}
      ></CreatePost>
    </div>
  );
};

export default ProfilePage;
