# ToDo Backend

## 개요
Express 5 + MongoDB (Mongoose 9) 기반 REST API 서버.
Vercel 서버리스로 배포됨.

## 기술 스택
- **Runtime**: Node.js v22
- **Framework**: Express v5
- **Database**: MongoDB Atlas (Mongoose v9)
- **보안**: helmet, cors, express-rate-limit, dotenv
- **배포**: Vercel (서버리스, `@vercel/node`)

## 프로젝트 구조
```
todo-backend/
├── index.js          # Express 서버 (서버리스 + 로컬 대응)
├── models/Todo.js    # Mongoose 스키마 (status, priority, tags 등)
├── routes/todo.js    # CRUD API 라우터
├── vercel.json       # Vercel 서버리스 빌드 설정
├── .env              # 환경변수 (git 제외)
├── .gitignore
├── package.json
└── package-lock.json
```

## 주요 설계 결정
- **검색**: MongoDB `$text` 대신 `$regex` 사용 (한국어 부분 검색 지원)
- **서버리스 DB 연결**: 매 요청 전 `connectDB()` 미들웨어로 연결 캐싱
- **`module.exports = app`**: Vercel 서버리스 호환 + `require.main === module`로 로컬 실행 분기

## 실행 방법
```bash
node index.js
```
- 서버: http://localhost:3000
- 배포: https://todo-backend-sigma-sepia.vercel.app
