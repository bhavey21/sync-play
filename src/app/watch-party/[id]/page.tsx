import WatchPartyClient from "./WatchPartyClient";


export default async function Page({ params }:any) {
  const { id } = await params
  return <WatchPartyClient id={id} />;
}