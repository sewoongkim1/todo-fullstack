import { useState } from 'react';
import { todoAPI } from '../services/todoAPI';
import '../styles/TodoForm.css';

export function TodoForm({ onTodoAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('제목을 입력해주세요');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const newTodo = {
        title: title.trim(),
        description: description.trim(),
        priority,
        category: category.trim() || undefined,
        status: 'todo',
      };

      const created = await todoAPI.createTodo(newTodo);
      setTitle('');
      setDescription('');
      setPriority('medium');
      setCategory('');
      onTodoAdded(created);
    } catch (err) {
      setError('할일 생성에 실패했습니다');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>새로운 할일</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="title">제목 *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할일을 입력하세요"
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">설명</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="상세 설명을 입력하세요"
          rows="3"
          disabled={isLoading}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority">우선순위</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={isLoading}
          >
            <option value="low">낮음</option>
            <option value="medium">중간</option>
            <option value="high">높음</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">카테고리</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="카테고리"
            disabled={isLoading}
          />
        </div>
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? '저장 중...' : '할일 추가'}
      </button>
    </form>
  );
}
