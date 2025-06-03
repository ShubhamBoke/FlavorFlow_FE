"use client"

const API_BASE_URL = 'http://localhost:8080'; // Replace with your actual API base URL

export const fetchRestaurants = async () => {
  try {
    const jwtToken = localStorage.getItem('jwt_token');
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    }
    const response = await fetch(`${API_BASE_URL}/getRestaurantList`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      throw new Error(message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch restaurants:", error);
    throw error; // Re-throw the error so calling code can handle it
  }
};

export const updateCartItemQuantity = async (cartItemId: number, quantity: number) => {
  try {
    const jwtToken = localStorage.getItem('jwt_token');
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    }
    const response = await fetch(`${API_BASE_URL}/updateCartItemQuantity?cartItemId=${cartItemId}&quantity=${quantity}`, {
      method: "PUT",
      headers: headers,
    });

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      throw new Error(message);
    }
  } catch (error) {
    console.error("Failed to update cart item quantity:", error);
    throw error;
  }
};

export const removeCartItem = async (cartItemId: number) => {
  try {
    const jwtToken = localStorage.getItem('jwt_token');
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    }
    const response = await fetch(`${API_BASE_URL}/removeCartItem?cartItemId=${cartItemId}`, {
      method: "DELETE",
      headers: headers,
    });

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      throw new Error(message);
    }
  } catch (error) {
    console.error("Failed to remove cart item:", error);
    throw error;
  }
};

export const fetchRestaurantById = async (id: number) => {
  try {
    const jwtToken = localStorage.getItem('jwt_token');
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    }
    const response = await fetch(`${API_BASE_URL}/getRestaurantById/${id}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      console.log(response.status);
      const message = `An error occurred: ${response.statusText}`;
      throw new Error(message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch restaurants:", error);
    throw error; // Re-throw the error so calling code can handle it
  }
};

export const fetchCartDetails = async () => {
  try {
    const jwtToken = localStorage.getItem('jwt_token');
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    }
    const response = await fetch(`${API_BASE_URL}/getCartDetails`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      throw new Error(message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch cart details:", error);
    throw error;
  }
};

export const addItemToCart = async (menuItemId: number, quantity: number) => {
  try {
    const jwtToken = localStorage.getItem('jwt_token');
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    }
    const response = await fetch(`${API_BASE_URL}/addItemToCart?menuItemId=${menuItemId}&quantity=${quantity}`, {
      method: "POST",
      headers: headers,
    });

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      throw new Error(message);
    }
  } catch (error) {
    console.error("Failed to add item to cart:", error);
    throw error;
  }
};

export const addRestaurant = async (name: string, cuisine: string) => {
  try {
    const jwtToken = localStorage.getItem('jwt_token');
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    }
    const response = await fetch(`${API_BASE_URL}/admin/addRestaurant`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        name: name,
        cuisine: cuisine,
        rating: 4
      })
    });

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      throw new Error(message);
    }

  } catch (error) {
    console.error("Failed to add restaurant:", error);
    throw error; // Re-throw the error so calling code can handle it
  }
};