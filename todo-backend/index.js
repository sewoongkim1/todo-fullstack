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

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('mongodb 연결 성공'))
  .catch((err) => console.log('mongodb 연결 실패:', err.message));

// 라우터
app.use('/api/todos', require('./routes/todo'));

app.get('/', (req, res) => {
  res.send('서버 작동 중');
});

app.listen(PORT, () => {
  console.log(`서버 실행: http://localhost:${PORT}`);
  console.log(`${process.env.MONGODB_URI}`);

});
