import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
import { Switch } from "@headlessui/react";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { SuccessModal } from "../Modals/SuccessModal";
import { SuccessModalForLeetCode } from "../Modals/SuccessModalForLeetCode";
import { ErrorModal } from "../Modals/ErrorModal";

import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/userContext";
import "./SingleQuestion.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SingleQuestionDescription({ question }) {
  const { userData } = useContext(UserContext);
  const [submittedData, setSubmittedData] = useState();
  useEffect(() => {
    const getOneQuestionDoneByUser = async () => {
      const response = await (
        await fetch(
          `https://cs-tracker-backend.herokuapp.com/api/v1/submission/${userData.email}/${question.name}`
        )
      ).json();
      setSubmittedData(response.body[0]);
    };
    if (userData) getOneQuestionDoneByUser();
  }, []);

  const [solutionButton, setSolutionButton] = useState(false);
  const [motivationButton, setMotivationButton] = useState(false);
  const [revisionButton, setRevisionButton] = useState(false);
  const [userNotError, setUserNotError] = useState(false);
  const [error, setError] = useState(false);

  const [submitButton, setSubmitButton] = useState(false);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  const [leetCodeButton, setLeetCodeButton] = useState(false);
  const [revisionDate, setRevisionDate] = useState(null);
  const submitData = async (question) => {
    setDisableSubmitButton(true);
    if (userData === null) {
      setUserNotError(true);
    } else {
      const response = await fetch(
        "https://cs-tracker-backend.herokuapp.com/api/v1/submission",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            questionName: question.name,
            questionTopic: question.topicUnderSubject,
            submittedBy: userData.email,
            isCompleted: true,
            completionDate: new Date(Date.now()),
            difficulty: question.difficulty,
            revisionDate: revisionDate ? revisionDate : undefined,
          }),
        }
      );
      const result = await response.json();
      if (result.message === "failed") {
        setError(true);
      } else {
        setSubmitButton(true);
      }
      setSolutionButton(false);
      setRevisionButton(false);
    }
    setDisableSubmitButton(false);
  };

  return (
    <div className="bg-white  px-4 py-5 border-b border-gray-200 sm:px-6">
      <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <div className="flex items-center">
            <div className="ml-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {question.name}
              </h3>
            </div>
          </div>
        </div>
        <div className="ml-4 mt-4 flex-shrink-0 flex">
          <button
            type="button"
            onClick={() => setLeetCodeButton(true)}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PhoneIcon
              className="-ml-1 mr-2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <span>Click here to solve it on leetcode!</span>
          </button>
          <button
            type="button"
            onClick={() => submitData(question)}
            disabled={disableSubmitButton}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <MailIcon
              className="-ml-1 mr-2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <span>Click to Submit</span>
          </button>
        </div>
      </div>
      <div className="py-16  bg-white overflow-hidden calendar ">
        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
          <div className="relative z-10 text-base max-w-prose mx-auto lg:max-w-5xl lg:mx-0 lg:pr-72">
            <p className="text-lg text-gray-500">{question.description}</p>
            <p className="text-lg text-gray-500">
              Last Completed Date:-
              {submittedData !== undefined
                ? new Date(submittedData.completionDate).toDateString()
                : "N / A"}
            </p>
            <p className="text-lg text-gray-500">
              Revision Date:-
              {submittedData !== undefined
                ? new Date(submittedData.revisionDate).toDateString()
                : "N / A"}
            </p>
          </div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
            <div className="relative z-10">
              <div className="mt-10 flex text-base max-w-prose mx-auto lg:max-w-none">
                <div className="rounded-md shadow">
                  <Switch.Group
                    as="div"
                    className=" py-1 flex items-center justify-between"
                  >
                    <span className="flex-grow flex flex-col">
                      <Switch.Label
                        as="span"
                        className="text-sm font-medium text-gray-900"
                        passive
                      >
                        Do yu want to see the solution video?
                      </Switch.Label>
                    </span>

                    <Switch
                      checked={solutionButton}
                      onChange={setSolutionButton}
                      className={classNames(
                        solutionButton ? "bg-indigo-600" : "bg-gray-200",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          solutionButton ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        )}
                      />
                    </Switch>
                  </Switch.Group>
                  {solutionButton && (
                    <a
                      href={question.linkToSolution}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      Solution here
                    </a>
                  )}
                  <Switch.Group
                    as="div"
                    className=" py-1 flex items-center justify-between"
                  >
                    <span className="flex-grow flex flex-col">
                      <Switch.Label
                        as="span"
                        className="text-sm font-medium text-gray-900"
                        passive
                      >
                        Did you remember the solution of the question
                        completely?
                      </Switch.Label>
                    </span>
                    <Switch
                      checked={motivationButton}
                      onChange={setMotivationButton}
                      className={classNames(
                        motivationButton ? "bg-indigo-600" : "bg-gray-200",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          motivationButton ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        )}
                      />
                    </Switch>
                  </Switch.Group>
                  <Switch.Group
                    as="div"
                    className=" py-1 flex items-center justify-between"
                  >
                    <span className="flex-grow flex flex-col">
                      <Switch.Label
                        as="span"
                        className="text-sm font-medium text-gray-900"
                        passive
                      >
                        Do you want to set a date to revise the question?
                      </Switch.Label>
                    </span>
                    <Switch
                      checked={revisionButton}
                      onChange={setRevisionButton}
                      className={classNames(
                        revisionButton ? "bg-indigo-600" : "bg-gray-200",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          revisionButton ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        )}
                      />
                    </Switch>
                  </Switch.Group>
                  {revisionButton && (
                    <div className="date-picker">
                      <DatePicker
                        selected={revisionDate}
                        minDate={new Date()}
                        onChange={(date) => setRevisionDate(date)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        show={submitButton}
        setOpen={setSubmitButton}
        headingMessage={"Thanks for submitting"}
        message={
          "Your response is recorded if you have set a revision date then please check revision tab"
        }
      />
      <SuccessModalForLeetCode
        show={leetCodeButton}
        setOpen={setLeetCodeButton}
        headingMessage={"You can now go to leetcode!"}
        message={
          "Click on ok we will redirect you to page to solve the problem on leetcode after you are done please press on submit button to record the question "
        }
        href={question.linkToLeetCode}
      />

      <SuccessModal
        show={motivationButton}
        setOpen={setMotivationButton}
        headingMessage={""}
        message={
          "It's absoultey ok to not to remember the solution completely 🙌🙌. Maybe you have forgot the solution no problem you can check the solution video attached at all keep going at last practice makes a man perfect 😊😊"
        }
      />
      <ErrorModal
        show={userNotError}
        setOpen={setUserNotError}
        headingMessage={"You cannot submit"}
        message={
          "You dont have a account so you cant submit the question. Please create a account first to proceed"
        }
      />
      <ErrorModal
        show={error}
        setOpen={setError}
        headingMessage={"You cannot submit"}
        message={
          "There is some problem on server please try again. If problem persist contact support"
        }
      />
    </div>
  );
}
