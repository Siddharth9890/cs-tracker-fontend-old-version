import { useContext } from "react";
import CreateQuestion from "./CreateQuestion";
import CreateSubject from "./CreateSubject";
import CreateTopic from "./CreateTopic";
import { UserContext } from "../../context/userContext";

export default function Create() {
  const { userData } = useContext(UserContext);
  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
        <CreateSubject userData={userData} />
        <CreateTopic userData={userData} />
        <CreateQuestion userData={userData} />
      </div>
    </div>
  );
}
