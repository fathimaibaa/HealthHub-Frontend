import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { USER_API } from "../../Constants/Index";
import "../../Index.css";
import { DoctorInterface } from "../../Types/DoctorInterface";
import { DepartmentInterface } from "../../Types/DepartmentInterface";

const Body: React.FC = () => {
  const [doctors, setDoctors] = useState<DoctorInterface[]>([]);
  const [departments, setDepartments] = useState<{ [key: string]: string }>({});
  const [hoveredDoctorId, setHoveredDoctorId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctorsAndDepartments = async () => {
      try {
        const deptResponse: any = await axios.get(`${USER_API}/department/list`);

        const listedDepartments = deptResponse.data.departments.filter(
          (dept: DepartmentInterface) => dept.isListed
        );

        const departmentMap = listedDepartments.reduce(
          (acc: { [key: string]: string }, dept: DepartmentInterface) => {
            acc[dept._id] = dept.departmentName;
            return acc;
          },
          {}
        );

        const docResponse: any = await axios.get(`${USER_API}/doctors`);

        const approvedDoctors = docResponse.data.doctors.filter(
          (doctor: DoctorInterface) => doctor.isApproved
        );

        const doctorsWithDepartments = approvedDoctors.filter(
          (doctor: DoctorInterface) =>
            departmentMap[doctor.department as string]
        );

        setDepartments(departmentMap);
        setDoctors(doctorsWithDepartments);
      } catch (error) {
        console.error("Error fetching doctors or departments:", error);
      }
    };

    fetchDoctorsAndDepartments();
  }, []);

  const handleMouseEnter = (doctorId: string) => {
    setHoveredDoctorId(doctorId);
  };

  const handleMouseLeave = () => {
    setHoveredDoctorId(null);
  };

  return (
    <div className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-12 m-4 sm:m-10 rounded-xl">
      <h1 className="text-3xl sm:text-4xl font-bold text-purple-900 text-center mb-8 sm:mb-10">
        Our Doctors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
        {doctors.map((doctor) => (
          <Link key={doctor._id} to={`/user/doctor/${doctor._id}`}>
            <div
              onMouseEnter={() => handleMouseEnter(doctor._id)}
              onMouseLeave={handleMouseLeave}
              className={`doctor-card bg-purple-900 rounded-lg shadow-lg cursor-pointer transition-all duration-300 transform ${
                hoveredDoctorId && hoveredDoctorId !== doctor._id
                  ? "sm:blur-sm"
                  : ""
              }`}
            >
              <div className="flex justify-center items-center h-56 sm:h-64 overflow-hidden rounded-t-lg relative">
                <img
                  src={doctor.profileImage}
                  alt="Doctor"
                  className="w-full h-full object-cover absolute"
                />
              </div>

              <div className="p-4">
                <h2 className="text-xl sm:text-2xl font-bold text-center text-white">
                  Dr. {doctor.doctorName}
                </h2>
                <p className="text-white font-semibold text-center mt-1">
                  {departments[doctor.department as string]}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;