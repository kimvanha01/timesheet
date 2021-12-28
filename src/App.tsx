import React, { lazy, Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import "./App.scss";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/Nav/PrivateRoute";
import NotFound from "./components/NotFound";
import SignIn from "./features/Auth/SignIn";

const Home = lazy(() => import("./features/Home"));
toast.configure();

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route path="/login" component={SignIn}></Route>
            <PrivateRoute path="/home" component={Home} ></PrivateRoute>
            <Route component={NotFound}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;