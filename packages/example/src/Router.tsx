import { Route, Routes } from 'react-router-dom';
import App from './App';
import { Documentation, Doctype } from './components/Documentation';

export const Router = () => {
  return (
    <Routes>
      <Route path='/' index element={<App />} />
      <Route path='/faq' element={<Documentation type={Doctype.FAQ} />} />
      <Route path='/base-knowledge' element={<Documentation type={Doctype.KNOWLEDGE} />} />
      <Route path='*' element={<App />} />
    </Routes>
  );
};
