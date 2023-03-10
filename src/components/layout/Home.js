import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
function Home() {
  return (
    <>
      <Navbar />
      {/*       
      <Route exact path="/" element={<Landing />} /> */}
      <Footer />
      {/* <div className="container"> */}
      {/* <Route exact path="/register" element={<Register />} />
      
              <Route exact path="/profiles" element={<Profiles />} />
              <Route>
                <PrivateRoute exact path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  element={<CreateProfile />}
                />
              </Route>
              <Route>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  element={<EditProfile />}
                />
              </Route>
              <Route>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  element={<AddExperience />}
                />
              </Route>
              <Route>
                <PrivateRoute
                  exact
                  path="/add-education"
                  element={<AddEducation />}
                />
              </Route> */}

      {/* </div> */}
    </>
  );
}

export default Home;
