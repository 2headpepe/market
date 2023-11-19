import { useNavigate } from "react-router-dom";
import ShowPhoto from "../ShowPhoto/ShowPhoto";
import React from "react";
import "./Cards.css";
import { useAppDispatch } from "../../store";
import { getListing } from "../../store/listings/actionCreators";

export interface CardProps {
  posts:{
  id: number;
  userId: number;
  title: string;
  city: string;
  postDate: string;
  text: string;
  price: number;
  },
  images: string[]|null;
}
const Card = ({posts,images}: CardProps) => {
  const {city, title, postDate, text, price, id } = posts;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  function clickHandle({event,id}: {event:React.MouseEvent,id:number}) {
    if (
      event.target instanceof HTMLElement &&
      event.target.className !== "button"
    ) {
      navigate("/"+id.toString());
    }
  }
  return (
    <div
      className="Card--wrapper"
      onClick={(event:React.MouseEvent)=>clickHandle({event,id})}
    >
      <ShowPhoto
        images={images}
        height="40vh"
        width="40vh"
      ></ShowPhoto>
      <div className="Card--info-wrapper">
        <div className="Card--location--wrapper">
          <img
            src="./images/location.svg"
            alt=""
            className="Card--location--icon"
          />
          <p className="Card--location--text">{city}</p>
          <p className="Card--dates">{postDate}</p>
        </div>

        <h3 className="Card--name">{title}</h3>
        <p className="Card--text">{text}</p>
        <h4 className="Card--price">{price + "$"}</h4>
      </div>
    </div>
  );
};

export default Card;
