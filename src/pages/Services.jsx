import React from "react";

function Services() {
  return (
    <div className="bg-[#F7F2EB] min-h-screen px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-[#2E563F] mb-8">
          Our Services
        </h1>

        <ul className="mt-10 text-lg space-y-6 text-[#4A5C4F] leading-relaxed">
          <li className="bg-[#F5F0E9] p-4 rounded-xl border border-[#D6CEC2] shadow-sm">
            Fast & reliable book delivery
          </li>

          <li className="bg-[#F5F0E9] p-4 rounded-xl border border-[#D6CEC2] shadow-sm">
            Access to e-books & digital content
          </li>

          <li className="bg-[#F5F0E9] p-4 rounded-xl border border-[#D6CEC2] shadow-sm">
            Personalized book recommendations
          </li>

          <li className="bg-[#F5F0E9] p-4 rounded-xl border border-[#D6CEC2] shadow-sm">
            Premium membership & exclusive discounts
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Services;
