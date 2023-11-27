import Card from "../Cards";
import styles from "./PostList.module.css";
import { ImagesState } from "../../store/images/imagesReducer";
import Loading from "../Loading/Loading";
import { IListing } from "../../api/listings/types";

export interface PostListProps {
  posts:
    IListing[]|undefined;
  images: ImagesState;
  currentPosts:number;
}

const PostList = ({ posts, images, currentPosts}: PostListProps) => {
  return (
    <div className={styles.listWrapper}>
      {posts && posts.length > 0 ? (
        posts.map((e) => {
          return (
            <>
                <div className={styles.postWrapper} key={e.id}>
                  <Card
                    posts={e}
                    images={images[e.id]?.images?.map((img) => img.path)}
                    listingId={e.id}
                    currentPosts={currentPosts}
                  ></Card>
                </div>
            </>
          );
        })
      ) : (
        <div>Нет постов</div>
      )}
    </div>
  );
};

export default PostList;
