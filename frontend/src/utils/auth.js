// utils/auth.js
export const isAuthenticated = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/check-auth', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.isLoggedIn;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Failed to check authentication status:', error);
      return false;
    }
  };
  