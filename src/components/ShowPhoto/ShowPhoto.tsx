import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React from "react";
import styles from "./ShowPhoto.module.css";

interface ShowPhotoProps {
  images: string[] | null | undefined;
  height?: string;
  width?: string;
}

const ShowPhoto = ({ height, width, images }: ShowPhotoProps) => {
  const [currentImage, setCurrentImage] = React.useState(0);

  if (typeof images === "string") {
    return (
      <img
        src={`https://dummyimage.com/400x400/ccc/fff&text=${images}`}
        alt=""
      />
    );
  }

  if (!images) {
    if (height && width) {
      return (
        <img
          src={`https://dummyimage.com/2000x2000/ccc/fff&text=No+photos`}
          alt=""
          style={{ height: height, width: width, borderRadius: "10px" }}
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
    if (typeof images === "string" || !images) {
      return;
    }
    setCurrentImage((state) => {
      if (state) {
        return state - 1;
      } else {
        return images.length - 1;
      }
    });
  }

  function increment() {
    if (typeof images === "string" || !images) {
      return;
    }
    setCurrentImage((state) => ((state + 1) % images.length) - 1);
  }

  // if (images.length < 2) {
  //   console.log("showphoto", images[currentImage]);

  //   return (
  //     <div
  //       className={styles.showPhotoWrapper}
  //       style={{ height: height, width: width }}
  //     >
  //       <div className={styles.imgWrapper}>
  //         <img src={images[currentImage]} alt="" className={styles.img} />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.pageWrapper}>
      {images.length > 1 && (
        <div className={styles.button}>
          <LeftOutlined onClick={decrement}></LeftOutlined>
        </div>
      )}
      <div
        className={styles.showPhotoWrapper}
        style={{ height: height, width: width }}
      >
        <div className={styles.imgWrapper}>
          <img
            src={images[currentImage]}
            alt=""
            className={styles.img}
            style={{ width, height }}
          />
        </div>
      </div>
      {images.length > 1 && (
        <div className={styles.button}>
          <RightOutlined onClick={increment} />
        </div>
      )}
    </div>
  );
};

export default ShowPhoto;
