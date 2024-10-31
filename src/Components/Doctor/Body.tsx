import React from "react";
import { MdDateRange, MdList } from "react-icons/md";
import { Link } from "react-router-dom";

const Body: React.FC = () => {
  return (
    <main className="flex flex-1 w-full container mx-auto px-4 py-8 font-[Poppins]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
          <div className="p-4 lg:p-6">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-3">
              Welcome to Your Portal
            </h2>
            <p className="text-gray-600 mb-3">Find the patients and schedule slots easily.</p>
            <div className="flex space-x-3">
              <Link
                to="/doctor/slot"
                className="flex items-center justify-center bg-purple-700 text-white font-medium py-2 px-4 rounded-full focus:outline-none hover:bg-purple-800 transition-colors"
              >
                <MdDateRange className="w-5 h-5 mr-1" />
                Schedule Appointment
              </Link>
              <Link
                to="/doctor/patientList"
                className="flex items-center justify-center bg-purple-700 text-white font-medium py-2 px-4 rounded-full focus:outline-none hover:bg-purple-800 transition-colors"
              >
                <MdList className="w-5 h-5 mr-1" />
                Patient List
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
          <div className="p-4 lg:p-6">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-3">Latest Updates</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>New doctors have joined our team.</li>
              <li>Improved patient care services.</li>
              <li>Updated appointment scheduling system.</li>
              <li>Exciting offers on health checkups.</li>
              <li>Expanded coverage for telemedicine services.</li>
              <li>Enhanced patient feedback system.</li>
              <li>Make the world healthy.</li>
              <li>Give free consultation.</li>
            </ul>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Body;
