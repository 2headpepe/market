import React, { useEffect } from "react";
import styles from "./Main.module.css";
import PostList from "../../../../components/PostList/PostList";
import { IRootState, useAppDispatch } from "../../../../store";
import { useSelector } from "react-redux";
import { Pagination, Select } from "antd";
import { getCategories } from "../../../../store/category/actionCreators";
import { ICategory } from "../../../../api/category/types";
import { searchListings } from "../../../../store/listings/actionCreators";
import { getListingImages } from "../../../../store/images/actionCreators";
import Loading from "../../../../components/Loading/Loading";
const sortOptions = [
  { value: "price up", label: "By price ↑" },
  { value: "price down", label: "By price ↓" },
  { value: "postDate up", label: "By date ↑" },
  { value: "postDate down", label: "By date ↓" },
];
const limit = 10;
type ISortOptions = "price up" | "postDate up" | "price down" | "postDate down";
const Main = () => {
  const posts = useSelector((state: IRootState) => state.listings.allListings);
  const categories = useSelector(
    (state: IRootState) => state.category.categoriesData
  );
  const [offset, setOffset] = React.useState(0);
  const dispatch = useAppDispatch();

  const filterOptions =
    categories && !categories.error && categories.categories
      ? [
          { value: "0", label: "All categories" },
          ...categories.categories.map((e: ICategory) => ({
            value: e.id.toString(),
            label: e.name,
          })),
        ]
      : [{ value: "0", label: "All categories" }];

  const defaultSort = { value: "postDate down", label: "By date ↓" };
  const [sortBy, setSortBy] = React.useState<"price" | "postDate">(
    defaultSort.value.split(" ")[0] as "price" | "postDate"
  );
  const [categoryId, setCategoryId] = React.useState<number | null>(null);
  const [asc, setAsc] = React.useState(
    defaultSort.value?.split(" ")[1] === "up"
  );
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const images = useSelector((state: IRootState) => state.images);
  useEffect(() => {
    dispatch(
      searchListings({ sortBy, categoryId: categoryId, offset, limit, asc })
    );
  }, [offset, sortBy, categoryId, asc]);

  useEffect(() => {
    if (posts && !posts.error && posts.listings?.listingResponseList) {
      dispatch(
        getListingImages({
          listingId: posts?.listings.listingResponseList.map((e) => e.id),
        })
      );
    }
  }, [posts]);
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
    if (selected === "0") {
      dispatch(
        searchListings({ sortBy, categoryId: null, offset, limit, asc })
      );
    } else {
      dispatch(
        searchListings({ sortBy, categoryId: +selected!, offset, limit, asc })
      );
    }
    setCategoryId(+selected);
  };
  console.log(filterOptions);
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.sortWrapper}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* <label htmlFor="sortSelect" className={styles.label}>Sort:</label> */}
          <Select
            options={sortOptions}
            onChange={onChangeSort}
            defaultValue={defaultSort.value as ISortOptions}
            className={styles.sortSelect}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* <label htmlFor="filterSelect" className={styles.label}>Category:</label> */}
          <Select
            options={filterOptions ?? []}
            onChange={onChangeFilter}
            defaultValue={""}
            className={styles.filterSelect}
            id="filterSelect"
          />
        </div>
      </div>

      <div className={styles.postListWrapper}>
        {posts.error ??
          (!posts || posts.isLoading || !posts.listings ? (
            <Loading />
          ) : (
            <PostList
              posts={posts?.listings!.listingResponseList ?? []}
              images={images}
            ></PostList>
          ))}
      </div>
      <Pagination
        onChange={(page) => {
          setOffset(page - 1);
        }}
        defaultCurrent={1}
        total={(posts?.listings?.totalPages ?? 1) * 10}
        className="pagination2"
      />
    </div>
  );
};

export default Main;
