import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import NoDetailsFound from "../NoAccount/NoDetailsFound";
import SingleQuestionDescription from "./SingleQuestionDescription";

export default function SingleQuestion() {
  const { subjectName, questionName } = useParams();
  // get a single question
  const [question, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const data = await (
          await fetch(
            `https://cs-tracker-backend.herokuapp.com/api/v1/question/${subjectName}/${questionName}`
          )
        ).json();
        setQuestions(data.body);
        setIsLoading(false);
      } catch (error) {}
    }
    getData();
    return () => {
      setQuestions([]);
    };
  }, []);
  return isLoading ? (
    <Loading isLoading={isLoading} />
  ) : (
    <div className="min-h-screen bg-white">
      {!question && <NoDetailsFound />}
      {question && (
        <div className="py-10">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                Question Details
              </h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="px-4 py-8 sm:px-0">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                  <SingleQuestionDescription question={question} />
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
//
