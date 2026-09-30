import { destinations as d } from "../../shared/catalog";
import { ExternalLink, Heading, Promo } from "../components";
export function Accessories() {
  return (
    <>
      <Heading kicker="Better together">The perfect companions.</Heading>
      <Promo
        title="MagSafe"
        copy="Snap on a magnetic case, wallet, or both. And get faster wireless charging."
        asset="accessories/imgFigure"
        href={d.magsafe}
        action="Shop MagSafe accessories"
      />
      <Promo
        title="AirTag"
        copy="Attach one to your keys. Put another in your backpack. Find them with the Find My app."
        asset="accessories/imgFigure1"
        href={d.airtag}
        action="Explore AirTag"
      />
      <Promo
        title="Magic runs in the family."
        copy="Explore all AirPods models and find the best ones for you."
        asset="accessories/imgFigure2"
        href={d.airpods}
      />
      <ExternalLink label="Shop all iPhone accessories" url={d.accessories} />
    </>
  );
}
