import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import InterviewMain from './components/InterviewPage/InterviewMain';
import IndexProvider from './contexts/indexContext/IndexContext';
import InterviewProvider from './contexts/InterviewContext/InterviewContext';
import HeaderProvider from './contexts/HeaderContext/HeaderContext';
import HeaderPage from './components/Header/Header';
import LoginProvider from './contexts/LoginContext/LoginContext';
import LoginPage from './components/LoginPage/LoginMain';
import SignUpProvider from './contexts/LoginContext/SignUpContext';
import SignUpPage from './components/LoginPage/SignUpMain';
import AuthProvider from './contexts/AuthContext';
import MyQuestionsProvider from './contexts/MyQuestionsContext/MyQuestionsContext';
import MyQuestionsPage from './components/MyQuestionsPage/MyQuestions';

function App() {
  return (
    <AuthProvider>
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

            {/* 로그인 페이지 */}
            <Route 
              path="/login" 
              element={
                <LoginProvider>
                  <LoginPage />
                </LoginProvider>
              } 
            />

            {/* 회원가입 페이지 */}
            <Route 
              path="/signUp" 
              element={
                <SignUpProvider>
                  <SignUpPage />
                </SignUpProvider>
              } 
            />

            {/* 나의 질문 페이지 */}
            <Route 
              path="/myQuestions" 
              element={
                <MyQuestionsProvider>
                  <MyQuestionsPage />
                </MyQuestionsProvider>
              } 
            />

            {/* 헤더 페이지 */}
            <Route path="/header" element={<HeaderPage />} />
          </Routes>
        </Router>
      </HeaderProvider>
    </AuthProvider>
  );
}


export default App;
