import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { ErrorModal } from "../Modals/ErrorModal";

export default function Api() {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  console.log(userData);
  const [error, setError] = useState(false);

  const nextPage = () => {
    if (userData.role === "admin") navigate("/api/list");
    else setError(true);
  };
  return (
    <>
      <div className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
          <div className="text-base max-w-prose mx-auto lg:max-w-none">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              API
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              To create questions please read below terms
            </p>
          </div>
          <div className="relative z-10 text-base max-w-prose mx-auto lg:max-w-5xl lg:mx-0 lg:pr-72">
            <p className="text-lg text-gray-500">
              While creating questions or topics you need to add necessary stuff
              only. Dont add any external links otherwise will be removed and
              deleted.
            </p>
          </div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
            <div className="relative z-10">
              <div className="prose prose-indigo text-gray-500 mx-auto lg:max-w-none">
                <p>
                  We are not affiliated with pepcoding or leetcode. We are only
                  using because the entire community loves pepcoding teaching
                  style.
                </p>

                <p>
                  If you have any suggestion you can contact us directly. We
                  would love to hear it!
                </p>
                <br />
                <h3>We’re here to help </h3>
                <p className="font-bold">
                  If you have any doubt we are here to help. Please contact us
                  to get the permission to create stuff if you don't have.
                </p>
              </div>
              <div className="mt-10 flex text-base max-w-prose mx-auto lg:max-w-none">
                <div className="rounded-md shadow">
                  <button
                    onClick={() => nextPage()}
                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    I Agree to terms
                  </button>
                </div>
                <div className="rounded-md shadow ml-4">
                  <a
                    href="mailto:varan.bhalla@gmail.com"
                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-12 relative text-base max-w-prose mx-auto lg:mt-0 lg:max-w-none">
              <svg
                className="absolute top-0 right-0 -mt-20 -mr-20 lg:top-auto lg:right-auto lg:bottom-1/2 lg:left-1/2 lg:mt-0 lg:mr-0 xl:top-0 xl:right-0 xl:-mt-20 xl:-mr-20"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="bedc54bc-7371-44a2-a2bc-dc68d819ae60"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#bedc54bc-7371-44a2-a2bc-dc68d819ae60)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <ErrorModal
        setOpen={setError}
        show={error}
        headingMessage={"You are not allowed to go ahead"}
        message={"Please contact support to get the permission"}
      />
    </>
  );
}
