// pages/profile/[id].js

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import fetchProfileQuery from "../../queries/fetchProfileQuery.js";
import Image from "next/image.js";
import Link from "next/link.js";
import Post from "@/components/Post.js";
import fetchProfilePublicationsQuery from "@/queries/fetchProfilePublicationsQuery.js";
import fetchProfilePublicationEx from "../..fetProfilePublicationEx";

// import Profile from "../../components/Profile.js";

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;

  console.log("fetching profile router query", router.query);
  console.log("fetching profile for", id);
  const { loading, error, data } = useQuery(fetchProfileQuery, {
    variables: { request: { profileId: id } },
    // publicationsRequest: {
    //   profileId: id,
    //   publicationTypes: ["POST"],
    // },
  });

  if (loading) return "Loading..";
  if (error) return `Error! ${error.message}`;

  console.log("on profile page data: ", data);

  return (
    <div className="m-20 bg-slate-400 rounded-md p-3">
      <h1 className="text-2xl shadow-lg  p-5">{data.profile.name}</h1>
      <div className="m-3">
        <div className="my-5 ">
          <Image
            style={{
              objectfit: "contain",
              borderRadius: "10%",
              border: "1px solid #fff",
            }}
            src="/avatar.png"
            width="200"
            height="200"
            alt="profile picture"
          />
        </div>
        <h1>{data.profile.bio}</h1>
        {data.profile.followNFTAddress ? (
          <h1>follow @ {data.profile.followNFTAddress}</h1>
        ) : (
          <div> </div>
        )}

        <h1>Followers: {data.profile.stats.totalFollowers}</h1>
        <h1>Following: {data.profile.stats.totalFollowing} </h1>
        <Link href={`/profile/publications/${id}`}>
          Publications: {data.profile.stats.totalPublications}{" "}
        </Link>
        <h1>Collections: {data.profile.stats.totalCollects} </h1>
        {/* {data.publications.items.map((post, idx) => {
          return <Post key={idx} post={post} />;
        })} */}
      </div>
    </div>
  );
}
