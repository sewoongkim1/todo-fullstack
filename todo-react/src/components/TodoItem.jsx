import { todoAPI } from '../services/todoAPI';
import '../styles/TodoItem.css';

export function TodoItem({ todo, onTodoUpdated, onTodoDeleted }) {
  const handleStatusChange = async (newStatus) => {
    try {
      const updated = await todoAPI.updateTodo(todo._id, { status: newStatus });
      onTodoUpdated(updated);
    } catch (error) {
      console.error('상태 변경 실패:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('이 할일을 삭제하시겠습니까?')) {
      try {
        await todoAPI.deleteTodo(todo._id);
        onTodoDeleted(todo._id);
      } catch (error) {
        console.error('삭제 실패:', error);
      }
    }
  };

  const priorityLabel = {
    low: '낮음',
    medium: '중간',
    high: '높음',
  };

  const statusLabel = {
    todo: '대기',
    'in-progress': '진행중',
    done: '완료',
    cancelled: '취소',
  };

  const priorityClass = `priority-${todo.priority || 'medium'}`;
  const statusClass = `status-${todo.status || 'todo'}`;

  return (
    <div className={`todo-item ${statusClass}`}>
      <div className="todo-header">
        <h3 className="todo-title">{todo.title}</h3>
        <div className="todo-badges">
          {todo.priority && (
            <span className={`badge priority ${priorityClass}`}>
              {priorityLabel[todo.priority]}
            </span>
          )}
          {todo.category && <span className="badge category">{todo.category}</span>}
          <span className={`badge status ${statusClass}`}>
            {statusLabel[todo.status || 'todo']}
          </span>
        </div>
      </div>

      {todo.description && <p className="todo-description">{todo.description}</p>}

      <div className="todo-meta">
        {todo.createdAt && (
          <span className="meta-item">
            생성: {new Date(todo.createdAt).toLocaleDateString('ko-KR')}
          </span>
        )}
        {todo.completedAt && (
          <span className="meta-item">
            완료: {new Date(todo.completedAt).toLocaleDateString('ko-KR')}
          </span>
        )}
      </div>

      <div className="todo-actions">
        <select
          value={todo.status || 'todo'}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="status-select"
        >
          <option value="todo">대기</option>
          <option value="in-progress">진행중</option>
          <option value="done">완료</option>
          <option value="cancelled">취소</option>
        </select>
        <button onClick={handleDelete} className="btn-delete">
          삭제
        </button>
      </div>
    </div>
  );
}
