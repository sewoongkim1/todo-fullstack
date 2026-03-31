import { useState } from 'react';
import { todoAPI } from '../services/todoAPI';
import '../styles/TodoItem.css';

export function TodoItem({ todo, onTodoUpdated, onTodoDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editPriority, setEditPriority] = useState(todo.priority || 'medium');
  const [editCategory, setEditCategory] = useState(todo.category || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleStatusChange = async (newStatus) => {
    try {
      const updated = await todoAPI.updateTodo(todo._id, { status: newStatus });
      onTodoUpdated(updated);
    } catch (error) {
      console.error('상태 변경 실패:', error);
    }
  };

  const handleEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditPriority(todo.priority || 'medium');
    setEditCategory(todo.category || '');
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!editTitle.trim()) return;
    setIsSaving(true);
    try {
      const updated = await todoAPI.updateTodo(todo._id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        priority: editPriority,
        category: editCategory.trim() || undefined,
      });
      onTodoUpdated(updated);
      setIsEditing(false);
    } catch (error) {
      console.error('수정 실패:', error);
    } finally {
      setIsSaving(false);
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
      {isEditing ? (
        <div className="todo-edit-form">
          <div className="edit-group">
            <label>제목</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              disabled={isSaving}
            />
          </div>
          <div className="edit-group">
            <label>설명</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows="2"
              disabled={isSaving}
            />
          </div>
          <div className="edit-row">
            <div className="edit-group">
              <label>우선순위</label>
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                disabled={isSaving}
              >
                <option value="low">낮음</option>
                <option value="medium">중간</option>
                <option value="high">높음</option>
              </select>
            </div>
            <div className="edit-group">
              <label>카테고리</label>
              <input
                type="text"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                disabled={isSaving}
              />
            </div>
          </div>
          <div className="edit-actions">
            <button onClick={handleSave} className="btn-save" disabled={isSaving || !editTitle.trim()}>
              {isSaving ? '저장 중...' : '저장'}
            </button>
            <button onClick={handleCancel} className="btn-cancel" disabled={isSaving}>
              취소
            </button>
          </div>
        </div>
      ) : (
        <>
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
            <button onClick={handleEdit} className="btn-edit">
              수정
            </button>
            <button onClick={handleDelete} className="btn-delete">
              삭제
            </button>
          </div>
        </>
      )}
    </div>
  );
}
