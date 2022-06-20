import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import NoDetailsFound from "../NoAccount/NoDetailsFound";
import Loading from "../Loading/Loading";

export default function Topics() {
  const { topicName } = useParams();
  // get all topics under a subject
  const [topics, setTopic] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await (
          await fetch(
            `https://cs-tracker-backend.herokuapp.com/api/v1/topic/${topicName}`
          )
        ).json();
        setTopic(data.body);
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
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {topics.length === 0 && <NoDetailsFound />}
      {topics.length > 0 &&
        topics.map((topic) => (
          <li
            key={topic.name}
            className="col-span-1 border bg-white rounded-lg shadow divide-y divide-gray-200"
          >
            <div className="w-full flex items-center justify-between p-6 space-x-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="text-gray-900 text-sm font-medium truncate">
                    {topic.name}
                  </h3>
                  <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                    {topic.questionsCount}
                  </span>
                </div>
                <p className="mt-1 text-gray-500 text-sm truncate">
                  {topic.description}
                </p>
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="-ml-px w-0 flex-1 flex">
                  <button
                    onClick={() => navigate(`/subject-list/${topic.name}`)}
                    className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                  >
                    <span className="ml-3">Click to view all questions</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}
