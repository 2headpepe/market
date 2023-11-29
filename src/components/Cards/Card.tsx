import { useNavigate } from "react-router-dom";
import ShowPhoto from "../ShowPhoto/ShowPhoto";
import React from "react";
import "./Cards.css";
import { Button, Empty, Input } from "antd";
import { useAppDispatch } from "../../store";
import { deleteListing } from "../../store/listings/actionCreators";
import { approve, disapprove } from "../../store/orders/actionCreators";
import { IListing } from "../../api/listings/types";
import { Modal as AntdModal } from "antd";
import { postReview } from "../../store/reviews/actionCreators";
import { Rating } from "@mui/material";
export interface CardProps {
  posts: IListing | undefined;
  images: string[] | null | undefined;
  listingId: number;
  currentPosts?: number;
  handleDeletePost?: Function;
}
const Card = (props: CardProps) => {
  const { images, posts, currentPosts, listingId, handleDeletePost } = props;
  if (!posts)
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{ width: "20vw", height: "20vw" }}
        description={<div style={{ fontSize: "20px" }}>No data</div>}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      />
    );
  const { title, postDate, text, price, id } = posts;
  const navigate = useNavigate();

  function clickHandle({ event, id }: { event: React.MouseEvent; id: number }) {
    if (
      event.target instanceof HTMLElement &&
      event.target.className !== "button" &&
      !["Delete", "Approve", "Disapprove", "Delete product"].includes(
        event.target.innerText
      ) &&
      !posts?.orderStatus
    ) {
      navigate("/" + id.toString());
    }
  }
  const [review, setReview] = React.useState("");
  const [rating, setRating] = React.useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  return (
    <div
      className="Card--wrapper"
      onClick={(event: React.MouseEvent) => clickHandle({ event, id })}
    >
      <ShowPhoto images={images} height="40vh" width="40vh"></ShowPhoto>
      <div className="Card--info-wrapper">
        <div className="Card--location--wrapper">
          <img
            src="./images/location.svg"
            alt=""
            className="Card--location--icon"
          />
          <p className="Card--dates">{new Date(postDate).toDateString()}</p>
        </div>

        <h3 className="Card--name">{title}</h3>
        <p className="Card--text">{text}</p>
        <h4 className="Card--price">{price + "$"}</h4>
        {currentPosts === -1 && (
          <Button
            type="primary"
            onClick={() => {
              dispatch(
                deleteListing({
                  id: listingId,
                })
              );
            }}
          >
            Delete
          </Button>
        )}
        {currentPosts === 5 && (
          <Button
            type="primary"
            onClick={() => {
              setIsModalOpen(true);
              // posts.
            }}
          >
            Approve
          </Button>
        )}
        {currentPosts === 5 && (
          <Button
            style={{ marginLeft: "10px" }}
            onClick={() => {
              dispatch(
                disapprove({
                  orderId: posts.orderId!,
                })
              );
            }}
          >
            Disapprove
          </Button>
        )}
        {handleDeletePost !== undefined && (
          <Button
            danger
            style={{ marginLeft: "10px" }}
            onClick={() => handleDeletePost(listingId)}
          >
            Delete product
          </Button>
        )}
      </div>
      <AntdModal
        title="Congratulation"
        open={isModalOpen}
        onOk={() => {
          dispatch(
            approve({
              orderId: posts.orderId!,
            })
          );
          dispatch(
            postReview({
              sellerId: posts.sellerId!,
              text: review,
              rating: rating ?? 5,
            })
          );
          setIsModalOpen(false)
        }}
        onCancel={() => {
          setReview("");
          setIsModalOpen(false);
        }}
      >
        <p>Please leave review about product and seller</p>
        <Input
          value={review}
          onChange={(e: any) => {
            setReview(e.target.value);
          }}
        ></Input>
        <Rating
          name="half"
          defaultValue={5}
          precision={0.5}
          size="large"
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </AntdModal>
    </div>
  );
};

export default Card;
