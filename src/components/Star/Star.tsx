import { StarOutlined, StarTwoTone } from "@ant-design/icons";
import styles from "./Star.module.css";
interface StarProps {
  rating: number;
}

const Star = ({ rating }: StarProps) => {
  const stars = new Array(5);
  for (let i = 1; i <= rating; ++i) {
    stars[i] = (
      <StarTwoTone key={i} twoToneColor="gold" className={styles.star} />
    );
  }
  for (let i = rating; i <= 5; ++i) {
    stars[i] = <StarTwoTone key={i} twoToneColor="lightgrey" className={styles.star} />;
  }
  return <div className={styles.ratingWrapper}>{stars}</div>;
};

export default Star;
