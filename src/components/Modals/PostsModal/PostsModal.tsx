import React from "react";
import Modal from "../Modal/Modal";
import ModalProps from "../ModalTypes";
import PostList from "../../PostList/PostList";
import { ImagesState } from "../../../store/images/imagesReducer";
import { IListings } from "../../../api/listings/types";
import { Pagination } from "antd";

interface PostsModalProps extends ModalProps {
  posts: IListings | undefined;
  header?: string;
  images: ImagesState;
  currentPosts?: number;
  handleDeletePost?: Function;
  setOffset: Function;
  totalPages: number;
}

const PostsModal = (props: PostsModalProps) => {
  return (
    <Modal modal={props.modal} setModal={props.setModal} height="90vh">
      <div>{props.header && <h1>{props.header}</h1>}</div>
      <hr />
      <PostList
        posts={props.posts}
        images={props.images}
        currentPosts={props.currentPosts}
        handleDeletePost={props.handleDeletePost}
      ></PostList>
      <Pagination
        onChange={(page) => props.setOffset(page)}
        defaultCurrent={1}
        total={props.totalPages}
        className="pagination2"
      />
    </Modal>
  );
};

export default PostsModal;
