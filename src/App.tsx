import { ToastContainer} from "react-toastify";
import Layout from "./layout/Layout.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />} />

        {/* Folders Route */}
        <Route path="folders/:folderId" element={<Layout />}>
          <Route path="notes/:noteId" element={<Layout />}>
            <Route path="deleted" element={<Layout />} />
            <Route path="archived" element={<Layout />} />
          </Route>
        </Route>

        {/* Trash Route */}
        <Route path="trash" element={<Layout />}>
          <Route path="notes/:noteId" element={<Layout />}>
            <Route path="deleted" element={<Layout />} />
          </Route>
        </Route>

        {/* Favorites Route */}
        <Route path="favorites" element={<Layout />}>
          <Route path="notes/:noteId" element={<Layout />} />
        </Route>

        {/* Archived Route */}
        <Route path="archives" element={<Layout />}>
          <Route path="notes/:noteId" element={<Layout />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
