import React from 'react';
import doctor from '../../Assets/Images/doctor.jpeg'; 

const Banner: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full h-[70vh] bg-white text-purple-900 py-10 lg:py-16 px-4 lg:px-12 rounded-lg shadow-md">
      <div className="lg:w-1/2 flex flex-col items-start justify-center text-left space-y-3">
        <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
          Welcome, Doctor!
        </h1>
        <p className="text-xl lg:text-2xl font-light">
          Manage your appointments and patient information effortlessly with our platform.
        </p>
      </div>
      <div className="lg:w-1/2 flex justify-center lg:justify-end mt-6 lg:mt-0">
        <img
          src={doctor}
          alt="Doctor Consultation"
          className="w-3/4 lg:w-full max-w-lg rounded-md shadow-lg"
        />
      </div>
    </div>
  );
};

export default Banner;
