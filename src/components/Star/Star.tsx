import { StarOutlined, StarTwoTone } from "@ant-design/icons";
import styles from "./Star.module.css";
interface StarProps {
  rating: number;
}

const Star = ({ rating }: StarProps) => {
  const stars = new Array(5).fill(
    <StarTwoTone
      twoToneColor="lightgrey"
      className={styles.star}
    />
  );
  for (let i = 0; i < rating; ++i) {
    stars[i] = (
      <StarTwoTone
        twoToneColor="gold"
        className={styles.star}
      />
    );
  }
  return <div className={styles.ratingWrapper}>{stars}</div>;
};

export default Star;
