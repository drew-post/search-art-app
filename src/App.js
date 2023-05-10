import ArtList from './components/ArtList';
import Art from './components/Art';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ArtList />} />
        <Route path="/:id" element={<Art />} />
      </Routes>
    </>
  );
}

export default App;
