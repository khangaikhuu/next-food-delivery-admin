import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";

export default function Cat({ category }) {
  console.log(category);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = () => {
    console.log("handling submit");
    setShowAlert(true);

    // router.push("/category");
    // axios call
    // when successful
  };

  return (
    <>
      {showAlert ? (
        <Alert severity="success" color="info">
          This is a success alert — check it out!
        </Alert>
      ) : (
        ""
      )}
      <h1>One category</h1>
      <Button onClick={handleSubmit}>Submit </Button>
    </>
  );
}

export async function getStaticPaths() {
  const res = await axios.get("http://localhost:3001/category");
  console.log(res.data.data);
  return {
    fallback: false,
    paths: res.data.data.map((category) => ({
      params: { id: category.id.toString() },
    })),
  };
}

export async function getStaticProps({ params }) {
  console.log(params);
  const res = await axios.get(`http://localhost:3001/category/${params.id}`);
  console.log(res.data.data);
  return {
    props: {
      category: res.data.data,
    },
  };
}
