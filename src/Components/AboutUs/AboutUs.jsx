import sid from "../../assets/images/siddharth.png";
import varan from "../../assets/images/varandeep.jpg";
import shreyas from "../../assets/images/shreyas.png";
import github from "../../assets/github.png";
import website from "../../assets/website.png";



const people = [
  {
    name: "Siddharth Singh",
    role: "Full Stack Developer",
    imageUrl: sid,
    githubUrl: "https://github.com/Siddharth9890",
    personalWebsiteUrl: "https://siddharth9890.pages.dev/",
  },
  {
    name: "Vareendeep Bhalla",
    role: "Full Stack Developer",
    imageUrl: varan,
    githubUrl: "https://github.com/varan5",
    personalWebsiteUrl: "https://varan5.github.io/",
  },
  {
    name: "Shreyas Bansode",
    role: "Full Stack Developer,Android Developer",
    imageUrl: shreyas,
    githubUrl: "https://github.com/hishreyas",
    personalWebsiteUrl: "https://sanedroid.tech/",
  },
];

export default function AboutUs() {
  return (
    <div className="bg-white">
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Our Team
            </h2>
            <p className="text-xl text-gray-500">
              We are a team of 3 friends trying to build products that help the
              world!
            </p>
          </div>
          <ul
            role="list"
            className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
          >
            {people.map((person) => (
              <li key={person.name}>
                <div className="space-y-4">
                  <div className="aspect-w-3 aspect-h-2">
                    <img
                      className="object-cover shadow-lg rounded-lg"
                      src={person.imageUrl}
                      alt=""
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="text-lg leading-6 font-medium space-y-1">
                      <h3>{person.name}</h3>
                      <p className="text-indigo-600">{person.role}</p>
                    </div>
                    <ul role="list" className="flex space-x-5">
                      <li>
                        <a
                          href={person.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Github</span>
                          <img src={github} alt="Github" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={person.personalWebsiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Personal Website</span>
                          <img src={website} alt="personal website" />
                        </a>
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
