import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import InterviewMain from './components/InterviewPage/InterviewMain';
import IndexProvider from './contexts/indexContext/IndexContext';
import InterviewProvider from './contexts/InterviewContext/InterviewContext';
import HeaderProvider from './contexts/HeaderContext/HeaderContext';
import HeaderPage from './components/Header/Header';

function App() {
  return (
    <HeaderProvider>
      <Router>
        <Routes>
          {/* 메인 페이지 */}
          <Route 
            path="/" 
            element={
              <IndexProvider>
                <IndexPage />
              </IndexProvider>
            } 
          />

          {/* 면접 페이지 */}
          <Route 
            path="/interview" 
            element={
              <InterviewProvider>
                <InterviewMain />
              </InterviewProvider>
            } 
          />

          {/* 헤더 페이지 */}
          <Route path="/header" element={<HeaderPage />} />
        </Routes>
      </Router>
    </HeaderProvider>
  );
}


export default App;
