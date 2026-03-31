const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 할일 생성
router.post('/', async (req, res) => {
  try {
    const todo = new Todo(req.body);
    const saved = await todo.save();
    res.status(201).json(saved);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: '할일 생성 실패' });
  }
});

// 할일 목록 조회
router.get('/', async (req, res) => {
  try {
    const { status, priority, category, tag, search, sort, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;
    if (tag) filter.tags = tag;
    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.$or = [
        { title: { $regex: escaped, $options: 'i' } },
        { description: { $regex: escaped, $options: 'i' } },
      ];
    }

    const sortOption = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOption[field] = order === 'desc' ? -1 : 1;
    } else {
      sortOption.pinned = -1;
      sortOption.createdAt = -1;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [todos, total] = await Promise.all([
      Todo.find(filter).sort(sortOption).skip(skip).limit(Number(limit)),
      Todo.countDocuments(filter)
    ]);

    res.json({ todos, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    res.status(500).json({ error: '할일 목록 조회 실패' });
  }
});

// 할일 상세 조회
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: '할일을 찾을 수 없습니다' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: '할일 조회 실패' });
  }
});

// 할일 수정
router.patch('/:id', async (req, res) => {
  try {
    if (req.body.status === 'done') {
      req.body.completedAt = new Date();
    }

    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!todo) return res.status(404).json({ error: '할일을 찾을 수 없습니다' });
    res.json(todo);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: '할일 수정 실패' });
  }
});

// 할일 삭제
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ error: '할일을 찾을 수 없습니다' });
    res.json({ message: '삭제 완료' });
  } catch (err) {
    res.status(500).json({ error: '할일 삭제 실패' });
  }
});

module.exports = router;
