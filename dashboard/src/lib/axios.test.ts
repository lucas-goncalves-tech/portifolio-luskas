import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from './axios';
import { useAuthStore } from '../stores/authStore';

describe('axios interceptor', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  it('should not add Authorization header if no token is present', async () => {
    const config = { headers: {} } as any;
    
    // Get the request interceptor
    const interceptor = (api.interceptors.request as any).handlers[0].fulfilled;
    const newConfig = await interceptor(config);
    
    expect(newConfig.headers['Authorization']).toBeUndefined();
  });

  it('should add Authorization header if token is present', async () => {
    const mockToken = 'mock-jwt-token';
    useAuthStore.getState().login(mockToken);
    
    const config = { headers: {} } as any;
    
    const interceptor = (api.interceptors.request as any).handlers[0].fulfilled;
    const newConfig = await interceptor(config);
    
    expect(newConfig.headers['Authorization']).toBe(`Bearer ${mockToken}`);
  });
});
