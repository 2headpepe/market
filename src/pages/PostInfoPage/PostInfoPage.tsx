import { Button, Card, Empty, Pagination } from "antd";
import { Modal as AntdModal } from "antd";
import React, { useEffect } from "react";
import ShowPhoto from "../../components/ShowPhoto/ShowPhoto";
import styles from "./PostInfoPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import CategoryBadge from "../../components/CategoryBadge/CategoryBadge";
import Header from "../../components/Header/Header";
import { IRootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { getListingImages } from "../../store/images/actionCreators";
import { getCategory } from "../../store/category/actionCreators";
import { getUser } from "../../store/user/actionCreators";
// import Modal from "../../components/Modals/Modal/Modal";
import { DownCircleFilled, UpCircleFilled } from "@ant-design/icons";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import { buyListing, getListing } from "../../store/listings/actionCreators";
import { getActiveBuys } from "../../store/orders/actionCreators";
import Modal from "../../components/Modals/Modal/Modal";
import Loading from "../../components/Loading/Loading";
import { getUserReviews } from "../../store/reviews/actionCreators";
import Star from "../../components/Star/Star";

const PostInfoPage = () => {
  const id = useParams().postId;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [sellerInfoModal, setSellerInfoModal] = React.useState(false);
  const [successBuyOpen, setSuccessBuyOpen] = React.useState(false);
  const [reviewsModal, setReviewsModal] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const limit = 10;
  useEffect(() => {
    if (id) dispatch(getListing({ id: +id }));
  }, [id]);

  const post = useSelector((state: IRootState) => state.listings.singleListing);
  const images = useSelector((state: IRootState) =>
    id && state.images[id]?.images ? state.images[id].images : null
  );
  const category = useSelector(
    (state: IRootState) => state.category.singleCategory
  );

  const sellerInfo = useSelector((state: IRootState) => state.user.userData);
  useEffect(() => {
    if (!post.error && !post.isLoading && post.listing && id) {

      dispatch(getCategory({ categoryId: post.listing.categoryId }));
      dispatch(getUser({ id: post.listing.userId }));
      dispatch(getListingImages({ listingId: [+id] }));
      dispatch(
        getUserReviews({
          sellerId: post.listing.userId,
          offset,
          limit,
        })
      );
    }
  }, [post]);
  const reviews = useSelector((state: IRootState) => state.reviews.userReviews);
  if (post.error) {
    return <h1>Error</h1>;
  }

  function handleViewInfo() {
    setSellerInfoModal((state) => !state);
  }

  function handleBuy() {
    dispatch(buyListing({ id: post.listing!.id })).then(() => {
      dispatch(getActiveBuys());
    });
    setSuccessBuyOpen(true);
  }

  if (!id) {
    return <div>Error</div>;
  }
  return (
    <div className={styles.postInfoPageWrapper}>
      <Header></Header>

      {post.listing && images ? (
        <div>
          <div className={styles.mainWrapper}>
            <div>
              <ShowPhoto
                height={"40vw"}
                width={"40vw"}
                images={images.map((e) => e.path)}
              ></ShowPhoto>
            </div>

            <div className={styles.infoWrapper}>
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
                <p className="Card--dates">
                  {post.isLoading
                    ? "Loading"
                    : new Date(post.listing!.postDate).toDateString()}
                </p>

                <h3 className="Card--name">
                  {post.isLoading ? "Loading" : post.listing!.title}
                </h3>
                <p className="Card--text">
                  {post.isLoading ? "Loading" : post.listing!.text}
                </p>
                <h4 className="Card--price">
                  {post.isLoading ? "Loading" : post.listing!.price + "$"}
                </h4>
              </div>

              <Button type="primary" onClick={() => handleBuy()}>
                Buy
              </Button>
              {/* <hr /> */}
            </div>
          </div>

          <Modal
            modal={sellerInfoModal}
            setModal={setSellerInfoModal}
            // position={{ position: "absolute", right: "10vw", top: "40vh" }}
          >
            <div style={{ width: "15vw", minWidth: "300px" }}>
              {/* <p>Seller Info</p> */}
              <ProfileInfo
                editProfile={false}
                id={post.isLoading ? null : post.listing!.userId}
                openListings={() => {
                  setSellerInfoModal(false);
                  setReviewsModal(true);
                }}
              />
            </div>
          </Modal>
          <Modal
            modal={reviewsModal}
            setModal={setReviewsModal} // header={
            // position={{ position: "absolute", right: "10vw", top: "40vh" }}
          >
            <div>
              <h1>Reviews</h1>
              <br />

              {(reviews[post.listing.userId]?.reviews?.reviewResponseList
                ?.length ?? 0) > 0 ? (
                <div>
                  {reviews[
                    post.listing.userId
                  ]?.reviews?.reviewResponseList.map((e: IReview) => (
                    <Card
                      style={{
                        margin: "20px",
                        width: "40vh",
                        border: "1px solid grey",
                      }}
                      title={
                        <div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginTop: "20px",
                            }}
                          >
                            <>Review: {e.id}</>
                          </div>
                        </div>
                      }
                    >
                      <p>Text: {<b>{e.text}</b>}</p>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        Rating: <Star rating={e.rating} />
                      </div>
                    </Card>
                  ))}
                  <Pagination
                    onChange={(page) => {
                      setOffset(page - 1);
                    }}
                    defaultCurrent={1}
                    total={(reviews[post.listing.userId]?.reviews?.totalPages??1)*10}
                    className="pagination2"
                  />
                </div>
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  imageStyle={{ width: "20vw", height: "20vw" }}
                  description={<div style={{ fontSize: "20px" }}>No data</div>}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                />
              )}
              {}
            </div>
          </Modal>
          <AntdModal
            title={"Success buy: " + post.listing.title}
            open={successBuyOpen}
            onOk={() => {
              setSuccessBuyOpen(false);
              navigate("/");
            }}
            footer={(_, { OkBtn }) => <OkBtn />}
          >
            <p>Now you can meet with the seller {sellerInfo.profile?.rating} and receive the goods</p>
          </AntdModal>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default PostInfoPage;
