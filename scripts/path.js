export const PATH = {
    // 로컬 개발 시
    // SERVER: 'http://localhost:8080',
    // CLIENT: 'http://localhost:5173'
  
    // 배포 시에는 이 파일을 수정하면 됨
    SERVER: import.meta.env.VITE_SERVER_URL,
    CLIENT: import.meta.env.VITE_CLIENT_URL,
  };