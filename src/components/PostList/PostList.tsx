import Card from "../Cards";
import styles from "./PostList.module.css";
import { ImagesState } from "../../store/images/imagesReducer";
import { IListing } from "../../api/listings/types";
import { Empty } from "antd";

export interface PostListProps {
  posts: IListing[] | undefined;
  images: ImagesState;
  currentPosts?: number;
  handleDeletePost?: Function;
}

const PostList = ({
  posts,
  images,
  currentPosts,
  handleDeletePost,
}: PostListProps) => {
  return (
    <div>
      {posts && posts.length > 0 ? (
        <div className={styles.listWrapper}>
          {posts.map((e) => {
            return (
              <div className={styles.postWrapper} key={e.id}>
                <Card
                  posts={e}
                  images={images[e.id]?.images?.map((img) => img.path)}
                  listingId={e.id}
                  currentPosts={currentPosts}
                  handleDeletePost={handleDeletePost}
                ></Card>
              </div>
            );
          })}
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
    </div>
  );
};

export default PostList;
