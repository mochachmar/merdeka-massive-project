import React from "react";
import { CheckmarkOutline } from "react-ionicons";

const CardUpgradePlan = ({
  title,
  price,
  description,
  buttonText,
  features,
  sub,
  buttonAction,
}) => {
  return (
    <div
      className="border rounded-lg p-6 shadow-lg bg-white flex-1 
                 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-lg font-semibold mb-4">{price}</p>
      <p className="text-gray-700 mb-4">{description}</p>
      
      <button
        onClick={buttonAction}
        className="bg-[#6D7E5E] text-white px-4 py-2 rounded-md mb-4 
                   hover:bg-[#91A079] transition-colors duration-300"
      >
        {buttonText}
      </button>

      {/* Sub-text */}
      {sub && <p className="text-gray-700 font-semibold mb-4">{sub}</p>}

      {/* Features List */}
      <ul className="text-gray-700 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            {/* Icon Centang */}
            <CheckmarkOutline
              color={"#000000"}
              height="20px" 
              width="20px" 
            />
            <span className="ml-2">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardUpgradePlan;
