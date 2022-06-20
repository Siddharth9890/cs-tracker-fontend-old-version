import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import NoDetailsFound from "../NoAccount/NoDetailsFound";
import Loading from "../Loading/Loading";

export default function QuestionList() {
  const { subjectName } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // get all questions under a topic
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const data = await (
          await fetch(
            `https://cs-tracker-backend.herokuapp.com/api/v1/question/${subjectName}`
          )
        ).json();
        setQuestions(data.body);
        setIsLoading(false);
      } catch (error) {}
    }
    getData();
  }, []);
  const navigate = useNavigate();
  return isLoading ? (
    <Loading isLoading={isLoading} />
  ) : (
    <ul
      role="list"
      className=" mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {questions.length === 0 && <NoDetailsFound />}
      {questions.map((question) => (
        <li
          key={question.name}
          className="border col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
        >
          <div className="flex-1 flex flex-col p-8">
            <button
              onClick={() =>
                navigate(`/single-question/${subjectName}/${question.name}`)
              }
            >
              <h3 className="mt-6 text-gray-900 text-sm font-medium">
                {question.name}
              </h3>
              <dl className="mt-1 flex-grow flex flex-col justify-between">
                <dt className="sr-only">Role</dt>
                <dd className="mt-3">
                  <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                    Difficulty {question.difficulty}
                  </span>
                </dd>
              </dl>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
