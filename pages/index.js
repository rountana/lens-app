import { useState, useEffect } from "react";
import { client, recommendProfiles, pingPong, getProfile } from "../api";
import { apolloClient } from "../api";
import { gql } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";

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
      const response = await apolloClient.query({
        query: gql(recommendProfiles),
      });
      setProfiles(response.data.recommendedProfiles);
      const temp = response.data.recommendedProfiles;
      // temp.forEach((profile) => console.log(profile));
      temp.forEach((profile) =>
        profile.picture
          ? console.log(profile.id, profile)
          : console.log("no picture field for id: ")
      );

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
      <h1 className=" text-slate-900 mt-20 mb-10 text-7xl text-center">
        {" "}
        LENS APP
      </h1>
      {profiles.map((profile, index) => (
        <div className="bg-fuchsia-200 ml-6 mr-8 m-2 p-4 rounded-lg shadow-md w-[75%] justify-center">
          <Link
            href={`/profile/${profile.id}`}
            key={index}
            className="text-green-800 p-1 ml-10"
          >
            {profile.handle}
          </Link>
          <p className="text-green-800 p-1 ml-10">
            Owned by : {profile.ownedBy}
          </p>
          <p className="text-green-800 p-1 ml-10"> {profile.name}</p>

          {profile.picture ? (
            <Image
              className=" p-1 ml-10 rounded-lg"
              //  config required to next.config for ipfs urls to be recognized
              src="/avatar.png"
              width={60}
              height={60}
              alt="user dp"
            />
          ) : (
            <div
              className=" p-1 ml-10"
              style={{ width: "60px", height: "60px", backgroundColor: "grey" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
