import styles from "./CreatePost.module.css";
import { Button, Form, Input, Select } from "antd";
import UploadPhoto from "../../UploadPhoto/UploadPhoto";
import Modal from "../Modal/Modal";
import ModalProps from "../ModalTypes";
import PhotoModal from "../PhotoModal/PhotoModal";
import React from "react";

interface CreatePostProps extends ModalProps {
  createPost: Function;
}

const CreatePost = (props: CreatePostProps) => {
  const [photoModal, setPhotoModal] = React.useState(false);
  const [value, setValue] = React.useState("");

  function goToSecondStep() {
    props.setModal(false);
    setPhotoModal(true);
  }

  function finish() {
    setPhotoModal(false);
    props.createPost(value);
  }

  return (
    <>
      <Modal {...props}>
        <div className={styles.createPostWrapper}>
          <h1>Create post</h1>

          <Form>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input title" }]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
            >
              <Input></Input>
            </Form.Item>
            <Form.Item label="Category">
              <Select
                options={[
                  {
                    value: 1,
                    label: 1,
                  },
                  {
                    value: 2,
                    label: 2,
                  },
                  {
                    value: 3,
                    label: 3,
                  },
                  {
                    value: 4,
                    label: 4,
                  },
                  {
                    value: 5,
                    label: 5,
                  },
                ]}
              ></Select>
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
            >
              <Input></Input>
            </Form.Item>
          </Form>

          <Button
            type="primary"
            onClick={goToSecondStep}
          >
            Next
          </Button>
        </div>
      </Modal>
      <Modal
        modal={photoModal}
        setModal={setPhotoModal}
      >
        <div className={styles.createPostWrapper}>
          <h1>Upload photo</h1>
          <hr />
          <UploadPhoto></UploadPhoto>
          <hr />
          <Button
            type="primary"
            onClick={finish}
          >
            Create post
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CreatePost;
