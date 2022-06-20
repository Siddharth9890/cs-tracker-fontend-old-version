import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import NoAccount from "../NoAccount/NoAccount";

const stats = [
  { name: "Total Questions Solved in 30 days", stat: "N/A" },
  { name: "Avg. Corrected Questions", stat: "N/A" },
  { name: "Avg. Wrong  Questions", stat: "N/A" },
];

export default function Profile() {
  const { userData, signOutContext } = useContext(UserContext);
  return userData === null ? (
    <NoAccount />
  ) : (
    <div className="relative min-h-screen  bg-gray-100">
      <main className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex items-center space-x-5">
            <div className="flex-shrink-0"></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {userData.name}
              </h1>
              <p className="text-sm font-medium text-gray-500">
                Joining Date:-
                <time dateTime="2020-08-25">
                  {new Date(userData.joiningDate).toDateString()}
                </time>
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
            <button
              type="button"
              onClick={() => signOutContext()}
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-100 shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-800 to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              Log Out
            </button>
          </div>
        </div>

        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2
                    id="applicant-information-title"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    User Information
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Personal details.
                  </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        User Name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {userData.name}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {userData.email}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Number of Questions Done
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">000</dd>
                    </div>

                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        About
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        No info yet. Coming Soon!
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Last 30 days Stats
              </h3>
              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {stats.map((item) => (
                  <div
                    key={item.name}
                    className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
                  >
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.name}
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                      {item.stat}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
