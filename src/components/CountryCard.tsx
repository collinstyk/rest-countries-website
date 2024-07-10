import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";

export interface CountryProps {
  borders: string[];
  capital?: string[];
  flags: {
    png: string;
    alt: string;
  };
  name: { common: string; official: string; nativeName?: object };
  population: number;
  subregion: string;
  tld: string[];
  currencies?: number;
  region: string;
  languages?: object;
  fifa: string;
  area: number;
  cca2: string;
  cca3: string;
  ccn3: string;
  latlng: number[];
}

type Neighbours = string[] | undefined;

interface Props {
  country: CountryProps;
}

function CountryCard({ country }: Props) {
  const {
    borders,
    capital: capitalArr,
    flags,
    name,
    population,
    region,
    cca2,
  } = country;

  const neighbours: Neighbours = borders || undefined;

  const capitals = capitalArr ? capitalArr.join(", ") : "no capital";

  const navigate = useNavigate();

  const theme = useTheme()?.theme;

  const imageRef = useRef<HTMLImageElement>(null);

  const formattedPopulation = population.toLocaleString("en-US");

  return (
    <div
      className={`mb-8 h-[22.5rem] w-[17.5rem] cursor-pointer rounded-md shadow-lg hover:opacity-90 md:w-[30%] lg:mb-auto lg:w-auto xs:w-[45%] ${theme === "Light" ? "bg-element-light" : "bg-element-dark"}`}
      onMouseEnter={() => {
        imageRef.current?.classList.toggle("scale-125");
      }}
      onMouseLeave={() => {
        imageRef.current?.classList.toggle("scale-125");
      }}
      onClick={() =>
        navigate(
          `/country-details/${cca2}${neighbours ? `?borders=${neighbours.join(",")}` : ""}`,
        )
      }
    >
      <div className="h-1/2 w-full overflow-hidden rounded-t-[inherit]">
        <img
          src={flags.png}
          alt={flags.alt}
          className="h-full w-full rounded-[inherit]"
          ref={imageRef}
        />
      </div>
      <div className="px-4 py-6">
        <h1
          className={`mb-3 text-lg font-extrabold ${theme === "Light" ? "text-light" : "text-dark"}`}
        >
          {name.common}
        </h1>

        <p
          className={`text-sm font-extralight leading-6 ${theme === "Light" ? "text-light" : "text-dark"}`}
        >
          <span className="font-bold">Population:</span> {formattedPopulation}
        </p>
        <p
          className={`text-sm font-extralight leading-6 ${theme === "Light" ? "text-light" : "text-dark"}`}
        >
          <span className="font-bold">Region:</span> {region}
        </p>
        <p
          className={`text-sm font-extralight leading-6 ${theme === "Light" ? "text-light" : "text-dark"}`}
        >
          <span className="font-bold">Capital:</span> {capitals}
        </p>
      </div>
    </div>
  );
}

export default CountryCard;
