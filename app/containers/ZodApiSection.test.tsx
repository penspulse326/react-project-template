import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { getUserValidated } from '~/services/user';
import ZodApiSection from './ZodApiSection';

// Mock getUserValidated but keep the rest (like UserSchema) intact
vi.mock('~/services/user', async (importOriginal) => {
  const actual = await importOriginal<typeof import('~/services/user')>();
  return {
    ...actual,
    getUserValidated: vi.fn(),
  };
});

describe('zodApiSection Component', () => {
  it('renders initial UI elements', () => {
    render(<ZodApiSection />);
    expect(screen.getByText('2. Zod 與 API 響應資料驗證')).toBeInTheDocument();
    expect(screen.getByLabelText('使用者 ID (測試 API 讀取)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '讀取並驗證' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '模擬 API 結構異常 (觸發 Zod 攔截)' })).toBeInTheDocument();
  });

  it('fetches and displays user data successfully', async () => {
    const mockUser = {
      id: 1,
      firstName: 'Vincent',
      lastName: 'Chen',
      gender: 'male',
      age: 28,
      email: 'vincent@example.com',
    };

    vi.mocked(getUserValidated).mockResolvedValue({
      success: true,
      data: mockUser as any,
    });

    render(<ZodApiSection />);

    const input = screen.getByLabelText('使用者 ID (測試 API 讀取)');
    fireEvent.change(input, { target: { value: '123' } });

    const fetchButton = screen.getByRole('button', { name: '讀取並驗證' });
    fireEvent.click(fetchButton);

    // Verify loading text is shown
    expect(screen.getByText('資料處理中，請稍候...')).toBeInTheDocument();

    // Verify success state is rendered
    await waitFor(() => {
      expect(screen.getByText('Zod 驗證通過：資料結構符合預期')).toBeInTheDocument();
    });

    expect(screen.getByText(/Vincent/)).toBeInTheDocument();
    expect(screen.getByText(/Chen/)).toBeInTheDocument();
    expect(screen.getByText('vincent@example.com')).toBeInTheDocument();
  });

  it('handles API error response correctly', async () => {
    vi.mocked(getUserValidated).mockResolvedValue({
      success: false,
      message: '無法取得該使用者資料或資料格式不正確',
      error: new Error('API Error'),
    });

    render(<ZodApiSection />);

    const fetchButton = screen.getByRole('button', { name: '讀取並驗證' });
    fireEvent.click(fetchButton);

    await waitFor(() => {
      expect(screen.getByText('無法取得該使用者資料或資料格式不正確')).toBeInTheDocument();
    });
  });

  it('simulates validation error and displays detailed Zod errors', () => {
    vi.useFakeTimers();
    render(<ZodApiSection />);

    const simulateButton = screen.getByRole('button', { name: '模擬 API 結構異常 (觸發 Zod 攔截)' });
    fireEvent.click(simulateButton);

    // Fast-forward timers for the setTimeout (500ms)
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Check immediately without waitFor because fake timers are synchronous
    expect(screen.getByText('Zod 攔截：API 響應格式驗證失敗！')).toBeInTheDocument();

    // Check if detailed Zod errors are rendered
    expect(screen.getByText('Zod 詳細錯誤分析：')).toBeInTheDocument();
    expect(screen.getByText('id')).toBeInTheDocument(); // Path showing id
    expect(screen.getByText('firstName')).toBeInTheDocument(); // Path showing firstName
    expect(screen.getByText('lastName')).toBeInTheDocument(); // Path showing lastName

    vi.useRealTimers();
  });
});
