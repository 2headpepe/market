import { Button } from "antd";
import React, { useEffect } from "react";
import ShowPhoto from "../../components/ShowPhoto/ShowPhoto";
import styles from "./PostInfoPage.module.css";
import { useParams } from "react-router-dom";
import CategoryBadge from "../../components/CategoryBadge/CategoryBadge";
import Header from "../../components/Header/Header";
import { IRootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { getListingImages } from "../../store/images/actionCreators";
import { getCategory } from "../../store/category/actionCreators";
import {getProfile, getUser } from "../../store/user/actionCreators";
import Modal from "../../components/Modals/Modal/Modal";
import {
  DownCircleFilled,
  DownOutlined,
  UpCircleFilled,
} from "@ant-design/icons";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import { buyListing, getListing } from "../../store/listings/actionCreators";
interface IPostRequest {
  images: string[];
  id: number;
  userId: number;
  title: string;
  text: string;
  categoryId: string;
  price: number;
  city: string;
  postDate: string;
  sold: boolean;
}
const category = [
  "Home",
  "Services",
  "Electronics",
  "Clothes",
  "Health and beauty",
];

const PostInfoPage = () => {
  const id = useParams().postId;
  if (!id) {
    return <div>Error</div>;
  }
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getListing({ id: +id }));
  }, [id]);

  const post = useSelector(
    (state: IRootState) => state.listings.singleListing
  );
  const images = useSelector((state: IRootState) => state.images[id]);

  const category = useSelector(
    (state: IRootState) => state.category.singleCategory
  );

  const sellerInfo = useSelector((state: IRootState) => state.user.userData);

  if(post.error){
    return <h1>Error</h1>
  }

  useEffect(() => {
    if (!post.error && !post.isLoading && post.listing) {
      console.log("Log from useEffect category,user,images: ", post?.listing, sellerInfo, id)
      dispatch(getCategory({ categoryId: post.listing.categoryId }));
      dispatch(getUser({ id: post.listing.userId }));
      dispatch(getListingImages({ listingsId: [+id] }));
    }
  }, [post?.listing]);
  const [sellerInfoModal, setSellerInfoModal] = React.useState(false);

  function handleViewInfo() {
    setSellerInfoModal((state) => !state);
  }

  function handleBuy(){
    dispatch(buyListing({id:post.listing!.id}));
  }
  // useEffect(() => {
  //   if (!post.error && !post.isLoading && post.listing) {
  //     dispatch(getUser({ id: post.listing.userId }));
  //   }
  // }, [sellerInfoModal]);

  return post.listing ? (
    <div className={styles.postInfoPageWrapper}>
      <Header></Header>

      <div className={styles.mainWrapper}>
        <div>
          <ShowPhoto
            height={"40vw"}
            width={"40vw"}
            images={images?.error ?? (!images || images.isLoading)?"Loading":images?.images}
          ></ShowPhoto>
        </div>

        <div className={styles.infoWrapper}>
          {/* <Link to={"/"}>
          <div className="secondary">Get back</div>
        </Link> */}
          <div className={styles.headerWrapper}>
            <CategoryBadge width={"200px"} height={"40px"} id={0}>
              {category?.error ??
                (category?.category?.name
                  ? category?.category?.name
                  : "loading")}
            </CategoryBadge>
            {/* <Link to="/profile"> */}
            <div className={styles.sellerInfo} onClick={handleViewInfo}>
              <CategoryBadge width={"200px"} height={"40px"} id={3}>
                <div style={{ marginRight: "10px" }}>
                  {sellerInfo.error ??
                    (sellerInfo?.profile
                      ? sellerInfo?.profile.email
                      : "Loading")}
                </div>
              </CategoryBadge>
              {/* <DownOutlined color=""/> */}
              {sellerInfoModal ? (
                <UpCircleFilled style={{ fontSize: "30px" }} />
              ) : (
                <DownCircleFilled style={{ fontSize: "30px" }} />
              )}
            </div>
            {/* </Link> */}
          </div>
          <div
            className="Card--info-wrapper "
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <p className="Card--dates">{post.isLoading?"Loading":post.listing!.postDate}</p>

            <h3 className="Card--name">{post.isLoading?"Loading":post.listing!.title}</h3>
            <p className="Card--text">{post.isLoading?"Loading":post.listing!.text}</p>
            <h4 className="Card--price">{post.isLoading?"Loading":post.listing!.price + "$"}</h4>
          </div>

          <Button type="primary" onClick={handleBuy}>
            Buy
          </Button>
          {/* <hr /> */}
        </div>
      </div>
      <Modal
        modal={sellerInfoModal}
        setModal={setSellerInfoModal}
        position={{ position: "absolute", right: "10vw", top: "40vh" }}
      >
        <div style={{ width: "15vw", minWidth: "300px" }}>
          {/* <p>Seller Info</p> */}
          <ProfileInfo editProfile={false} id={post.isLoading?null:post.listing!.userId} />
        </div>
      </Modal>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default PostInfoPage;
