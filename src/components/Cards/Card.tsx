import { useNavigate } from "react-router-dom";
import ShowPhoto from "../ShowPhoto/ShowPhoto";
import React from "react";
import "./Cards.css";
import { Button } from "antd";
import { useAppDispatch } from "../../store";
import { deleteListing } from "../../store/listings/actionCreators";
import { approve, disapprove } from "../../store/orders/actionCreators";
import { IListing } from "../../api/listings/types";

export interface CardProps {
  posts: IListing;
  images: string[] | null | undefined;
  listingId: number;
  currentPosts: number;
}
const Card = (props: CardProps) => {
  const { images, posts, currentPosts, listingId } = props;

  console.log("card", images);
  const { title, postDate, text, price, id } = posts;
  const navigate = useNavigate();

  function clickHandle({ event, id }: { event: React.MouseEvent; id: number }) {
    console.log(event);
    if (
      event.target instanceof HTMLElement &&
      event.target.className !== "button" &&
      !["Delete","Approve","Disapprove"].includes(event.target.innerText)
    ) {
      navigate("/" + id.toString());
    }
  }
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
              dispatch(approve({
                orderId: posts.orderId!
              }))
            }}
          >
            Approve
          </Button>
        )}
        {currentPosts === 5 && (
          <Button
          style={{marginLeft:"10px"}}
            onClick={() => {
              dispatch(disapprove({
                orderId: posts.orderId!
              }))
            }}
          >
            Disapprove
          </Button>
        )}
      </div>
    </div>
  );
};

export default Card;
