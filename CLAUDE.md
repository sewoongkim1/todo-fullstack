# ToDo List 풀스택 프로젝트

## 개요
React + Express + MongoDB 기반 할일 관리 웹 애플리케이션.
Vercel로 프론트엔드/백엔드 모두 배포 완료.

## 기술 스택
| 영역 | 기술 |
|---|---|
| **프론트엔드** | React 19, Vite 8 |
| **백엔드** | Node.js 22, Express 5 |
| **데이터베이스** | MongoDB Atlas (Mongoose 9) |
| **배포** | Vercel (프론트 + 백엔드 서버리스) |
| **보안** | helmet, cors, express-rate-limit, dotenv |

## 배포 URL
- **프론트엔드**: https://todo-react-eosin-two.vercel.app
- **백엔드 API**: https://todo-backend-sigma-sepia.vercel.app
- **GitHub**: https://github.com/sewoongkim1/todo-fullstack

## 프로젝트 구조
```
todo/
├── CLAUDE.md
├── .gitignore
├── todo-backend/
│   ├── index.js              # Express 서버 (서버리스 대응)
│   ├── models/Todo.js        # Mongoose 스키마
│   ├── routes/todo.js        # CRUD API 라우터
│   ├── vercel.json           # Vercel 서버리스 설정
│   ├── .env                  # 환경변수 (git 제외)
│   └── package.json
├── todo-react/
│   ├── index.html
│   ├── vite.config.js
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx           # 메인 레이아웃
│   │   ├── App.css           # 전역 CSS 변수 및 레이아웃
│   │   ├── index.css         # 글로벌 리셋 및 폰트
│   │   ├── components/
│   │   │   ├── TodoForm.jsx  # 할일 생성 폼
│   │   │   ├── TodoItem.jsx  # 할일 카드 (수정/삭제)
│   │   │   └── TodoList.jsx  # 목록 (필터/검색/페이지네이션)
│   │   ├── services/
│   │   │   └── todoAPI.js    # API 호출 래퍼
│   │   └── styles/
│   │       ├── TodoForm.css
│   │       ├── TodoItem.css
│   │       └── TodoList.css
│   └── package.json
```

## API 엔드포인트
| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/api/todos` | 목록 조회 (필터, 검색, 페이지네이션) |
| POST | `/api/todos` | 할일 생성 |
| GET | `/api/todos/:id` | 상세 조회 |
| PATCH | `/api/todos/:id` | 수정 |
| DELETE | `/api/todos/:id` | 삭제 |

### 쿼리 파라미터 (GET /api/todos)
- `status`: todo, in-progress, done, cancelled
- `priority`: low, medium, high
- `category`, `tag`, `search`, `sort`
- `page`, `limit` (기본 20)

## Todo 모델 (MongoDB)
- **status**: `todo`, `in-progress`, `done`, `cancelled` (기본: todo)
- **priority**: `low`, `medium`, `high`, `urgent` (기본: medium)
- 기타: category, tags, dueDate, subtasks, recurring, pinned 등

## 환경변수
### 백엔드 (.env)
```
MONGODB_URI=mongodb+srv://...@mycluster.hggctv7.mongodb.net/todo
PORT=3000
```

### 프론트엔드 (Vercel 환경변수)
```
VITE_API_URL=https://todo-backend-sigma-sepia.vercel.app
```
로컬 개발 시 VITE_API_URL 미설정이면 `http://localhost:3000` 사용.

## 로컬 실행
```bash
# 백엔드
cd todo-backend && node index.js

# 프론트엔드
cd todo-react && npm run dev
```

## 디자인
- 밝은 블루 배경(`#f0f4ff`) + 다크 네이비 카드(`#1e293b`)
- 입력 필드는 흰색 배경
- 상태별 할일 카드 색상 구분:
  - 대기: 인디고 블루
  - 진행중: 앰버 오렌지
  - 완료: 에메랄드 그린
  - 취소: 로즈 핑크
- Inter 웹폰트, 그라디언트 헤더, 좌측 컬러 바 인디케이터

## 진행 내역
1. Express + MongoDB 백엔드 구성 (CRUD, 필터, 페이지네이션)
2. React + Vite 프론트엔드 구성 (TodoForm, TodoList, TodoItem)
3. 버그 수정:
   - API URL 경로 불일치 (`/todo` → `/api/todos`)
   - status enum 불일치 (`pending` → `todo`, `in_progress` → `in-progress`)
   - CSS 문법 오류 (중복 괄호)
4. 한국어 검색 지원 (`$text` → `$regex`)
5. UI 디자인 리뉴얼 (다크 카드 + 밝은 배경 + 상태별 색상)
6. 제목 변경 (Todo App → ToDo List)
7. MongoDB Atlas 연결 (로컬 → 클라우드)
8. Vercel 배포 (백엔드 서버리스 + 프론트엔드 정적)
9. 할일 인라인 수정 기능 추가
