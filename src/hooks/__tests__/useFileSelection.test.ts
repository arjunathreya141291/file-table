import { renderHook, act } from '@testing-library/react';
import { useFileSelection } from '../useFileSelection';
import type { File } from '../../types';

const mockFiles: File[] = [
  {
    id: 'file-1',
    name: 'document.pdf',
    device: 'MacBook',
    path: '/Users/test/document.pdf',
    status: 'available',
  },
  {
    id: 'file-2',
    name: 'image.jpg',
    device: 'iPhone',
    path: '/Photos/image.jpg',
    status: 'available',
  },
  {
    id: 'file-3',
    name: 'video.mp4',
    device: 'iPad',
    path: '/Videos/video.mp4',
    status: 'scheduled',
  },
];

describe('useFileSelection', () => {
  test('initializes with empty selection', () => {
    const { result } = renderHook(() => useFileSelection(mockFiles));

    expect(result.current.selectedFiles.size).toBe(0);
    expect(result.current.allSelected).toBe(false);
    expect(result.current.onlySomeSelected).toBe(false);
  });

  test('filters available files correctly', () => {
    const { result } = renderHook(() => useFileSelection(mockFiles));

    expect(result.current.availableFiles).toHaveLength(2);
    expect(result.current.availableFiles[0].id).toBe('file-1');
    expect(result.current.availableFiles[1].id).toBe('file-2');
  });

  test('handles individual file selection', () => {
    const { result } = renderHook(() => useFileSelection(mockFiles));

    act(() => {
      result.current.handleCheckboxSelection('file-1');
    });

    expect(result.current.selectedFiles.has('file-1')).toBe(true);
    expect(result.current.selectedFiles.size).toBe(1);
    expect(result.current.onlySomeSelected).toBe(true);
    expect(result.current.allSelected).toBe(false);
  });

  test('handles select all functionality', () => {
    const { result } = renderHook(() => useFileSelection(mockFiles));

    act(() => {
      result.current.handleSelectAll();
    });

    expect(result.current.selectedFiles.size).toBe(2);
    expect(result.current.selectedFiles.has('file-1')).toBe(true);
    expect(result.current.selectedFiles.has('file-2')).toBe(true);
    expect(result.current.selectedFiles.has('file-3')).toBe(false);
    expect(result.current.allSelected).toBe(true);
    expect(result.current.onlySomeSelected).toBe(false);
  });

  test('handles deselect all when all are selected', () => {
    const { result } = renderHook(() => useFileSelection(mockFiles));

    act(() => {
      result.current.handleSelectAll();
    });

    expect(result.current.allSelected).toBe(true);

    act(() => {
      result.current.handleSelectAll();
    });

    expect(result.current.selectedFiles.size).toBe(0);
    expect(result.current.allSelected).toBe(false);
    expect(result.current.onlySomeSelected).toBe(false);
  });

  test('toggles individual file selection', () => {
    const { result } = renderHook(() => useFileSelection(mockFiles));

    act(() => {
      result.current.handleCheckboxSelection('file-1');
    });

    expect(result.current.selectedFiles.has('file-1')).toBe(true);

    act(() => {
      result.current.handleCheckboxSelection('file-1');
    });

    expect(result.current.selectedFiles.has('file-1')).toBe(false);
    expect(result.current.selectedFiles.size).toBe(0);
  });

  test('clears all selections', () => {
    const { result } = renderHook(() => useFileSelection(mockFiles));

    act(() => {
      result.current.handleCheckboxSelection('file-1');
      result.current.handleCheckboxSelection('file-2');
    });

    expect(result.current.selectedFiles.size).toBe(2);

    act(() => {
      result.current.clearSelection();
    });

    expect(result.current.selectedFiles.size).toBe(0);
  });

  test('gets selected files correctly', () => {
    const { result } = renderHook(() => useFileSelection(mockFiles));

    act(() => {
      result.current.handleCheckboxSelection('file-1');
    });

    const selectedFiles = result.current.getSelectedFiles();
    expect(selectedFiles).toHaveLength(1);
    expect(selectedFiles[0].id).toBe('file-1');
    expect(selectedFiles[0].name).toBe('document.pdf');
  });

  test('handles empty file list', () => {
    const { result } = renderHook(() => useFileSelection([]));

    expect(result.current.availableFiles).toHaveLength(0);
    expect(result.current.allSelected).toBe(false);
    expect(result.current.onlySomeSelected).toBe(false);
  });

  test('handles all scheduled files', () => {
    const allScheduledFiles: File[] = [
      {
        id: '1',
        name: 'file1.txt',
        device: 'Device1',
        path: '/path1',
        status: 'scheduled',
      },
      {
        id: '2',
        name: 'file2.txt',
        device: 'Device2',
        path: '/path2',
        status: 'scheduled',
      },
    ];

    const { result } = renderHook(() => useFileSelection(allScheduledFiles));

    expect(result.current.availableFiles).toHaveLength(0);
    expect(result.current.allSelected).toBe(false);

    act(() => {
      result.current.handleSelectAll();
    });

    expect(result.current.selectedFiles.size).toBe(0);
  });
});
