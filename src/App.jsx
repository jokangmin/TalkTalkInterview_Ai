import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import InterviewMain from './components/InterviewPage/InterviewMain';
import IndexProvider from './contexts/indexContext/IndexContext';
import InterviewProvider from './contexts/InterviewContext/InterviewContext';

function App() {
  return (
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
      </Routes>
    </Router>
  );
}

export default App;
