import { useState } from "react";
import { ErrorModal } from "../Modals/ErrorModal";

export default function CreateTopic({ userData }) {
  const [error, setError] = useState(false);
  const [topicName, setTopicName] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [topicCount, setTopicCount] = useState("");
  const [UnderWhichSubjectTopic, setUnderWhichSubjectTopic] = useState("");
  const submitData = async (e) => {
    e.preventDefault();
    if (userData.role === "user") setError(true);
    else {
      const response = await (
        await fetch("https://cs-tracker-backend.herokuapp.com/api/v1/topic", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: topicName,
            description: topicDescription,
            subject: UnderWhichSubjectTopic,
            questionsCount: topicCount,
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
                Create topics like linked list,binary tree
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share. By sharing you agree to terms and condition
              </p>
            </div>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="topic-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name of topic
                </label>
                <input
                  type="text"
                  name="topic-name"
                  id="topic-name"
                  onChange={(e) => setTopicName(e.target.value)}
                  value={topicName}
                  autoComplete="given-name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="topic-description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="topic-description"
                  id="topic-description"
                  onChange={(e) => setTopicDescription(e.target.value)}
                  value={topicDescription}
                  autoComplete="topic-description"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="number-topic"
                  className="block text-sm font-medium text-gray-700"
                >
                  Number of questions
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  name="number-topic"
                  onChange={(e) => setTopicCount(e.target.value)}
                  value={topicCount}
                  id="number-topic"
                  autoComplete="number-topic"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label
                  htmlFor="topic-subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Under which subject is the topic
                </label>
                <input
                  type="text"
                  name="topic-subject"
                  id="topic-subject"
                  onChange={(e) => setUnderWhichSubjectTopic(e.target.value)}
                  value={UnderWhichSubjectTopic}
                  autoComplete="address-level2"
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
