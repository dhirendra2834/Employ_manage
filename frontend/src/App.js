import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route } from "react-router-dom";
import Userpage from "./Pages/Userpage";
import AdminPage from "./Pages/AdminPage";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={Userpage} />
      <Route path="/AdminPage" component={AdminPage} />
    </div>
  );
}

export default App;
