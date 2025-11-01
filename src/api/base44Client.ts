// Base44 API Client
// Real API integration for Frank Kusi Appiah's Portfolio

const API_BASE_URL = 'https://app.base44.com/api/apps/690018262fbe2ee995ff1584';
const API_KEY = import.meta.env.VITE_BASE44_API_KEY || '14a50d735e764232b4e41e3834b3f6c7';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'PCB Design' | 'Embedded Systems' | 'Power Electronics' | 'RF Design' | 'IoT' | 'Automation' | 'Circuit Design';
  technologies?: string[];
  image_url?: string;
  github_url?: string;
  demo_url?: string;
  featured?: boolean;
  completion_date?: string;
}

interface Base44Response<T> {
  data?: T[];
  error?: string;
  message?: string;
}

class Base44Client {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'api_key': API_KEY,
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Base44 API Error:', error);
      throw error;
    }
  }

  entities = {
    Project: {
      /**
       * List all projects
       * @param sort - Sort order (e.g., '-created_date' for descending)
       * @returns Array of projects
       */
      list: async (sort?: string): Promise<Project[]> => {
        try {
          const endpoint = sort 
            ? `/entities/Project?sort=${sort}` 
            : '/entities/Project';
          
          const response = await this.request<Project[] | Base44Response<Project>>(endpoint);
          
          // Handle both array response and object response formats
          if (Array.isArray(response)) {
            return response;
          } else if (response && 'data' in response && Array.isArray(response.data)) {
            return response.data;
          }
          
          return [];
        } catch (error) {
          console.error('Error fetching projects:', error);
          return [];
        }
      },

      /**
       * Get a single project by ID
       * @param id - Project ID
       * @returns Single project or null
       */
      get: async (id: string): Promise<Project | null> => {
        try {
          const response = await this.request<Project>(`/entities/Project/${id}`);
          return response;
        } catch (error) {
          console.error(`Error fetching project ${id}:`, error);
          return null;
        }
      },

      /**
       * Update a project
       * @param id - Project ID
       * @param updateData - Data to update
       * @returns Updated project
       */
      update: async (id: string, updateData: Partial<Project>): Promise<Project | null> => {
        try {
          const response = await this.request<Project>(`/entities/Project/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updateData),
          });
          return response;
        } catch (error) {
          console.error(`Error updating project ${id}:`, error);
          return null;
        }
      },

      /**
       * Create a new project
       * @param projectData - Project data
       * @returns Created project
       */
      create: async (projectData: Omit<Project, 'id'>): Promise<Project | null> => {
        try {
          const response = await this.request<Project>('/entities/Project', {
            method: 'POST',
            body: JSON.stringify(projectData),
          });
          return response;
        } catch (error) {
          console.error('Error creating project:', error);
          return null;
        }
      },

      /**
       * Delete a project
       * @param id - Project ID
       * @returns Success status
       */
      delete: async (id: string): Promise<boolean> => {
        try {
          await this.request<void>(`/entities/Project/${id}`, {
            method: 'DELETE',
          });
          return true;
        } catch (error) {
          console.error(`Error deleting project ${id}:`, error);
          return false;
        }
      },

      /**
       * Filter projects by category
       * @param category - Project category
       * @returns Filtered projects
       */
      filterByCategory: async (category: Project['category']): Promise<Project[]> => {
        try {
          const response = await this.request<Project[]>(
            `/entities/Project?filter=category:${category}`
          );
          return Array.isArray(response) ? response : [];
        } catch (error) {
          console.error(`Error filtering projects by category ${category}:`, error);
          return [];
        }
      },

      /**
       * Get featured projects only
       * @returns Featured projects
       */
      getFeatured: async (): Promise<Project[]> => {
        try {
          const response = await this.request<Project[]>(
            '/entities/Project?filter=featured:true'
          );
          return Array.isArray(response) ? response : [];
        } catch (error) {
          console.error('Error fetching featured projects:', error);
          return [];
        }
      },
    },
  };
}

export const base44 = new Base44Client();

