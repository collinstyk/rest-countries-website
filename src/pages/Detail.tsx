/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useQuery } from "@tanstack/react-query";
import {
  getCountryDetails,
  getNeighbouringCountry,
} from "../services/apiCountries";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import Button from "../components/Button";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useEffect, useMemo, useState } from "react";
import { CountryProps } from "../components/CountryCard";

function Detail() {
  // working with react router
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  // @ts-ignore
  const memoizedNeighboursArr = useMemo(() => {
    const borders = searchParams.get("borders");
    return borders ? borders.split(",") : [];
  }, [searchParams]);
  const navigate = useNavigate();

  // importing and working with custom theme from ThemeContext
  const theme = useTheme()?.theme;
  const isLight = theme === "Light";

  // fetching data
  const { isLoading, data: countryData } = useQuery({
    queryKey: ["country-detail", id],
    queryFn: () => getCountryDetails(id),
  });

  console.log(countryData);

  const [neighboursData, setNeighboursData] = useState<unknown[]>([]);

  // fetching neighboursData
  useEffect(() => {
    const getNeighboursData = async function () {
      const responses = await Promise.all(
        // @ts-ignore
        memoizedNeighboursArr.map((item) => getNeighbouringCountry(item)),
      );
      if (responses) {
        // @ts-ignore
        const newResponses = responses.map((response) => response[0]);
        setNeighboursData(newResponses);
      }
    };
    getNeighboursData();
  }, [memoizedNeighboursArr]);

  if (isLoading) return;

  const country: CountryProps = countryData[0];
  const {
    name: { common: commonName, nativeName },
    population,
    region,
    subregion: subRegion,
    capital: capitalData,
    tld: [tld],
    currencies,
    languages,
  } = country;

  const [capital] = capitalData ? capitalData : ["nill"];

  const languagesString = languages
    ? Object.values(languages).join(", ")
    : "nill";

  //@ts-ignore
  const currency = currencies ? Object.values(currencies)[0].name : "nill";

  const nativeNameArr = nativeName ? Object.values(nativeName) : [undefined];
  const lastIndex = nativeName ? Object.values(nativeName).length - 1 : 0;
  // @ts-ignore
  const commonNativeName = nativeNameArr[lastIndex]?.common ?? "nill";
  const subregion = subRegion || "nill";

  return (
    <div
      className={`max-h-fit min-h-dvh px-3 pb-6 pt-10 sm:px-8 sm:pb-0 md:min-h-[90dvh] md:px-10 lg:px-14 ${isLight ? "bg-paper-light text-light" : "bg-paper-dark text-dark"}`}
    >
      <Button
        size={"sm"}
        variant={isLight ? "light" : "dark"}
        shadow="lg"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeftLong /> Back
      </Button>
      <div className="my-12 flex w-full flex-col justify-between gap-8 sm:h-[21rem] sm:flex-row sm:gap-6 lg:h-80">
        <div className="h-1/3 w-full sm:h-full md:w-1/2 lg:w-2/5">
          <img
            src={country.flags.png}
            alt={country.flags.alt}
            className="h-full w-full"
          />
        </div>
        <div className="flex flex-col gap-4 sm:w-1/2 md:justify-center">
          <h1 className="text-lg font-bold lg:text-2xl">{commonName}</h1>
          <div className="flex flex-col gap-8 tracking-wide">
            <div className="flex flex-col gap-5 md:flex-row md:justify-between md:gap-12 lg:gap-16">
              <div>
                <p className="text-sm font-light">
                  <span className="font-medium">Native Name:</span>{" "}
                  {commonNativeName}
                </p>
                <p className="text-sm font-light">
                  <span className="font-medium">Population:</span> {population}
                </p>
                <p className="text-sm font-light">
                  <span className="font-medium">Region:</span> {region}
                </p>
                <p className="text-sm font-light">
                  <span className="font-medium">Sub Region:</span> {subregion}
                </p>
                <p className="text-sm font-light">
                  <span className="font-medium">Capital:</span> {capital}
                </p>
              </div>
              <div>
                <p className="text-sm font-light">
                  <span className="font-medium">Top Level Domain:</span> {tld}
                </p>
                <p className="text-sm font-light">
                  <span className="font-medium">Currencies:</span> {currency}
                </p>
                <p className="text-sm font-light">
                  <span className="font-medium">Languages:</span>{" "}
                  {languagesString}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-base font-medium">Border Countries:</h2>
              <div className="flex w-full flex-wrap gap-2">
                {neighboursData.length !== 0 && // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  neighboursData.map((neighbour: any) => {
                    const bordersParams = neighbour.borders.join(",");
                    const name = neighbour.name.common;
                    const code = neighbour.cca3;
                    return (
                      <Button
                        key={code}
                        variant={isLight ? "light" : "dark"}
                        shadow="md"
                        onClick={() => {
                          navigate(
                            `/country-details/${code}?borders=${bordersParams}`,
                          );
                        }}
                      >
                        {name}
                      </Button>
                    );
                  })}
                {neighboursData.length === 0 && (
                  <p className="text-sm">No Border Country.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
