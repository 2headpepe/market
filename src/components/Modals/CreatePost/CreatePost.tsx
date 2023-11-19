import styles from "./CreatePost.module.css";
import { Button, Form, Input, Select } from "antd";
import UploadPhoto from "../../UploadPhoto/UploadPhoto";
import Modal from "../Modal/Modal";
import ModalProps from "../ModalTypes";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../../../store";
import { ICategory } from "../../../api/category/types";
import { getCategories } from "../../../store/category/actionCreators";
import { createListing, getMyListings } from "../../../store/listings/actionCreators";


const CreatePost = (props: ModalProps) => {
  const [photoModal, setPhotoModal] = React.useState(false);
  const [value, setValue] = React.useState<any>("");
  const categories = useSelector((state: IRootState) => state.category.categoriesData.categories);

  const categoryOptions = categories ? categories.map((e: ICategory) => ({
    value: e.id.toString(),
    label: e.name,
  })) : [{ value: '0', label: '...Choose...' }];

  const [categoryId, setCategoryId] = React.useState(categoryOptions[0].value);

  const onChangeCategory = (
    selected: { value: string; label: string } | null
  ) => {
    setCategoryId(selected!.value);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  function goToSecondStep(values: any) {
    setValue(values);
    props.setModal(false);
    setPhotoModal(true);
  }

  function finish() {
    setPhotoModal(false);

    dispatch(createListing({...value,categoryId:+categoryId,price:+value.price})).then(()=>{
      dispatch(getMyListings());
    })
  }

  return (
    <>
      <Modal {...props}>
        <div className={styles.createPostWrapper}>
          <h1>Create post</h1>

          <Form onFinish={goToSecondStep}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input title" }]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              label="Description"
              name="text"
            >
              <Input></Input>
            </Form.Item>
            <Form.Item label="Category">
              <Select
                options={categoryOptions}
                defaultValue={categoryOptions[0]}
                onChange={onChangeCategory}

                className={styles.filterSelect}
                id="filterSelect"

              />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
            >
              <Input></Input>
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
            >
              Next
            </Button>
          </Form>


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
