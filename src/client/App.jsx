import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import jwtDecode from "jwt-decode";
import Results from "./pages/Results";
import QuestionPage from "./pages/QuestionPage";
import NavB from "./components/Nav";
import PageNav from "./components/PageNav";
import OAuthHandler from "./pages/OAuthHandler";

function App() {
   const storedToken = window.sessionStorage.getItem("credentials");
   let decodedToken = null;

   if (storedToken) {
      decodedToken = jwtDecode(storedToken);
   }

   const loggedIn = decodedToken?.id;

   return (
      <div className="App">
         <Routes>
            <Route path="/" element={<Login />} />
            <Route
               path="/home"
               element={
                  loggedIn ? (
                     <>
                        {" "}
                        <NavB /> <Home />{" "}
                     </>
                  ) : (
                     <Login />
                  )
               }
            />
            <Route index element={<Login />} />
            <Route
               path="/results/:accessCode"
               element={
                  <>
                     <PageNav />
                     <Results />
                  </>
               }
            />
            <Route
               path="/question/:questionId"
               element={
                  <>
                     <PageNav />
                     <QuestionPage />
                  </>
               }
            />
            <Route path="/oauthhandler" element={<OAuthHandler />} />
         </Routes>
      </div>
   );
}

export default App;
