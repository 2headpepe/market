import React, { useEffect } from "react";
import styles from "../../ProfilePage.module.css";
import Card from "../../../../components/Cards/Card";
import PostsModal from "../../../../components/Modals/PostsModal/PostsModal";
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../../../../store";
import { getListingImages } from "../../../../store/images/actionCreators";
import { IListings } from "../../../../api/listings/types";

interface ExtendedCardProps {
  title: string;
  listings: IListings | undefined;
  currentPosts: number;
  setModal: Function;
}

import Loading from "../../../../components/Loading/Loading";
import { Empty } from "antd";
import { current } from "@reduxjs/toolkit";

const ExtendedCard = ({
  title,
  listings,
  currentPosts,
  setModal,
}: ExtendedCardProps) => {
  const listingImages = useSelector((state: IRootState) => state.images);

  const listingsId = listings ? listings.map((listing) => listing.id) : null;

  function onPostsClick() {
    setModal((state) => !state);
  }

  console.log('extend',listings && listings.length )
  return (
    <>
      {listings && listingsId !== null ? (
        <div className={styles.postsWrapper}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h2>{title}</h2>
            <div
              className={`secondary`}
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={onPostsClick}
            >
              Show more
            </div>
          </div>
          <hr />
          {listings && listings.length ? (
            <Card
              listingId={listingsId[0]}
              posts={listings[0]}
              images={listingImages[listingsId[0]]?.images?.map((e) => e.path)}
              currentPosts={currentPosts}
            ></Card>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              imageStyle={{ width: "20vw", height: "20vw" }}
              description={<div style={{ fontSize: "20px" }}>No data</div>}
            />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
  return;
};

export default ExtendedCard;
