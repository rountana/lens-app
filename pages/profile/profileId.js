//same as id.js, built from nader dabit thread.. this one is buggy at
// apollo client dynamic getprofile

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getProfile, pingPong, getProfiles } from "@/api";
import { useQuery } from "@apollo/client";
import fetchProfileQuery from "../../queries/fetchProfileQuery";
// import { gql } from "@apollo/client";
// import { apolloClient } from "../../api";

const Profile = () => {
  const [profile, setProfile] = useState();
  const router = useRouter();
  const id = router.query.id;

  //call query on render
  // useEffect(() => {
  //   queryProfile();
  // }, []); //-->> check if we need trigger on Id

  // async function queryProfile() {
  // const response = await apolloClient.query({
  //   query: gql(getProfiles),
  //   variables: { profileId: profileId }, // check use of variable name
  // });

  const { loading, error, data } = useQuery(fetchProfileQuery, {
    variables: { request: { profileId: id } },
  });
  if (loading) return "Loading..";
  if (error) return `Error! ${error.message}`;

  console.log("Lens data from profile ID page: ", response);
  setProfile(response.data);
  // }
  return (
    <div>
      {id}
      {/* {profile.bio} */}
    </div>
  );
};

export default Profile;
