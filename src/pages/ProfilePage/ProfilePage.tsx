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
import { IPaginationOrders } from "../../api/orders/types";
import Loading from "../../components/Loading/Loading";
import PostsModal from "../../components/Modals/PostsModal/PostsModal";
import { getListingImages } from "../../store/images/actionCreators";
const posts = [
  "Your products",
  "Your approved sells",
  "Your disapproved sells",
  "Your sells waiting for approve",
  "Your approved buys",
  "Your disapproved buys",
  "Your buys waiting for approve",
];

const methods = [
  getMyListings,
  getApprovedSells,
  getDisapprovedSells,
  getActiveSells,
  getApprovedBuys,
  getDisapprovedBuys,
  getActiveBuys,
];
const ProfilePage = () => {
  const [createPostModal, setCreatePostModal] = React.useState(false);
  const [currentPosts, setCurrentPosts] = React.useState<number>(-1);
  const [postsModal, setPostsModal] = React.useState(false);

  const limit = 10;

  const [offset, setOffset] = React.useState(Array(7).fill(0));
  const dispatch = useAppDispatch();

  const images = useSelector((state: IRootState) => state.images);

  const myListings = useSelector(
    (state: IRootState) => state.listings.myListings
  );

  const myApprovedBuys = useSelector(
    (state: IRootState) => state.orders.approvedBuys
  );
  const myApprovedSells = useSelector(
    (state: IRootState) => state.orders.approvedSells
  );
  const myDisapprovedBuys = useSelector(
    (state: IRootState) => state.orders.disapprovedBuys
  );
  const myDisapprovedSells = useSelector(
    (state: IRootState) => state.orders.disapprovedSells
  );
  const myActiveBuys = useSelector(
    (state: IRootState) => state.orders.activeBuys
  );
  const myActiveSells = useSelector(
    (state: IRootState) => state.orders.activeSells
  );
  useEffect(() => {
    dispatch(
      methods[currentPosts + 1]({ offset: offset[currentPosts + 1], limit })
    );
  }, [currentPosts]);

  useEffect(() => {
    const listingId = (
      currentPosts !== -1 ? list[currentPosts] : myListings
    )?.listings?.listingResponseList.map((e) => e.id);
    console.log(listingId ?? "12312");
    dispatch(getListingImages({ listingId: listingId ?? [] }));
  }, [
    myListings,
    myApprovedBuys,
    myApprovedSells,
    myDisapprovedBuys,
    myDisapprovedSells,
    myActiveBuys,
    myActiveSells,
  ]);

  function parseOrders(
    data: {
      listings: IPaginationOrders | null;
      isLoading: boolean;
      error: string | null;
    } | null
  ):
    | {
        listings: IPaginationListings | null;
        isLoading: boolean;
        error: string | null;
      }
    | undefined {
    if (!data) return undefined;
    if (!data.listings) {
      return {
        isLoading: data.isLoading,
        error: data.error,
        listings: null,
      };
    }
    return {
      ...data,
      listings: {
        totalPages: data.listings.totalPages,
        listingResponseList: data.listings.orderResponseList.map((order) => ({
          id: order.listingId,
          title: order.listingTitle,
          text: order.listingText,
          categoryId: order.listingCategoryId,
          price: order.sum,
          postDate: order.listingPostDate,
          sold: order.listingSold,
          userId: order.sellerId,
          orderId: order.id,
        })),
      },
    };
  }
  const list = [
    // myListings,
    parseOrders(myApprovedSells),
    parseOrders(myDisapprovedSells),
    parseOrders(myActiveSells),
    parseOrders(myApprovedBuys),
    parseOrders(myDisapprovedBuys),
    parseOrders(myActiveBuys),
  ];

  console.log(currentPosts,list[currentPosts]!)
    return (
    <div className={styles.profilePageWrapper}>
      <Header showTitle showSearch showMoney showInfo></Header>
      <div className={styles.profileWrapper}>
        <ProfileInfo
          createPost={() => {
            setCreatePostModal((createPostModal) => !createPostModal);
          }}
          setCurrentPosts={setCurrentPosts}
          currentPosts={currentPosts}
          posts={posts}
          editProfile
        />
      </div>

      <div className={styles.posts}>
        {list[currentPosts]?.error ??
          ((currentPosts === -1 &&
            (!myListings || list[currentPosts]?.isLoading)) ||
          (currentPosts !== -1 &&
            (!list[currentPosts] || list[currentPosts]?.isLoading)) ? (
            <Loading />
          ) : (
            <ExtendedCard
              listings={
                currentPosts !== -1
                  ? list[currentPosts]!.listings?.listingResponseList
                  : myListings?.listings?.listingResponseList
              }
              title={posts[currentPosts + 1]}
              currentPosts={currentPosts}
              setModal={setPostsModal}
            ></ExtendedCard>
          ))}
      </div>
      <PostsModal
        posts={
          currentPosts !== -1
            ? list[currentPosts]!.listings?.listingResponseList
            : myListings?.listings?.listingResponseList
        }
        images={images}
        modal={postsModal}
        setModal={() => setPostsModal((state: boolean) => !state)}
        header={posts[currentPosts + 1]}
        currentPosts={currentPosts}
      ></PostsModal>
      <CreatePost
        modal={createPostModal}
        setModal={setCreatePostModal}
      ></CreatePost>
    </div>
  );
};

export default ProfilePage;
