# Unit04 프로젝트

## 개요
Express + MongoDB 기반 Node.js 서버 프로젝트

## 기술 스택
- **Runtime**: Node.js v22
- **Framework**: Express v5
- **Database**: MongoDB (Mongoose v9)
- **보안**: helmet, cors, express-rate-limit, dotenv

## 프로젝트 구조
```
unit04/
├── index.js          # 메인 서버 (Express + MongoDB 연결)
├── .env              # 환경변수 (MONGODB_URI, PORT) - git 제외
├── .gitignore
├── package.json
└── package-lock.json
```

## 진행 내역
1. Node.js 프로젝트 초기화 (`npm init`)
2. Express + Mongoose 설치 및 서버 구성
3. MongoDB 연결 (`mongodb://localhost:27017/unit04`)
4. 보안 강화 적용
   - `helmet` — 보안 HTTP 헤더
   - `cors` — CORS 정책
   - `express-rate-limit` — 15분당 100요청 제한
   - `dotenv` — DB URL 등 민감 정보를 `.env`로 분리
   - `.env`를 `.gitignore`에 추가

## 실행 방법
```bash
node index.js
```
- 서버: http://localhost:3000
- MongoDB가 로컬에서 실행 중이어야 함
