import WatchPartyClient from "./WatchPartyClient";

type WatchPartyProps = {
  params: {
    id: string;
  };
};

export default function WatchParty({ params }: WatchPartyProps) {
  return <WatchPartyClient id={params.id} />;
}
