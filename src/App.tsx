import Layout from "./layout/Layout.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;
