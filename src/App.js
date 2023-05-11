import ArtList from './components/ArtList';
import ArtDetails from './components/ArtDetails';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ArtList />} />
        <Route path="/:id" element={<ArtDetails />} />
      </Routes>
    </>
  );
}

export default App;
