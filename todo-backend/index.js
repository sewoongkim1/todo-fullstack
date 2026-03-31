require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// 보안 미들웨어
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

// MongoDB 연결 (서버리스 환경 대응 - 캐싱)
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('mongodb 연결 성공');
  } catch (err) {
    console.log('mongodb 연결 실패:', err.message);
    throw err;
  }
};

// 모든 요청 전에 DB 연결 보장
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: 'DB 연결 실패' });
  }
});

// 라우터
app.use('/api/todos', require('./routes/todo'));

app.get('/', (req, res) => {
  res.send('서버 작동 중');
});

// Vercel 서버리스 배포용 export
module.exports = app;

// 로컬 실행용
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`서버 실행: http://localhost:${PORT}`);
  });
}
