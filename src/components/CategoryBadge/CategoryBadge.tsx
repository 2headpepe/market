import React from "react";
import styles from "./CategoryBadge.module.css";

const category = [
  "Home",
  "Services",
  "Electronics",
  "Clothes",
  "Health and beauty",
];
const colors = [
  [
    "rgba(178, 102, 255, 1)",
    "rgba(150, 80, 255, 1)",
    "rgba(100, 40, 200, 1)",
    "rgba(70, 0, 150, 1)",
  ],
  [
    "rgba(204, 229, 255, 1)",
    "rgba(153, 200, 255, 1)",
    "rgba(102, 178, 255, 1)",
    "rgba(50, 102, 255, 1)",
  ],
  [
    "rgba(255, 200, 230, 1)",
    "rgba(241, 156, 220, 1)",
    "rgba(220, 140, 200, 1)",
    "rgba(255, 70, 150, 1)",
  ],
  [
    "rgba(20, 29, 29, 1)",
    "rgba(12, 45, 62, 1)",
    "rgba(9, 22, 44, 1)",
    "rgba(10, 10, 60, 1)",
  ],
  [
    "rgba(41, 163, 53, 1)",
    "rgba(73, 198, 85, 1)",
    "rgba(129, 218, 138, 1)",
    "rgba(168, 218, 173, 1)",
  ],
];

interface CategoryBadgeProps {
  id: number;
  width?: string;
  height?: string;
  children: JSX.Element | JSX.Element[] | string;
}
const CategoryBadge = ({ width, height, children, id }: CategoryBadgeProps) => {
  const e = colors[id%colors.length];
  return (
    <div>
      <div
        className={styles.colorful}
        style={{
          background: `linear-gradient(45deg, ${e[0]}, ${e[1]},${e[2]},${e[3]})`,
          height,
          width,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CategoryBadge;
