import { act } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useUserStore } from './userStore';

describe('userStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    act(() => {
      useUserStore.getState().clearUserProfile();
    });
  });

  it('should initialize with null userProfile', () => {
    expect(useUserStore.getState().userProfile).toBeNull();
  });

  it('should set user profile correctly', () => {
    const mockUser = {
      id: 1,
      firstName: 'Vincent',
      lastName: 'Chen',
      gender: 'male' as const,
      age: 28,
      token: 'mock-jwt-token',
    };

    act(() => {
      useUserStore.getState().setUserProfile(mockUser);
    });

    expect(useUserStore.getState().userProfile).toEqual(mockUser);
  });

  it('should clear user profile correctly', () => {
    const mockUser = {
      id: 1,
      firstName: 'Vincent',
      lastName: 'Chen',
      gender: 'male' as const,
      age: 28,
      token: 'mock-jwt-token',
    };

    act(() => {
      useUserStore.getState().setUserProfile(mockUser);
    });
    expect(useUserStore.getState().userProfile).not.toBeNull();

    act(() => {
      useUserStore.getState().clearUserProfile();
    });
    expect(useUserStore.getState().userProfile).toBeNull();
  });
});
