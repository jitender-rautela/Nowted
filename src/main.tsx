import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider, Routes } from 'react-router-dom'
// import FolderList from './Components/FolderList/FolderList.tsx'
// import ActiveNote from './Components/NoteComponents/ActiveNote.tsx'
// import EmptyNote from './Components/NoteComponents/EmptyNote.tsx'

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App/>}>
//     </Route>
//     <Route path='folders/:folderId' element={<App/>}></Route>
//   )
// )

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
