import React, { useState, useContext } from "react";
import {
  RiWallet3Line,
  RiArrowDownSLine,
  RiArrowUpSLine,
} from "react-icons/ri";
import { Menu } from "@headlessui/react";
import { HouseContext } from "./HouseContext";

const PriceRangeDropdown = () => {
  const { price, setPrice } = useContext(HouseContext); // Fixed typos
  const [isOpen, setIsOpen] = useState(false);
  const prices = [
    {
      value: "Price range(any)",
    },
    {
      value: "100000-130000",
    },
    {
      value: "130000-160000",
    },
    {
      value: "160000-190000",
    },
    {
      value: "190000-220000",
    },
  ];

  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-left"
      >
        <RiWallet3Line className="dropdown-icon-primary" />
        <div>
          <div className="text-[15px] font-medium leading-tight">{price}</div>
          <div className="text-[13px]">Choose Price Range</div>
        </div>
        {isOpen ? (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>

      <Menu.Items className="dropdown-menu absolute">
        {prices.map((price, index) => (
          <Menu.Item as="li" key={index}>
            {({ active }) => (
              <button
                onClick={() => setPrice(price.value)}
                className={`cursor-pointer hover:text-violet-700 transition ${
                  active ? "bg-gray-100" : ""
                }`}
              >
                {price.value}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default PriceRangeDropdown;
