import React, { useEffect } from "react";
import { IRootState, useAppDispatch } from "../../../../store";
import {
  deleteListing,
  deleteReview,
  getUsers,
} from "../../../../store/admin/actionCreators";
import { useSelector } from "react-redux";
import { IUser } from "../../../../api/admin/types";
import { Button, Card, Empty, Pagination } from "antd";
import { deleteUser } from "../../../../api/admin";
import { getUserListings } from "../../../../store/listings/actionCreators";
import PostsModal from "../../../../components/Modals/PostsModal/PostsModal";
import Loading from "../../../../components/Loading/Loading";
import { getListingImages } from "../../../../store/images/actionCreators";
import { getUserReviews } from "../../../../store/reviews/actionCreators";
import Modal from "../../../../components/Modals/Modal/Modal";
import { Modal as AntdModal } from "antd";
import { IReview } from "../../../../api/reviews/types";
import Star from "../../../../components/Star/Star";
import "../../../../index.css"
const AdminUsersPage = () => {
  const dispatch = useAppDispatch();

  const users = useSelector((state: IRootState) => state.admin.usersData.users);
  const usersToDisplay = users?.userResponseList.filter(
    (user: IUser) => user.role !== "ADMIN"
  );
  const [currentUser, setCurrentUser] = React.useState<number | null>(null);
  const posts = useSelector((state: IRootState) => state.listings.userListings);
  const images = useSelector((state: IRootState) => state.images);
  const reviews = useSelector((state: IRootState) => state.reviews.userReviews);

  const [postsModal, setPostsModal] = React.useState(false);
  const [reviewsModal, setReviewsModal] = React.useState(false);
  const limit = 10;
  const [offset, setOffset] = React.useState({
    users: 0,
    products: 0,
    reviews: 0,
  });

  useEffect(() => {
    dispatch(getUsers({ offset: offset.users, limit }));
  }, [offset.users]);

  const userCard = (e: IUser | undefined) => {
    if (!e) return <></>;
    return (
      <Card
        style={{ margin: "20px" }}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {e.image ? (
              <img
                src={e.image}
                alt=""
                height={"30px"}
                style={{ borderRadius: "30px" }}
              />
            ) : (
              <img src={"/images/user.png"} height={"30px"} />
            )}
            <h3>{e.firstname + " " + e.lastname}</h3>
          </div>
        }
        key={e.id}
      >
        <p>Email: {<b>{e.email}</b>}</p>
        <p>Registration date: {<b>{e.registrationDate}</b>}</p>
        <p>Balance: {<b>{e.balance}</b>}</p>
        <p>Rating: {<b>{e.rating ?? 0}</b>}</p>
        <div style={{ display: "flex", gap: "20px", marginTop: "40px" }}>
          <Button
            type="primary"
            onClick={() => {
              handleViewProducts(e.id);
            }}
          >
            Products
          </Button>
          <Button type={"primary"} onClick={() => handleViewReviews(e.id)}>
            Reviews
          </Button>
          <Button danger onClick={() => handleDeleteUser(e.id)}>
            Block this user
          </Button>
        </div>
      </Card>
    );
  };
  function handleDeleteUser(id: number) {
    deleteUser({ userId: id }).then(() => {
      dispatch(getUsers({ offset: offset.users, limit }));
    });
  }
  function handleViewProducts(id: number) {
    dispatch(
      getUserListings({
        userId: id,
        offset: offset.reviews,
        limit,
      })
    );
    setCurrentUser(id);
    setOffset((state) => ({ ...state, products: 0 }));
    setPostsModal(true);
  }
  function handleViewReviews(id: number) {
    dispatch(
      getUserReviews({
        sellerId: id,
        offset: offset.reviews,
        limit,
      })
    );
    setCurrentUser(id);
    setOffset((state) => ({ ...state, reviews: 0 }));
    setReviewsModal(true);
  }
  useEffect(() => {
    if (!currentUser) return;
    const listingId = posts[currentUser]?.listings?.listingResponseList.map(
      (e) => e.id
    );
    dispatch(getListingImages({ listingId: listingId ?? [] }));
  }, [posts]);
  return (
    <div>
      {usersToDisplay?.length ? (
        usersToDisplay.map(userCard)
      ) : (
        <div>No users</div>
      )}
      <>
        {postsModal &&
          ((posts && posts[currentUser]?.error) ??
            (!posts[currentUser] || posts[currentUser]?.isLoading ? (
              <Loading />
            ) : (
              <PostsModal
                posts={posts[currentUser].listings?.listingResponseList}
                images={images}
                modal={postsModal}
                setModal={setPostsModal}
                header={
                  "Products of " +
                  users?.userResponseList.find(
                    (user) => user.id === currentUser
                  )?.email
                }
                handleDeletePost={(id: number) => {
                  dispatch(deleteListing({ listingId: id })).then(() => {
                    dispatch(getUserListings({ userId: currentUser }));
                  });
                }}
                setOffset={(page) => {
                  setOffset((state) => ({ ...state, products: page }));
                }}
                totalPages={(posts[currentUser]?.listings.totalPages??0)*10}
              />
            )))}
      </>
      <>
        {reviewsModal &&
          ((reviews && reviews[currentUser]?.error) ??
            (!currentUser || !reviews || reviews[currentUser]?.isLoading ? (
              <Loading />
            ) : (
              <Modal
                modal={reviewsModal}
                setModal={setReviewsModal} // header={
              >
                <div>
                  <h1>Reviews</h1>
                  <br />

                  {(reviews[currentUser]?.reviews?.reviewResponseList?.length ??
                    0) > 0 ? (
                    reviews[currentUser]?.reviews?.reviewResponseList.map(
                      (e: IReview) => (
                        <Card
                          key={e.id}
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

                                <Button
                                  danger
                                  onClick={() => {
                                    dispatch(deleteReview({ reviewId: e.id }));
                                  }}
                                >
                                  {" "}
                                  Delete
                                </Button>
                              </div>
                            </div>
                          }
                        >
                          <p>Text: {<b>{e.text}</b>}</p>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            Rating: <Star rating={e.rating} />
                          </div>
                        </Card>
                      )
                    )
                  ) : (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      imageStyle={{ width: "20vw", height: "20vw" }}
                      description={
                        <div style={{ fontSize: "20px" }}>No data</div>
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    />
                  )}
                  {}
                </div>
                <Pagination
                  onChange={(page) => setOffset(page)}
                  defaultCurrent={1}
                  total={(reviews[currentUser].reviews?.totalPages??0)*10}
                  className="pagination2"
                />
              </Modal>
            )))}
      </>
      <Pagination
        onChange={(page) => {
          setOffset((state) => ({ ...state, users: page - 1 }));
        }}
        defaultCurrent={1}
        total={(users?.totalPages ?? 0)*10}
        className="pagination"
      />
    </div>
  );
};

export default AdminUsersPage;
