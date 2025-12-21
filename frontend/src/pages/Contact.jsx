import React from "react";

function Contact() {
  return (
    <div className="bg-[#F7F2EB] min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-[#2E563F] mb-8">
          Contact Us
        </h1>

        <p className="text-lg text-[#4A5C4F] leading-relaxed">
          We're here to help! Feel free to reach out to us through any of the
          options below.
        </p>

        <div className="mt-10 bg-[#F5F0E9] border border-[#D6CEC2] shadow-md rounded-2xl p-8 space-y-5">
          <p className="text-lg text-[#2E563F] font-semibold">
            📧 Email:
            <span className="font-normal text-[#4A5C4F]">
              support@onlinebookstore.com
            </span>
          </p>

          <p className="text-lg text-[#2E563F] font-semibold">
            📞 Phone:
            <span className="font-normal text-[#4A5C4F]"> +961 70 000 000</span>
          </p>

          <p className="text-lg text-[#2E563F] font-semibold">
            📍 Location:
            <span className="font-normal text-[#4A5C4F]"> Beirut, Lebanon</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
