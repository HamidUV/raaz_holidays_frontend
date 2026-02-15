
// API configuration and service functions
// const API_BASE_URL = 'http://localhost:5000';
const API_BASE_URL = 'https://raaz-holidays-backend.vercel.app'

// Types for our API
export type Package = {
  id?: string;
  title: string;
  description: string;
  type: 'exclusive' | 'upcoming';
  tour_dates?: { startDate: string; endDate: string; }[];
  price: string;
  image_url: string;
  duration?: string;
  location: string;
  contact_number: string;
  slots_available?: number;
  early_bird?: boolean;
  featured?: boolean;
  created_at?: string;
}

export type Banner = {
  id?: string;
  image_url: string;
  caption?: string;
  title?: string;
  link?: string;
  display_order: number;
  created_at?: string;
  active?: boolean;
}

export type HajjUmrahPackage = {
  id?: string;
  title: string;
  description: string;
  price: string;
  start_date: string;
  end_date: string;
  location: string;
  contact_number: string;
  image_url: string;
  created_at?: string;
}

export type TravelMemory = {
  id?: string;
  image_url: string;
  caption?: string;
  created_at?: string;
}

// API client class
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('adminToken');
  }

  private getHeaders(includeAuth: boolean = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private getFormHeaders(includeAuth: boolean = false): HeadersInit {
    const headers: HeadersInit = {};

    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async handleResponse(response: Response) {
    if (response.status === 401) {
      // Clear invalid token
      this.clearToken();
      throw new Error('Authentication failed. Please login again.');
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }
    
    return response;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('adminToken', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('adminToken');
  }

  // Auth methods
  async adminLogin(username: string, password: string): Promise<{ success: boolean; token?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/raaz_admin/auth/login`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (response.ok && data.token) {
        this.setToken(data.token);
        return { success: true, token: data.token };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false };
    }
  }

  // User routes (public)
  async getBanners(): Promise<Banner[]> {
    try {
      const response = await fetch(`${this.baseURL}/api/banners`);
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error('Error fetching banners:', error);
      return [];
    }
  }

  async getExclusivePackages(): Promise<Package[]> {
    try {
      const response = await fetch(`${this.baseURL}/api/packages/exclusive`);
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error('Error fetching exclusive packages:', error);
      return [];
    }
  }

  async getUpcomingPackages(): Promise<Package[]> {
    try {
      const response = await fetch(`${this.baseURL}/api/packages/upcoming`);
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error('Error fetching upcoming packages:', error);
      return [];
    }
  }

  async searchPackages(query: string): Promise<Package[]> {
    try {
      const response = await fetch(`${this.baseURL}/api/packages/search?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error('Error searching packages:', error);
      return [];
    }
  }

  // Hajj & Umrah packages (public)
  async getHajjUmrahPackages(): Promise<HajjUmrahPackage[]> {
    try {
      const response = await fetch(`${this.baseURL}/api/packages/hajj`);
      if (response.ok) {
        const data = await response.json();
        return data.packages || [];
      }
      return [];
    } catch (error) {
      console.error('Error fetching Hajj & Umrah packages:', error);
      return [];
    }
  }

  // Travel memories (public)
  async getTravelMemories(): Promise<TravelMemory[]> {
    try {
      const response = await fetch(`${this.baseURL}/api/travel-memories`);
      if (response.ok) {
        const data = await response.json();
        return data.memories || [];
      }
      return [];
    } catch (error) {
      console.error('Error fetching travel memories:', error);
      return [];
    }
  }

  // Admin routes (protected) - Using working endpoints from network requests
  async getAdminExclusivePackages(): Promise<Package[]> {
    try {
      const response = await fetch(`${this.baseURL}/raaz_admin/packages/exclusive`, {
        headers: this.getHeaders(true),
      });
      await this.handleResponse(response);
      const data = await response.json();
      // Extract packages array from the response
      return data.packages || data || [];
    } catch (error) {
      console.error('Error fetching admin exclusive packages:', error);
      throw error;
    }
  }

  async getAdminUpcomingPackages(): Promise<Package[]> {
    try {
      const response = await fetch(`${this.baseURL}/raaz_admin/packages/upcoming`, {
        headers: this.getHeaders(true),
      });
      await this.handleResponse(response);
      const data = await response.json();
      // Extract packages array from the response
      return data.packages || data || [];
    } catch (error) {
      console.error('Error fetching admin upcoming packages:', error);
      throw error;
    }
  }

  async getAdminBanners(): Promise<Banner[]> {
    try {
      const response = await fetch(`${this.baseURL}/raaz_admin/banners`, {
        headers: this.getHeaders(true),
      });
      await this.handleResponse(response);
      return await response.json();
    } catch (error) {
      console.error('Error fetching admin banners:', error);
      throw error;
    }
  }

  // Admin Hajj & Umrah packages - Using working endpoints
  async getAdminHajjUmrahPackages(): Promise<HajjUmrahPackage[]> {
    try {
      const response = await fetch(`${this.baseURL}/raaz_admin/packages/hajj`, {
        headers: this.getHeaders(true),
      });
      await this.handleResponse(response);
      const data = await response.json();
      // Extract packages array from the response
      return data.packages || data || [];
    } catch (error) {
      console.error('Error fetching admin Hajj & Umrah packages:', error);
      throw error;
    }
  }

  async addHajjUmrahPackage(packageData: FormData): Promise<{ success: boolean }> {
    try {
      console.log('Adding Hajj & Umrah package...');
      const response = await fetch(`${this.baseURL}/raaz_admin/packages/hajj`, {
        method: 'POST',
        headers: this.getFormHeaders(true),
        body: packageData,
      });
      await this.handleResponse(response);
      console.log('Hajj & Umrah package added successfully');
      return { success: true };
    } catch (error) {
      console.error('Error adding Hajj & Umrah package:', error);
      throw error;
    }
  }

  async updateHajjUmrahPackage(id: string, packageData: FormData): Promise<{ success: boolean }> {
    try {
      console.log('Updating Hajj & Umrah package with ID:', id);
      const response = await fetch(`${this.baseURL}/raaz_admin/packages/hajj/${id}`, {
        method: 'PUT',
        headers: this.getFormHeaders(true),
        body: packageData,
      });
      await this.handleResponse(response);
      console.log('Hajj & Umrah package updated successfully');
      return { success: true };
    } catch (error) {
      console.error('Error updating Hajj & Umrah package:', error);
      throw error;
    }
  }

  async deleteHajjUmrahPackage(id: string): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseURL}/raaz_admin/packages/hajj/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders(true),
      });
      await this.handleResponse(response);
      return { success: true };
    } catch (error) {
      console.error('Error deleting Hajj & Umrah package:', error);
      throw error;
    }
  }

  // Admin travel memories - Fallback to public API since admin endpoint doesn't exist
  async getAdminTravelMemories(): Promise<TravelMemory[]> {
    try {
      console.log('Fetching admin travel memories...');
      // Since admin endpoint doesn't exist, use public endpoint
      const response = await fetch(`${this.baseURL}/api/travel-memories`);
      if (response.ok) {
        const data = await response.json();
        console.log('Travel memories fetched:', data);
        return data.memories || data || [];
      }
      return [];
    } catch (error) {
      console.error('Error fetching admin travel memories:', error);
      // Return empty array instead of throwing to prevent page crash
      return [];
    }
  }

  async addTravelMemory(memoryData: FormData): Promise<{ success: boolean }> {
    try {
      console.log('Adding travel memory...');
      // Try admin endpoint first, fallback to public API
      const response = await fetch(`${this.baseURL}/raaz_admin/travel-memories`, {
        method: 'POST',
        headers: this.getFormHeaders(true),
        body: memoryData,
      });
      
      if (response.status === 404) {
        // Admin endpoint doesn't exist, try alternative endpoint
        console.log('Admin endpoint not found, trying alternative...');
        const altResponse = await fetch(`${this.baseURL}/api/travel-memories`, {
          method: 'POST',
          headers: this.getFormHeaders(true),
          body: memoryData,
        });
        await this.handleResponse(altResponse);
      } else {
        await this.handleResponse(response);
      }
      
      console.log('Travel memory added successfully');
      return { success: true };
    } catch (error) {
      console.error('Error adding travel memory:', error);
      throw error;
    }
  }

  async deleteTravelMemory(id: string): Promise<{ success: boolean }> {
    try {
      console.log('Deleting travel memory with ID:', id);
      // Try admin endpoint first
      const response = await fetch(`${this.baseURL}/raaz_admin/travel-memories/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders(true),
      });
      
      if (response.status === 404) {
        // Admin endpoint doesn't exist, try alternative
        const altResponse = await fetch(`${this.baseURL}/api/travel-memories/${id}`, {
          method: 'DELETE',
          headers: this.getHeaders(true),
        });
        await this.handleResponse(altResponse);
      } else {
        await this.handleResponse(response);
      }
      
      console.log('Travel memory deleted successfully');
      return { success: true };
    } catch (error) {
      console.error('Error deleting travel memory:', error);
      throw error;
    }
  }

  async addExclusivePackage(packageData: FormData): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseURL}/raaz_admin/packages/exclusive`, {
        method: 'POST',
        headers: this.getFormHeaders(true),
        body: packageData,
      });
      await this.handleResponse(response);
      return { success: true };
    } catch (error) {
      console.error('Error adding exclusive package:', error);
      throw error;
    }
  }

  async addUpcomingPackage(packageData: FormData): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseURL}/raaz_admin/packages/upcoming`, {
        method: 'POST',
        headers: this.getFormHeaders(true),
        body: packageData,
      });
      await this.handleResponse(response);
      return { success: true };
    } catch (error) {
      console.error('Error adding upcoming package:', error);
      throw error;
    }
  }

  async updateExclusivePackage(id: string, packageData: FormData): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseURL}/raaz_admin/packages/exclusive/${id}`, {
        method: 'PUT',
        headers: this.getFormHeaders(true),
        body: packageData,
      });
      await this.handleResponse(response);
      return { success: true };
    } catch (error) {
      console.error('Error updating exclusive package:', error);
      throw error;
    }
  }

  async updateUpcomingPackage(id: string, packageData: FormData): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseURL}/raaz_admin/packages/upcoming/${id}`, {
        method: 'PUT',
        headers: this.getFormHeaders(true),
        body: packageData,
      });
      await this.handleResponse(response);
      return { success: true };
    } catch (error) {
      console.error('Error updating upcoming package:', error);
      throw error;
    }
  }

  async deleteExclusivePackage(id: string): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseURL}/raaz_admin/packages/exclusive/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders(true),
      });
      await this.handleResponse(response);
      return { success: true };
    } catch (error) {
      console.error('Error deleting exclusive package:', error);
      throw error;
    }
  }

  async deleteUpcomingPackage(id: string): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseURL}/raaz_admin/packages/upcoming/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders(true),
      });
      await this.handleResponse(response);
      return { success: true };
    } catch (error) {
      console.error('Error deleting upcoming package:', error);
      throw error;
    }
  }

  async addBanner(bannerData: FormData): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseURL}/raaz_admin/banners`, {
        method: 'POST',
        headers: this.getFormHeaders(true),
        body: bannerData,
      });
      await this.handleResponse(response);
      return { success: true };
    } catch (error) {
      console.error('Error adding banner:', error);
      throw error;
    }
  }

  async updateBanner(id: string, bannerData: FormData): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseURL}/raaz_admin/banners/${id}`, {
        method: 'PUT',
        headers: this.getFormHeaders(true),
        body: bannerData,
      });
      await this.handleResponse(response);
      return { success: true };
    } catch (error) {
      console.error('Error updating banner:', error);
      throw error;
    }
  }

  async deleteBanner(id: string): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseURL}/raaz_admin/banners/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders(true),
      });
      await this.handleResponse(response);
      return { success: true };
    } catch (error) {
      console.error('Error deleting banner:', error);
      throw error;
    }
  }
}

// Create and export API client instance
export const apiClient = new ApiClient(API_BASE_URL);
