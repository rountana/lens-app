import React from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import getPublications from "@/queries/getPublications";
import fetchProfilePublicationEx from "@/queries/fetchProfilePublicationEx";
import { PublicationTypes } from "@apollo/client";

const Publications = () => {
  const router = useRouter();
  const { $id } = router.query;
  console.log("Router response", router.query);

  // console.log("fetching publications for", router.query.$id);
  // const { loading, error, data } = useQuery(getPublications, {
  //   variables: { request: { profileId: $id } },
  // });

  const { loading, error, data } = useQuery(
    fetchProfilePublicationEx
    // , {
    // variables: {
    //   request: {
    //     $id,
    //   },
    // },
    // }
  );

  if (loading) return "Loading..";
  if (error) return `Error! ${error.message}`;

  console.log("on profile page data: ", data);

  return (
    <div>
      <h1>Publications for profile {$id}</h1>
      <h1>{data.publications.items[0].metadata.content} </h1>
    </div>
  );
};

export default Publications;
