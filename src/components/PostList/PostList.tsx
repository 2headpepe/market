import React from "react";
import Card from "../Cards";
import styles from "./PostList.module.css";
import { imagesData } from "../../data";
import { ImagesState } from "../../store/images/imagesReducer";

export interface PostListProps {
  posts: {
    id: number;
    userId: number;
    title: string;
    city: string;
    postDate: string;
    text: string;
    price: number;
  }[];
  images: ImagesState;
}

const PostList = ({ posts,images }: PostListProps) => {

  // console.log(posts);
  return (
    <div className={styles.listWrapper}>
      {posts.length > 0 ? (
        posts.map((e) => {
          return <div className={styles.postWrapper} key={e.id}>
            <Card posts = {e} images = {images[e.id]?images[e.id].images:null}></Card>
          </div>
        })
      ) : (
        <div>Нет постов</div>
      )}
    </div>
  );
};

export default PostList;
