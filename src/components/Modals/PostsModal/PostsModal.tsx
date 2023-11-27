import React from "react";
import Modal from "../Modal/Modal";
import ModalProps from "../ModalTypes";
import PostList from "../../PostList/PostList";
import { ImagesState } from "../../../store/images/imagesReducer";
import { IListings } from "../../../api/listings/types";

interface PostsModalProps extends ModalProps {
  posts: IListings|undefined;
  header?: string;
  images:ImagesState;
  currentPosts:number;
}

const PostsModal = (props: PostsModalProps) => {
  return (
    <Modal
      modal={props.modal}
      setModal={props.setModal}
    >
      <div>{props.header && <h1>{props.header}</h1>}</div>
      <hr />
      <PostList posts={props.posts} images={props.images} currentPosts={props.currentPosts}></PostList>
    </Modal>
  );
};

export default PostsModal;
