import React, { useEffect } from "react";
import { IListing, IListings } from "../../../../api/orders/types";
import styles from "../../ProfilePage.module.css"
import Card from "../../../../components/Cards/Card";
import PostsModal from "../../../../components/Modals/PostsModal/PostsModal";
import {data,imagesData} from "../../../../data.js";
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../../../../store";
import { getListingImages } from "../../../../store/images/actionCreators";

interface ExtendedCardProps{
    title:string;
    listings:IListings;
}

const ExtendedCard = ({title,listings}:ExtendedCardProps)=>{
    const [modal,setModal] = React.useState(false);

    // const listingId = listings.length?listings[0].id:null;
    const listingImages = useSelector((state: IRootState) => state.images);

    const listingsId = listings.map((listing)=>listing.id);
    // console.log(listings.length)
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(getListingImages({listingsId:listingsId}));
    },[listings]);

    function onPostsClick() {
        setModal((state) => (!state));
    }

    return <div className={styles.postsWrapper}>
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
    {
        listings.length && listingImages[listingsId[0]]?
    <Card posts = {listings[0]} images={listingImages[listingsId[0]].images}></Card>:<h1>Нет выставленных товаров</h1>
  }
  <PostsModal
        posts={listings}
        images={listingImages}
        modal={modal}
        setModal={onPostsClick}
        header={title}
      ></PostsModal>
  </div>
}

export default ExtendedCard;