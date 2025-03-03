export function getAuthHeaderWithToken() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }
    return {
      Authorization: `Bearer ${token}`,
    };
  }