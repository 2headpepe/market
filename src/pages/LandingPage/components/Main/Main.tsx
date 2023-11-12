import React from "react";
import {data} from "../../../../data";
import styles from "./Main.module.css";
import PostList from "../../../../components/PostList/PostList";
import { IRootState } from "../../../../store";
import { useSelector } from "react-redux";
import { Select } from "antd";
const options = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
];
const Main = () => {
  // /api/v1/listings/search (null,null,null)
  // images
  const posts = useSelector((state:IRootState)=>state.listings.allListings.listings)

  const [sortBy, setSortBy] = React.useState("");
  const [filterBy, setFilterBy] = React.useState("");

  const onChangeSort = (selected: { value: string; label: string } | null) => {
    setSortBy(selected!.value);
  };
  const onChangeFilter = (
    selected: { value: string; label: string } | null
  ) => {
    setFilterBy(selected!.value);
  };

  // const pageNumber = Math.ceil(posts.length / 3);
  // const pages = [];
  // for (let i = 1; i <= pageNumber; ++i) {
  //   pages.push(i);
  // }
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.sortWrapper}>
        <label htmlFor="sortSelect">Sort:</label>
        <Select
          options={options}
          onChange={onChangeSort}
          defaultValue={options[0]}
          className={styles.sortSelect}
        />
      </div>
      <div className={styles.filterWrapper}>
        <label htmlFor="filterSelect">Filter:</label>
        <Select
          options={options}
          onChange={onChangeFilter}
          defaultValue={options[0]}
          className={styles.filterSelect}
          id="filterSelect"
        />
      </div>
      <div className={styles.postListWrapper}>
        <PostList posts={posts??[]} images={{}}></PostList>
      </div>
      {/* {pages.map((e) => (
        <span key={e}>{e} </span>
      ))} */}
    </div>
  );
};

export default Main;
