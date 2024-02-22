// AuthService.js

class AuthService {
  constructor() {
    this.tokenKey = "authToken";
    this.user = "userInfo";
  }

  getToken() {
    return sessionStorage.getItem(this.tokenKey);
  }

  setToken(token) {
    sessionStorage.setItem(this.tokenKey, token);
  }

  setUser(user) {
    try {
      const jsonString = JSON.stringify(user);
      localStorage.setItem(this.user, jsonString);
    } catch (error) {
      console.error('Error stringifying object:', error);
      this.logout()
      // Handle the error gracefully, such as logging it or providing a fallback value
    }
  }

  getUser() {
    localStorage.getItem(this.user);
    try {
      const retrievedObject = JSON.parse(localStorage.getItem(this.user));
      return retrievedObject
    } catch (error) {
      console.error('Error parsing JSON string:', error);
      this.logout()
      // Handle the error gracefully, such as logging it or providing a fallback value
    }
    
  }

  removeToken() {
    sessionStorage.removeItem(this.tokenKey);
  }

  isAuthenticated() {
    const token = this.getToken();
 
    return !!token; // Check if token exists
  }
  logout(){
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';

  }
  isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;
    this.logout()
    // Implement logic to check if token is expired
    // For example, compare current time with token expiry time
    // Return true if token is expired, false otherwise
  }

  validateToken() {
    if (!this.isAuthenticated()) {
      this.removeItem(this.tokenKey);
      return false;
    }
    return !this.isTokenExpired();
  }
}

// Create a singleton instance of AuthService
const authService = new AuthService();

export default authService;
