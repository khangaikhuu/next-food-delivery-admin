import * as React from "react";
import CategoryTable from "../components/category.table";
import axios from "axios";
import { InferGetStaticPropsType, NextPage, NextPageContext } from "next";

type Category = {
  id: number;
  name: string;
  color: string;
};

export const getStaticProps = async () => {
  const res = await axios.get("http://localhost:3001/categories");
  const categories: Category[] = await res.data.data;

  return {
    props: {
      categories,
    },
  };
};

function Category({
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <CategoryTable categories={categories} />;
}

export default Category;
