import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MoodDashboard from "./pages/MoodDashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Moodpage from "./pages/MoodPage";
import Homepage from "./pages/Homepage";
import AddTask from "./pages/AddTask";
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/mood" element={<Moodpage />} />
            <Route path="/:id" element={<MoodDashboard />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/addtask" element={<AddTask />} />
            <Route path="/task/:id" element={<TaskPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
