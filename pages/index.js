import { useState, useEffect } from "react";
import { client, recommendProfiles, pingPong, getProfile } from "../api";
import { apolloClient } from "../api";
import { gql } from "@apollo/client";
import Link from "next/link";

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    fetchProfiles();
    // queryExample();
  }, []);

  const queryExample = async () => {
    const response = await apolloClient.query({
      query: gql(getProfile),
    });
    console.log("Lens example data: ", response);
  };

  async function fetchProfiles() {
    try {
      // const response = client.query(getProfile,{}).toPromise();
      const response = await apolloClient.query({
        query: gql(recommendProfiles),
      });
      setProfiles(response.data.recommendedProfiles);
      const temp = response.data.recommendedProfiles;
      temp.forEach((profile) => console.log(profile.name));

      // tempprofiles.map((text) => console.log(text))
      // for (var i = 0; i < 10; i++) {
      // console.log(i);
      // console.log(profiles.forEach)
      // }
    } catch (err) {
      console.log("error in graphql fetch", { err });
    }
  }

  return (
    <div>
      <h1 className="text-slate-900 mb-10 text-2xl text-center"> LENS APP</h1>
      <ul>
        {profiles.map(
          (profile, index) => (
            <li key={index} className="text-green-800 p-1 ml-10">
              {profile.handle}{" "}
            </li>
          )
          // <li key={index}> {profile} </li>
        )}
      </ul>
    </div>
  );
}
