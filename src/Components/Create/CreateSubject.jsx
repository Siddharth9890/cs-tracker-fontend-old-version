import { useState } from "react";
import { ErrorModal } from "../Modals/ErrorModal";

export default function CreateSubject({ userData }) {
  const [error, setError] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [subjectDescription, setSubjectDescription] = useState("");
  const [subjectImageUrl, setSubjectImageUrl] = useState("");
  const [topicCount, setTopicCount] = useState("");
  const submitData = async (e) => {
    e.preventDefault();
    if (userData.role === "user") setError(true);
    else {
      const response = await (
        await fetch("https://cs-tracker-backend.herokuapp.com/api/v1/subject", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: subjectName,
            description: subjectDescription,
            imageUrl: subjectImageUrl,
            topicCount: topicCount,
          }),
        })
      ).json();
      console.log(response);
    }
  };
  return (
    <>
      <form onSubmit={(e) => submitData(e)} method="POST">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Create subject like dsa,web development,learn java
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share. By sharing you agree to terms and condition
              </p>
            </div>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="subject-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject Name
                </label>
                <input
                  type="text"
                  name="subject-name"
                  id="subject-name"
                  onChange={(e) => setSubjectName(e.target.value)}
                  value={subjectName}
                  autoComplete="subject-name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="subject-description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject Description
                </label>
                <input
                  type="text"
                  name="subject-description"
                  id="subject-description"
                  onChange={(e) => setSubjectDescription(e.target.value)}
                  value={subjectDescription}
                  autoComplete="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="subject-image-url"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image Url
                </label>
                <input
                  type="url"
                  name="subject-image-url"
                  id="subject-image-url"
                  onChange={(e) => setSubjectImageUrl(e.target.value)}
                  value={subjectImageUrl}
                  autoComplete="subject-image-url"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="number-of-topics"
                  className="block text-sm font-medium text-gray-700"
                >
                  Number of Topics
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  name="number-of-topics"
                  onChange={(e) => setTopicCount(e.target.value)}
                  value={topicCount}
                  id="number-of-topics"
                  autoComplete="number-of-topics"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
      <ErrorModal
        show={error}
        setOpen={setError}
        headingMessage={"You cannot submit"}
        message={"You do not have permission to perform this action"}
      />
    </>
  );
}
