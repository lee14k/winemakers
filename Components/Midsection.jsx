import Image from "next/image";
import "./Midsection.css";
import { greatVibes } from "@/app/fonts";
export default function Midsection() {
  return (
    <div className="mid">
      <Image src="/midwinepic.jpeg" height={450} width={600} className="welcomepic" />
      <div className="midtext">
        <h2 className={`${greatVibes.className} welcome`}>Welcome</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          ipsum quia, a necessitatibus eius pariatur tempora, illum at amet nemo
          quasi quos est recusandae consequatur architecto libero voluptates
          quod animi.
        </p>
      </div>
    </div>
  );
}
