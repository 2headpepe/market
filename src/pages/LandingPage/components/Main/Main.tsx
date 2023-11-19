import React, { useEffect } from "react";
import styles from "./Main.module.css";
import PostList from "../../../../components/PostList/PostList";
import { IRootState, useAppDispatch } from "../../../../store";
import { useSelector } from "react-redux";
import { Select } from "antd";
import { getCategories } from "../../../../store/category/actionCreators";
import { ICategory } from "../../../../api/category/types";
import { searchListings } from "../../../../store/listings/actionCreators";
const sortOptions = [
  { value: "price up", label: "By price ↑" },
  { value: "price down", label: "By price ↓" },
  { value: "postDate up", label: "By date ↑" },
  { value: "postDate down", label: "By date ↓" },
];
const limit = 10;
const pages = 1;

const Main = () => {
  const posts = useSelector(
    (state: IRootState) => state.listings.allListings.listings
  );
  console.log(posts);
  const categories = useSelector(
    (state: IRootState) => state.category.categoriesData.categories
  );
  const [offset, setOffset] = React.useState(0);
  const dispatch = useAppDispatch();

  const filterOptions = categories
    ? categories.map((e: ICategory) => ({
        value: e.id.toString(),
        label: e.name,
      }))
    : null;

  const defaultSort = { value: "postDate down", label: "By date ↓" };
  const [sortBy, setSortBy] = React.useState<"price" | "postDate">(defaultSort.value.split(' ')[0] as "price" | "postDate");
  const [categoryId, setCategoryId] = React.useState<number | null>(null);
  const [asc, setAsc] = React.useState(defaultSort.value?.split(" ")[1] === "up");
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(
      searchListings({ sortBy, categoryId: categoryId, offset, limit, asc })
    );
  }, [offset, sortBy, categoryId, asc]);

  const onChangeSort = (
    selected: "price up" | "postDate up" | "price down" | "postDate down" | null
  ) => {
    const sort = selected?.split(" ")[0] as "price" | "postDate";
    const newAsc = selected?.split(" ")[1] === "up";
    if (sort) {
      setSortBy(sort);
      setAsc(newAsc);
      dispatch(
        searchListings({
          sortBy: sort,
          categoryId: categoryId,
          offset,
          limit,
          asc: newAsc,
        })
      );
    }
  };
  const onChangeFilter = (selected: string | null) => {
    if (!selected) return;
    setCategoryId(+selected);
    dispatch(
      searchListings({ sortBy, categoryId: +selected!, offset, limit, asc })
    );
  };

  function handleLoadMore() {
    setOffset((prev: number) => prev + 1);
  }

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.sortWrapper}>
        <label htmlFor="sortSelect">Sort:</label>
        <Select
          options={sortOptions}
          onChange={onChangeSort}
          defaultValue={defaultSort as any}
          className={styles.sortSelect}
          style={{ width: "150px" }}
        />
      </div>
      <div className={styles.filterWrapper}>
        <label htmlFor="filterSelect">Category:</label>
        <Select
          options={filterOptions ?? []}
          onChange={onChangeFilter}
          defaultValue={filterOptions ? filterOptions[0].value : null}
          className={styles.filterSelect}
          id="filterSelect"
          style={{ width: "150px" }}
        />
      </div>
      <div className={styles.postListWrapper}>
        <PostList
          posts={posts?.listingResponseList ?? []}
          images={{}}
        ></PostList>
      </div>
      {pages > offset + 1 && (
        <p onClick={handleLoadMore} style={{ color: "grey" }}>
          Load more
        </p>
      )}
      {/* {pages.map((e) => (
        <span key={e}>{e} </span>
      ))} */}
    </div>
  );
};

export default Main;
