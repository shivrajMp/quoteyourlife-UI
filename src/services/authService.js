// AuthService.js

class AuthService {
  constructor() {
    this.tokenKey = "authToken";
  }

  getToken() {
    return sessionStorage.getItem(this.tokenKey);
  }

  setToken(token) {
    sessionStorage.setItem(this.tokenKey, token);
  }

  removeToken() {
    sessionStorage.removeItem(this.tokenKey);
  }

  isAuthenticated() {
    const token = this.getToken();
    return !!token; // Check if token exists
  }

  isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;

    // Implement logic to check if token is expired
    // For example, compare current time with token expiry time
    // Return true if token is expired, false otherwise
  }

  validateToken() {
    if (!this.isAuthenticated()) {
      return false;
    }
    return !this.isTokenExpired();
  }
}

// Create a singleton instance of AuthService
const authService = new AuthService();

export default authService;
