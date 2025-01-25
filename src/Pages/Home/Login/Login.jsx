import React, { useContext } from "react";
import handsPhoto from "../../../assets/images/hands.png";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const { signIn, setIsDropdownOpen } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data.email, data.password);
    signIn(data.email, data.password)
      .then(() => {
        setIsDropdownOpen(false);
        Swal.fire({
          icon: "success",
          title: "User login successful!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate(from || "/", { replace: true });
        });
      })
      .catch((error) => {
        const errorMessage = error.message
          .replace(/^Firebase: Error \(auth\//, "")
          .replace(/\)\.$/, "");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
        });
      });
  };

  return (
    <section className="bg-gray-50 h-full py-10">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
        {/* Left Section: Form */}
        <div className="md:w-1/2 bg-white p-6  rounded-lg shadow-lg w-full mt-8 sm:mt-0">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                name="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                autoComplete="email"
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="mt-2 text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="mt-2 text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center">Are your new? <Link to="/registration"><span className="text-blue-500 font-semibold hover:underline cursor-pointer">Register here.</span></Link></p>
        </div>

        {/* Right Section: Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={handsPhoto}
            alt="Registration"
            className="w-full max-w-sm object-contain max-h-72 rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
