import { useEffect, useState } from "react";
import axiosJWT from "../Utils/AxiosService";
import { BookingInterface } from "../Types/BookingInterface";
import { ADMIN_API } from "../Constants/Index";

interface ReportsResponse {
  reports: BookingInterface[];
}

const useReports = () => {
  const [reports, setReports] = useState<BookingInterface[]>([]);

  useEffect(() => {
    axiosJWT
      .get<ReportsResponse>(ADMIN_API + "/reports")
      .then(({ data }) => {
        setReports(data.reports);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setReports]);

  return { reports, setReports };
};

export default useReports;