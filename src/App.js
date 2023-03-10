import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/auth/Login";
function App() {
  return (
    // <Provider store={store}>
    <Router>
      <div>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/login" element={<Login />} />
          {/* <Route exact path="/" element={<Landing />} /> */}
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
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
    // </Provider>
  );
}

export default App;
