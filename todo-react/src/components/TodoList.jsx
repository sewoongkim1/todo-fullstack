import { useState, useEffect } from 'react';
import { todoAPI } from '../services/todoAPI';
import { TodoItem } from './TodoItem';
import '../styles/TodoList.css';

export function TodoList({ trigger }) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const loadTodos = async (page = 1, appliedFilters = filters) => {
    setIsLoading(true);
    setError('');

    try {
      const filterParams = {
        page,
        limit: 10,
      };

      if (appliedFilters.status) filterParams.status = appliedFilters.status;
      if (appliedFilters.priority) filterParams.priority = appliedFilters.priority;
      if (appliedFilters.search) filterParams.search = appliedFilters.search;

      const data = await todoAPI.getTodos(filterParams);
      setTodos(data.todos);
      setCurrentPage(data.page);
      setTotalPages(data.totalPages);
      setTotal(data.total);
    } catch (err) {
      setError('할일 목록을 불러오는데 실패했습니다');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos(1);
  }, [trigger]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    setCurrentPage(1);
    loadTodos(1, newFilters);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    loadTodos(1, filters);
  };

  const handleTodoUpdated = (updatedTodo) => {
    setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
  };

  const handleTodoDeleted = (deletedId) => {
    setTodos(todos.filter((todo) => todo._id !== deletedId));
    setTotal(total - 1);
  };

  return (
    <div className="todo-list-container">
      <h2>할일 목록</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="filters-section">
        <div className="filter-group">
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">전체 상태</option>
            <option value="todo">대기</option>
            <option value="in-progress">진행중</option>
            <option value="done">완료</option>
            <option value="cancelled">취소</option>
          </select>

          <select name="priority" value={filters.priority} onChange={handleFilterChange}>
            <option value="">전체 우선순위</option>
            <option value="low">낮음</option>
            <option value="medium">중간</option>
            <option value="high">높음</option>
          </select>
        </div>

        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            name="search"
            placeholder="할일 검색..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <button type="submit">검색</button>
        </form>
      </div>

      {isLoading ? (
        <div className="loading">로딩 중...</div>
      ) : todos.length === 0 ? (
        <div className="empty-state">할일이 없습니다</div>
      ) : (
        <>
          <div className="todos">
            {todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onTodoUpdated={handleTodoUpdated}
                onTodoDeleted={handleTodoDeleted}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => {
                  loadTodos(currentPage - 1, filters);
                }}
                disabled={currentPage === 1}
              >
                이전
              </button>
              <span>
                {currentPage} / {totalPages} (총 {total}개)
              </span>
              <button
                onClick={() => {
                  loadTodos(currentPage + 1, filters);
                }}
                disabled={currentPage === totalPages}
              >
                다음
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
