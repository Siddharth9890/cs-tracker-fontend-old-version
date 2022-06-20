import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import NoAccount from "../NoAccount/NoAccount";
import Loading from "../Loading/Loading";

export default function Revision() {
  const navigate = useNavigate();
  // get all questions which have a revision date and done by a user
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { userData } = useContext(UserContext);
  useEffect(() => {
    const getQuestions = async (userData) => {
      if (userData) {
        const response = await fetch(
          `https://cs-tracker-backend.herokuapp.com/api/v1/revision/${userData.email}`
        );
        const { body } = await response.json();
        const sortedQuestions = body.sort((a, b) =>
          a.revisionDate.localeCompare(b.revisionDate)
        );
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const sortedQuestionsAsPerDate = sortedQuestions.filter(
          (question) => today.toISOString() < question.revisionDate
        );

        setQuestions(sortedQuestionsAsPerDate);
      }
      setIsLoading(false);
    };
    setIsLoading(true);
    getQuestions(userData);
    return () => {
      setQuestions([]);
    };
  }, []);

  const handleRemove = async (questionName, questionIdx) => {
    const newList = questions.filter((item) => item.id !== questionIdx);
    const response = await (
      await fetch(
        `https://cs-tracker-backend.herokuapp.com/api/v1/revision/${userData.email}/${questionName}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    ).json();
    setQuestions(newList);
  };

  return isLoading ? (
    <Loading isLoading={isLoading} />
  ) : (
    <>
      {userData === null && <NoAccount />}
      {userData != null && (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Section
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions.length > 0 &&
                      questions.map((question, questionIdx) => (
                        <tr
                          key={questionIdx}
                          className={
                            questionIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {question.questionName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {question.questionTopic}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(question.revisionDate).toDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={() => {
                                handleRemove(
                                  question.questionName,
                                  questionIdx
                                );
                                navigate(
                                  `/single-question/${question.questionTopic}/${question.questionName}`
                                );
                              }}
                            >
                              Click to revise it!
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
