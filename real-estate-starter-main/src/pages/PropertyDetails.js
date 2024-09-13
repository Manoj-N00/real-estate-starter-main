import React from "react";
import { housesData } from "../data";
import { useParams } from "react-router-dom";
import { BiBed, BiBath, BiArea } from "react-icons/bi";

const PropertyDetails = () => {
  const { id } = useParams(); // Correctly calling useParams as a function
  const house = housesData.find((house) => house.id === parseInt(id));

  // Fallback if house is not found
  if (!house) {
    return <div>Property not found</div>;
  }

  return (
    <section>
      <div className="container mx-auto min-h-[800px]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{house.name}</h2>
            <h3 className="text-lg mb-4">{house.address}</h3>
          </div>
          <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
            <div className="bg-green-500 text-white px-3 rounded-full">
              {house.type}
            </div>
            <div className="bg-violet-500 text-white px-3 rounded-full">
              {house.country}
            </div>
          </div>
          <div className="text-3xl font-semibold text-violet-600">
            ${house.price}
          </div>
        </div>
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="max-w-[700px]">
            <div className="mb-8">
              <img src={house.imageLg} alt="Property" />
            </div>
            <div className="flex gap-x-6 text-violet-700 mb-6">
              <div className="flex gap-x-2 items-center">
                <BiBed className="text-2xl" />
                <div>{house.bedrooms}</div>
              </div>
              <div className="flex gap-x-2 items-center">
                <BiBath className="text-2xl" />
                <div>{house.bathrooms}</div>
              </div>
              <div className="flex gap-x-2 items-center">
                <BiArea className="text-2xl" />
                <div>{house.surface}</div>
              </div>
            </div>
            <div>{house.description}</div>
          </div>
          <div className="bg-white p-5 shadow-lg rounded-lg">
            <h4 className="text-lg font-semibold mb-4">Contact Agent</h4>
            <div className="flex items-center gap-x-4 mb-4">
              <img
                src={house.agent.image}
                alt="Agent"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <div className="text-lg font-medium">{house.agent.name}</div>
              </div>
            </div>
            <button
              onClick={() => alert("Message sent!")} // Replace with actual message sending logic
              className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition"
            >
              Send a Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
