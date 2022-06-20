import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { ErrorModal } from "../Modals/ErrorModal";
import { UserContext } from "../../context/userContext";
import Alerts from "../CreateAccount/Alerts";

export default function SignInPage() {
  const { signInContext } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openError, setOpenError] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setSubmitButtonDisabled(true);
    const response = await fetch("https://cs-tracker-backend.herokuapp.com/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    if (result.message === "failed") {
      setOpenError(true);
    } else {
      signInContext(result.body.result);
      localStorage.clear();
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: result.body.result.email,
          token: result.body.token,
        })
      );
      navigate("/");
    }
    setSubmitButtonDisabled(false);
  };

  function SubmitButton() {
    if (email && password.length > 8) {
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
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <button
              onClick={() => navigate("/createAccount")}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create a new account
            </button>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" method="POST" onSubmit={submit}>
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
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <SubmitButton/>
            </form>
          </div>
        </div>
      </div>
      <ErrorModal
        show={openError}
        setOpen={setOpenError}
        headingMessage={"Something went wrong"}
        message={
          "Your email or password is wrong please check again or contact support"
        }
      />
    </>
  );
}
