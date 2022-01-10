
export const getMe = (token) => {
    return fetch('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const createUser = (userData) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  export const loginUser = (userData) => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  
  export const saveBook = (bookData, token) => {
    return fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookData),
    });
  };
  
 
  export const deleteBook = (bookId, token) => {
    return fetch(`/api/users/books/${bookId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };
  
  /
  export const searchGoogleBooks = (query) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  };
   49  client/src/utils/auth.js 
  @@ -0,0 +1,49 @@
 
  import decode from 'jwt-decode';
  
 
  class AuthService {
   
    getProfile() {
      return decode(this.getToken());
    }
  
   
    loggedIn() {
      
      const token = this.getToken();
      return !!token && !this.isTokenExpired(token);
    }
  
    
    isTokenExpired(token) {
      try {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) {
          return true;
        } else return false;
      } catch (err) {
        return false;
      }
    }
  
    getToken() {
  
      return localStorage.getItem('id_token');
    }
  
    login(idToken) {
     
      localStorage.setItem('id_token', idToken);
      window.location.assign('/');
    }
  
    logout() {
     
      localStorage.removeItem('id_token');
     
      window.location.assign('/');
    }
  }
  
  export default new AuthService();