import React, { useState, useEffect, createContext } from "react";
import { housesData } from "../data";

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData); // Initial houses data
  const [country, setCountry] = useState("Location(any)"); // Selected country
  const [countries, setCountries] = useState([]); // List of unique countries
  const [property, setProperty] = useState("Property type (any)"); // Selected property type
  const [properties, setProperties] = useState([]); // List of unique property types
  const [price, setPrice] = useState("Price range(any)"); // Selected price range
  const [loading, setLoading] = useState(false); // Loading state

  // Set unique countries from the house data
  useEffect(() => {
    const allCountries = housesData.map((house) => house.country);
    const uniqueCountries = ["Location(any)", ...new Set(allCountries)];
    setCountries(uniqueCountries);
  }, []);

  // Set unique properties from the house data
  useEffect(() => {
    const allProperties = housesData.map((house) => house.type);
    const uniqueProperties = ["Property type (any)", ...new Set(allProperties)];
    setProperties(uniqueProperties);
  }, []);

  // Function to handle filtering of houses
  const handleClick = () => {
    setLoading(true); // Start loading

    // Check if a filter is set to the default value "(any)"
    const isDefault = (str) => str.includes("(any)");

    // Extract min and max price from the price range, handle "any" case
    let minPrice = 0;
    let maxPrice = Infinity;

    if (!isDefault(price)) {
      const priceRange = price.split(" ");
      minPrice = parseInt(priceRange[0], 10);
      maxPrice = parseInt(priceRange[2], 10);
    }

    // Filter the houses based on the selected country, property, and price range
    const filteredHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price, 10);

      // Check if the house matches the selected filters
      const countryMatch = isDefault(country) || house.country === country;
      const propertyMatch = isDefault(property) || house.type === property;
      const priceMatch = housePrice >= minPrice && housePrice <= maxPrice;

      return countryMatch && propertyMatch && priceMatch;
    });

    // Simulate loading delay and update the houses state
    setTimeout(() => {
      setHouses(filteredHouses.length ? filteredHouses : []); // Show filtered houses or no results
      setLoading(false); // Stop loading
    }, 500); // Simulate a delay of 500ms
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses, // Filtered houses to display
        loading, // Loading state
        handleClick, // Function to filter houses
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
