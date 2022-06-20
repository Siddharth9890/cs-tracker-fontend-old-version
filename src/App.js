import "./App.css";
import { useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";

import Footer from "./Components/Footer/Footer";
import HomePage from "./Components/HomePage/HomePage";
import NavBar from "./Components/Navbar/NavBar";

import PageNotFound from "./Components/404Page/404Page";
import Topics from "./Components/Topics/Topics";
import QuestionList from "./Components/Question/QuestionsList";

import SignInPage from "./Components/SignIn/SignInPage";
import AboutUs from "./Components/AboutUs/AboutUs";
import Profile from "./Components/Profile/Profile";

import Revision from "./Components/RevisionPage/Revision";
import SingleQuestion from "./Components/Question/SingleQuestion";
import CreateAccountPage from "./Components/CreateAccount/CreateAccount";

import { UserContext } from "./context/userContext";
import Create from "./Components/Create/Create";
import Alert from "./Components/Alert/Alert";

function App() {
  const { signInContext, signOutContext } = useContext(UserContext);

  useEffect(() => {
    const verifyToken = async (email, token) => {
      const response = await fetch(
        "https://cs-tracker-backend.herokuapp.com/api/v1/user/verifyToken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );
      const result = await response.json();
      if (result.message === "failed") {
        localStorage.clear();
        signOutContext();
      } else {
        const userFromDatabase = await getUser(email);
        if (!userFromDatabase) {
          signOutContext();
        } else {
          signInContext(userFromDatabase.body);
        }
      }
    };
    const userFromLocalStorage = localStorage.getItem("user");
    if (!userFromLocalStorage) {
    } else {
      const { email, token } = JSON.parse(userFromLocalStorage);
      verifyToken(email, token);
    }
  }, []);

  const getUser = async (email) => {
    const response = await fetch(
      "https://cs-tracker-backend.herokuapp.com/api/v1/user/findUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    return response.json();
  };
  return (
    <>
      <NavBar />
      <Alert />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/topic/:topicName" element={<Topics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/revision" element={<Revision />} />
        <Route path="/subject-list/:subjectName" element={<QuestionList />} />
        <Route
          path="/single-question/:subjectName/:questionName"
          element={<SingleQuestion />}
        />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/createAccount" element={<CreateAccountPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/api/create" element={<Create />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
