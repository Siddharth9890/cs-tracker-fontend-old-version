import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ErrorModal } from "../Modals/ErrorModal";
import { UserContext } from "../../context/userContext";
import Notification from "../Notification/Notification";
import Alerts from "./Alerts";

export default function CreateAccountPage() {
  const { signInContext } = useContext(UserContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [openError, setOpenError] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [actualOtp, setActualOtp] = useState("");
  const [successOtp, setSuccessOtp] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirmedPassword) {
      setOpenError(true);
    } else {
      const response = await fetch("https://cs-tracker-backend.herokuapp.com/api/v1/user/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const result = await response.json();
      if (result.message === "failed") setOpenError(true);
      else {
        signInContext(result.body);
        localStorage.setItem(
          "user",
          JSON.stringify({ email: result.body.email, token: result.body.token })
        );
        navigate("/");
      }
    }
  };

  const sendOtpFunction = async () => {
    setSendOtp(true);
    const response = await (
      await fetch("http://localhost:5000/api/v1/user/sendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
    ).json();
    if (response.message === "failed") setOpenError(true);
    else if (response.message === "success") {
      setActualOtp(response.body.otp);
      setSuccessOtp(true);
    }
  };

  function SendOtpButton() {
    if (
      name &&
      email.includes("@") &&
      password.length > 8 &&
      password === confirmedPassword
    ) {
      return (
        <div>
          <button
            type="submit"
            onClick={() => sendOtpFunction()}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send otp
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            disabled
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send otp
          </button>
        </div>
      );
    }
  }

  function SubmitButton() {
    if (
      name &&
      email &&
      password.length > 8 &&
      password === confirmedPassword
    ) {
      return (
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <Alerts />
          <button
            disabled
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      );
    }
  }

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-12 w-auto" src={logo} alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <button
              onClick={() => navigate("/signIn")}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </button>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" method="POST" onSubmit={submit}>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="current-name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmed-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirmed Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmed-password"
                    name="confirmed-password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                    value={confirmedPassword}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* <SendOtpButton /> */}
                </div>
                {/* {sendOtp && (
                  <div>
                    <label
                      htmlFor="otp"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Enter OTP
                    </label>
                    <div className="mt-1">
                      <input
                        id="otp"
                        name="otp"
                        type="number"
                        autoComplete="otp"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => setOtp(e.target.value)}
                        value={otp}
                      />
                    </div>
                  </div>
                )} */}
                {/* <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                  </a>
                </div> */}
              </div>
              <SubmitButton />
            </form>
          </div>
        </div>
      </div>
      <ErrorModal
        show={openError}
        setOpen={setOpenError}
        headingMessage={"Something went wrong"}
        message={
          "please check your information or otp. Or please try again after some time"
        }
      />
      {/* <Notification
        show={successOtp}
        setShow={setSuccessOtp}
        headingMessage={"Otp send"}
        message={"please check your email for otp"}
      /> */}
    </>
  );
}
