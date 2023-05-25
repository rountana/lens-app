// pages/profile/[id].js

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import fetchProfileQuery from "../../queries/fetchProfileQuery.js";

// import Profile from "../../components/Profile.js";

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;

  console.log("fetching profile for", id);
  const { loading, error, data } = useQuery(fetchProfileQuery, {
    variables: { request: { profileId: id } },
  });

  if (loading) return "Loading..";
  if (error) return `Error! ${error.message}`;

  console.log("on profile page data: ", data);

  return (
    <div className="m-20 bg-slate-400 rounded-md p-3">
      <h1 className="text-2xl shadow-lg  p-5">{data.profile.name}</h1>
      <div className="m-3">
        <h1>{data.profile.bio}</h1>
        <h1>follow @ {data.profile.followNFTAddress}</h1>
        <h1>{data.profile.ownedBy}</h1>
      </div>
    </div>
  );
}
