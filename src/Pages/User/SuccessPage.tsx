import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Navbar from "../../Components/User/Navbar/Navbar";
import PaymentMessage from "../../Components/User/Payment";
import axiosJWT from "../../Utils/AxiosService";
import { USER_API } from "../../Constants/Index";
import Footer from "../../Components/User/Footer/Footer";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams();

  const status = searchParams.get("success");
  const isSuccess = status === "true";

  useEffect(() => {
    if (!status || !id) return;

    const paymentStatus = isSuccess ? "Paid" : "Failed";
    axiosJWT
      .patch(USER_API + `/payment/status/${id}`, { paymentStatus })
      .then(({ data }) => console.log(data))
      .catch((err: unknown) => console.log(err));
  }, [status, id, isSuccess]);

  return (
    <>
      <Navbar />
      <PaymentMessage isSuccess={isSuccess} />
      <Footer />
    </>
  );
};

export default SuccessPage;
