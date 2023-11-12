import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import styles from "./ShowPhoto.module.css";

interface ShowPhotoProps {
  images: string[] | null;
  height?: string;
  width?: string;
}

const ShowPhoto = ({ height, width, images }: ShowPhotoProps) => {


  const [currentImage, setCurrentImage] = React.useState(0);

  if(!images){
    return <h1>No photos</h1>;
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
          <img
            src={images[currentImage]}
            alt=""
            className={styles.img}
          />
        </div>
      </div>
      <div className={styles.button}>
        <RightOutlined onClick={increment} />
      </div>{" "}
    </div>
  );
};

export default ShowPhoto;
