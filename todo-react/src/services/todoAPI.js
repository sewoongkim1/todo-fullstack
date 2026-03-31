const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000') + '/api/todos';

export const todoAPI = {
  // 할일 목록 조회
  getTodos: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.category) params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      if (filters.sort) params.append('sort', filters.sort);
      params.append('page', filters.page || 1);
      params.append('limit', filters.limit || 20);

      const response = await fetch(`${API_URL}?${params}`);
      if (!response.ok) throw new Error('할일 목록 조회 실패');
      return await response.json();
    } catch (error) {
      console.error('getTodos error:', error);
      throw error;
    }
  },

  // 할일 생성
  createTodo: async (todo) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      if (!response.ok) throw new Error('할일 생성 실패');
      return await response.json();
    } catch (error) {
      console.error('createTodo error:', error);
      throw error;
    }
  },

  // 할일 상세 조회
  getTodoById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error('할일 조회 실패');
      return await response.json();
    } catch (error) {
      console.error('getTodoById error:', error);
      throw error;
    }
  },

  // 할일 수정
  updateTodo: async (id, updates) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('할일 수정 실패');
      return await response.json();
    } catch (error) {
      console.error('updateTodo error:', error);
      throw error;
    }
  },

  // 할일 삭제
  deleteTodo: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('할일 삭제 실패');
      return await response.json();
    } catch (error) {
      console.error('deleteTodo error:', error);
      throw error;
    }
  },
};
