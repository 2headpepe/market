import styles from "./CreatePost.module.css";
import { Button, Form, Input, Select } from "antd";
import Modal from "../Modal/Modal";
import ModalProps from "../ModalTypes";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../../../store";
import { ICategory } from "../../../api/category/types";
import { getCategories } from "../../../store/category/actionCreators";
import { createListing } from "../../../store/listings/actionCreators";
import Loading from "../../Loading/Loading";

interface IPostInfo {
  title: string;
  text: string;
  categoryId: number;
  price: number;
}

const CreatePost = (props: ModalProps & { offset: number; limit: number }) => {
  const [photoModal, setPhotoModal] = React.useState(false);
  const [postInfo, setPostInfo] = React.useState<IPostInfo | null>(null);

  const categories = useSelector(
    (state: IRootState) => state.category.categoriesData
  );
  const categoryOptions = categories?.categories?.map((e: ICategory) => ({
    value: e.id.toString(),
    label: e.name,
  }));

  const [categoryId, setCategoryId] = React.useState("");

  const onChangeCategory = (selected: string | null) => {
    console.log(selected)
    setCategoryId(selected!);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  function goToSecondStep(values: IPostInfo) {
    setPostInfo(values);
    props.setModal(false);
    setPhotoModal(true);
  }
  const [input, setInput] = React.useState<File[]>([]);
  function handleFileChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement & {
      files: FileList;
    };
    setInput([]);
    for (let i = 0; i < target.files.length; i++) {
      const file = target.files.item(i);
      if (file) {
        setInput((state) => [...state, file]);
      }
    }
  }

  function finish() {
    setPhotoModal(false);
    if(!categoryOptions) return;
    if(categoryId===''){
      setCategoryId(categoryOptions[0].value)
    }
    dispatch(
      createListing(
        { ...postInfo!, categoryId: +categoryId, price: +postInfo!.price },
        input.length ? input : null
      )
    ).then(() => {
      props.setModal(false);
    });
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
            <Form.Item label="Description" name="text">
              <Input></Input>
            </Form.Item>
            <Form.Item label="Category">
              {categories.error ??
                (categories.isLoading || !categoryOptions ? (
                  <Loading />
                ) : (
                  <Select
                    options={categoryOptions}
                    defaultValue={categoryOptions[0].value}
                    onChange={onChangeCategory}
                    className={styles.filterSelect}
                    id="filterSelect"
                  />
                ))}
            </Form.Item>
            <Form.Item label="Price" name="price">
              <Input></Input>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form>
        </div>
      </Modal>
      <Modal modal={photoModal} setModal={setPhotoModal}>
        <div className={styles.createPostWrapper}>
          <h1>Upload photo</h1>
          <div className={styles["input-file-row"]}>
          <hr />
            <span className={styles["input-file-list"]}>{input.map((e)=><div>{e.name}</div>)}</span>
            <hr />
            <label className={styles["input-file"]} style={{display:"flex", alignItems:"center", width:"100%",flexDirection:"column"}}>
              <input type="file" multiple onChange={handleFileChange} accept="image/png, image/gif, image/jpeg"/>
              <div className={"ant-btn css-dev-only-do-not-override-1adbn6x ant-btn-default"}>Choose files</div>
            </label>
          </div>
          {/* <UploadPhoto fileList={fileList} setFileList={setFileList}></UploadPhoto> */}
          <Button type="primary" onClick={finish}>
            Create post
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CreatePost;
