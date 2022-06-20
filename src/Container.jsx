import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loading from "./Components/Loading/Loading";
import NoDetailsFound from "./Components/NoAccount/NoDetailsFound";
export default function Container() {
  // get all subjects
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const response = await (
          await fetch(
            "https://cs-tracker-backend.herokuapp.com/api/v1/subject"
          )
        ).json();
        setSubjects(response.body);
        setIsLoading(false);
      } catch (error) {}
    }
    getData();
    return () => {
      setSubjects([]);
    };
  }, []);

  const navigate = useNavigate();

  return isLoading ? (
    <Loading isLoading={isLoading} />
  ) : (
    <div className="bg-gray-100">
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Our Stuff
            </h2>
            <p className="text-xl text-gray-500">
              Want to learn Java covered!. Want to revise DSA done!. Want to
              learn Web development got it!
            </p>
          </div>
          <ul
            role="list"
            className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
          >
            {subjects.length === 0 && <NoDetailsFound />}
            {subjects.length > 0 &&
              subjects.map((subject) => (
                <li key={subject.name}>
                  <div className="space-y-4">
                    <div className="aspect-w-3 aspect-h-2">
                      <img
                        className="object-cover shadow-lg rounded-lg"
                        src={subject.imageUrl}
                        alt={subject.name}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="text-lg leading-6 font-medium space-y-1">
                        <h3>{subject.name}</h3>
                        <p className="text-indigo-600">{subject.description}</p>
                      </div>
                      <ul role="list" className="flex space-x-5">
                        <li>
                          <button
                            onClick={() => navigate(`/topic/${subject.name}`)}
                          >
                            Click to explore
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
