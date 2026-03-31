const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  // 기본 정보
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    trim: true,
    maxlength: 2000
  },

  // 상태 관리
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done', 'cancelled'],
    default: 'todo'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },

  // 분류
  category: {
    type: String,
    trim: true,
    default: '일반'
  },
  tags: [{
    type: String,
    trim: true
  }],

  // 일정
  dueDate: {
    type: Date
  },
  startDate: {
    type: Date
  },
  completedAt: {
    type: Date
  },

  // 반복 설정
  recurring: {
    enabled: { type: Boolean, default: false },
    pattern: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    interval: { type: Number, default: 1 }
  },

  // 하위 작업 (체크리스트)
  subtasks: [{
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
  }],

  // 첨부 및 메모
  attachments: [{
    filename: String,
    url: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  notes: {
    type: String,
    maxlength: 5000
  },

  // 알림
  reminder: {
    enabled: { type: Boolean, default: false },
    remindAt: { type: Date }
  },

  // 정렬
  order: {
    type: Number,
    default: 0
  },

  // 즐겨찾기
  pinned: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// 인덱스
todoSchema.index({ status: 1, priority: 1 });
todoSchema.index({ dueDate: 1 });
todoSchema.index({ category: 1 });
todoSchema.index({ tags: 1 });
todoSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Todo', todoSchema);
