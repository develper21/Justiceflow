import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from './debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('delays execution until wait has elapsed', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('resets the timer on repeated calls (only last call runs)', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced('a');
    vi.advanceTimersByTime(200);
    debounced('b');
    vi.advanceTimersByTime(200);
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('b');
  });

  it('passes the latest arguments through', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced(1, 2);
    debounced(3, 4);
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith(3, 4);
  });

  it('does not call the function before the wait elapses', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 500);

    debounced();
    vi.advanceTimersByTime(499);
    expect(fn).toHaveBeenCalledTimes(0);
  });
});
