import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React from "react";
import styles from "./ShowPhoto.module.css";

interface ShowPhotoProps {
  images: string[] | null | string;
  height?: string;
  width?: string;
}

const ShowPhoto = ({ height, width, images }: ShowPhotoProps) => {
  const [currentImage, setCurrentImage] = React.useState(0);

  if(typeof images ==='string'){
    return (
      <img
        src={`https://dummyimage.com/400x400/ccc/fff&text=${images}`}
        alt=""
      />
    );
  }


  if (!images || !images.length) {
    if (height && width) {
      return (
        <img
          src={`https://dummyimage.com/2000x2000/ccc/fff&text=No+photos`}
          alt=""
          style={{ height: height, width: width, borderRadius:"10px" }}
        />
      );
    }
    return (
      <img
        src={`https://dummyimage.com/2000x2000/ccc/fff&text=No+photos`}
        alt=""
      />
    );
  }

  function decrement() {
    setCurrentImage((state) => {
      if (state) {
        return state - 1;
      } else {
        return images!.length - 1;
      }
    });
  }

  function increment() {
    setCurrentImage((state) => (state + 1) % images!.length);
  }

  if (images.length < 2) {
    return (
      <div
        className={styles.showPhotoWrapper}
        style={{ height: height, width: width }}
      >
        <div className={styles.imgWrapper}>
          <img src={images[currentImage]} alt="" className={styles.img} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.button}>
        <LeftOutlined onClick={decrement}></LeftOutlined>
      </div>
      <div
        className={styles.showPhotoWrapper}
        style={{ height: height, width: width }}
      >
        <div className={styles.imgWrapper}>
          <img src={images[currentImage]} alt="" className={styles.img} />
        </div>
      </div>
      <div className={styles.button}>
        <RightOutlined onClick={increment} />
      </div>{" "}
    </div>
  );
};

export default ShowPhoto;
