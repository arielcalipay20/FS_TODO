import './App.scss';
import Interface from './Rest';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './component/pages/Layout';
import List from './component/pages/List';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Interface />} />
          <Route path="list" element={<List />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
