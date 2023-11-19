import React from "react";
import Modal from "../Modal/Modal";
import ModalProps from "../ModalTypes";
import PostList, { PostListProps } from "../../PostList/PostList";
import { ImagesState } from "../../../store/images/imagesReducer";
import { IListings } from "../../../api/listings/types";

interface PostsModalProps extends ModalProps {
  posts: IListings|null;
  header?: string;
  images:ImagesState;
}

const PostsModal = (props: PostsModalProps) => {
  return (
    <Modal
      modal={props.modal}
      setModal={props.setModal}
    >
      <div>{props.header && <h1>{props.header}</h1>}</div>
      <hr />
      <PostList posts={props.posts} images={props.images}></PostList>
    </Modal>
  );
};

export default PostsModal;
