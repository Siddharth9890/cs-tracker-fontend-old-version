import { useState } from "react";
import { ErrorModal } from "../Modals/ErrorModal";

export default function CreateQuestion({ userData }) {
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [leetcodeLink, setLeetCodeLink] = useState("");
  const [question, setQuestion] = useState("");
  const submitData = async (e) => {
    e.preventDefault();
    if (userData.role === "user") setError(true);
    else {
      const response = await (
        await fetch("https://cs-tracker-backend.herokuapp.com/api/v1/question", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            difficulty: difficulty,
            linkToSolution: youtubeLink,
            topicUnderSubject: question,
            linkToLeetCode: leetcodeLink,
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
                Create question like reverse a linked list,invert binary tree
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share. By sharing you agree to terms and condition
              </p>
            </div>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="question-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name of question
                </label>
                <input
                  type="text"
                  name="question-name"
                  id="question-name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  autoComplete="given-name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="question-difficulty"
                  className="block text-sm font-medium text-gray-700"
                >
                  Difficulty
                </label>
                <select
                  id="question-difficulty"
                  name="question-difficulty"
                  onChange={(e) => setDifficulty(e.target.value)}
                  defaultValue={"easy"}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value={"easy"}>easy</option>
                  <option value={"medium"}>medium</option>
                  <option value={"hard"}>hard</option>
                </select>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="question-solution-video"
                  className="block text-sm font-medium text-gray-700"
                >
                  link to solution video give a youtube link only
                </label>
                <input
                  type="url"
                  name="question-solution-video"
                  onChange={(e) => setYoutubeLink(e.target.value)}
                  value={youtubeLink}
                  id="question-solution-video"
                  autoComplete="question-solution-video"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label
                  htmlFor="question-leetcode-link"
                  className="block text-sm font-medium text-gray-700"
                >
                  link to leet code
                </label>
                <input
                  type="url"
                  name="question-leetcode-link"
                  id="question-leetcode-link"
                  onChange={(e) => setLeetCodeLink(e.target.value)}
                  value={leetcodeLink}
                  autoComplete="address-level2"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label
                  htmlFor="question-topic"
                  className="block text-sm font-medium text-gray-700"
                >
                  this question comes under which topic
                </label>
                <input
                  type="text"
                  name="question-topic"
                  onChange={(e) => setQuestion(e.target.value)}
                  value={question}
                  id="question-topic"
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
