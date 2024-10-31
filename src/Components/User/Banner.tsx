import React from 'react';
import doctorWindow from '../../Assets/Images/doctorWindow.png';

const Banner: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full h-[70vh] bg-purple-900 text-white py-8 lg:py-16 px-4 lg:px-16 rounded-lg shadow-md">
      
      <div className="lg:w-1/2 flex flex-col items-start justify-center text-left space-y-4 animate-[fadeInSlideUp_1s_ease-out]">
        <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
          Effortless Doctor Appointments
        </h1>
        <p className="text-xl lg:text-2xl font-light">
          Streamline your healthcare experience with our intuitive scheduling platform.
        </p>
      </div>
      
      <div className="lg:w-1/2 flex justify-center lg:justify-end mt-6 lg:mt-0">
        <img
          src={doctorWindow}
          alt="Doctor Consultation"
          className="w-3/4 lg:w-full max-w-lg rounded-md  animate-[zoomIn_1.2s_ease-out]"
        />
      </div>
      
    </div>
  );
};

export default Banner;
