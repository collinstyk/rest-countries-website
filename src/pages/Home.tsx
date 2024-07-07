import { IoSearchSharp } from "react-icons/io5";
import Select from "../components/Select";
import Input from "../components/Input";
import { getCountries } from "../services/apiCountries";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import CountryCard from "../components/CountryCard";
import { CountryProps } from "../components/CountryCard";
import useTheme from "../hooks/useTheme";
import { useEffect, useState } from "react";

function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  const [filteredCountries, setFilteredCountries] = useState<CountryProps[]>(
    [],
  );
  const [searchInput, setSearchInput] = useState<string>("");

  const theme = useTheme()?.theme;
  const isLight = theme === "Light";

  const options = [
    { value: "Africa", label: "Africa" },
    { value: "Americas", label: "Americas" },
    { value: "Asia", label: "Asia" },
    { value: "Europe", label: "Europe" },
    { value: "Oceania", label: "Oceania" },
  ];

  useEffect(() => {
    if (data) {
      const filtered = data.filter(
        (item: CountryProps) =>
          item.name.common.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.name.official.toLowerCase().includes(searchInput.toLowerCase()),
      );
      setFilteredCountries(filtered);
    }
  }, [searchInput, data]);

  const countries = filteredCountries.length === 0 ? data : filteredCountries;

  return (
    <div
      className={`min-h-[90dvh] px-3 pb-6 pt-10 sm:px-8 md:px-10 lg:px-14 ${isLight ? "bg-paper-light" : "bg-paper-dark"}`}
    >
      <div className="flex flex-col justify-between gap-8 sm:flex-row">
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          startIcon={
            <IoSearchSharp
              size="28"
              fill={isLight ? "hsl(0,0%,52%)" : "hsl(0,0%,100%)"}
            />
          }
        />

        <Select
          options={options}
          onChange={(selectedOption) => {
            const region = selectedOption;
            if (data && region) {
              const filteredByRegion = data.filter(
                (item: CountryProps) => item.region === region,
              );
              setFilteredCountries(filteredByRegion);
            }
          }}
          placeholder="Filter by Region"
        />
      </div>
      <div className="flex w-full flex-wrap justify-center gap-8 pt-8 md:justify-between md:gap-16">
        {isLoading && <Loading />}
        {!isLoading &&
          countries.map((country: CountryProps) => (
            <CountryCard country={country} key={country.name.common} />
          ))}
      </div>
    </div>
  );
}

export default Home;
