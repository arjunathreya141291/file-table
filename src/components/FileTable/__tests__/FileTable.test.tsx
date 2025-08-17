import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileTable } from '../FileTable';
import { FILES } from '../../../constants';
import type { File } from '../../../types';

// Mock files for unit testing
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

const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

describe('FileTable Component', () => {
  afterEach(() => {
    mockAlert.mockClear();
  });

  test('renders table headers correctly', () => {
    render(<FileTable files={mockFiles} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Device')).toBeInTheDocument();
    expect(screen.getByText('Path')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  test('renders file data correctly', () => {
    render(<FileTable files={mockFiles} />);

    expect(screen.getByText('document.pdf')).toBeInTheDocument();
    expect(screen.getByText('MacBook')).toBeInTheDocument();
    expect(screen.getByText('iPhone')).toBeInTheDocument();
    expect(screen.getByText('/Users/test/document.pdf')).toBeInTheDocument();
  });

  test('download button disabled when no files selected', () => {
    render(<FileTable files={mockFiles} />);

    const downloadButton = screen.getByRole('button', { name: /download/i });
    expect(screen.getByText('None selected')).toBeInTheDocument();
    expect(downloadButton).toBeDisabled();
  });

  test('allows selecting individual files', async () => {
    const user = userEvent.setup();
    render(<FileTable files={mockFiles} />);

    const checkboxes = screen.getAllByRole('checkbox');
    const firstFileCheckbox = checkboxes[1];
    await user.click(firstFileCheckbox);

    expect(firstFileCheckbox).toBeChecked();
    expect(screen.getByText('Selected 1')).toBeInTheDocument();

    const downloadButton = screen.getByRole('button', { name: /download/i });
    expect(downloadButton).toBeEnabled();
  });

  test('disables checkboxes for scheduled files', () => {
    render(<FileTable files={mockFiles} />);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[1]).toBeEnabled(); // document.pdf (available)
    expect(checkboxes[2]).toBeEnabled(); // image.jpg (available)
    expect(checkboxes[3]).toBeDisabled(); // video.mp4 (scheduled)
  });

  test('select all functionality works correctly', async () => {
    const user = userEvent.setup();
    render(<FileTable files={mockFiles} />);

    const checkboxes = screen.getAllByRole('checkbox');
    const selectAllCheckbox = checkboxes[0];

    await user.click(selectAllCheckbox);

    expect(screen.getByText('Selected 2')).toBeInTheDocument();

    const allCheckboxes = screen.getAllByRole('checkbox');
    expect(allCheckboxes[1]).toBeChecked(); // document.pdf (available, should be checked)
    expect(allCheckboxes[2]).toBeChecked(); // image.jpg (available, should be checked)
    expect(allCheckboxes[3]).not.toBeChecked(); // video.mp4 (scheduled, should not be checked)
  });

  test('download functionality works', async () => {
    const user = userEvent.setup();
    render(<FileTable files={mockFiles} />);

    const checkboxes = screen.getAllByRole('checkbox');
    const documentCheckbox = checkboxes[1];
    await user.click(documentCheckbox);

    const downloadButton = screen.getByRole('button', { name: /download/i });
    await user.click(downloadButton);

    expect(mockAlert).toHaveBeenCalledWith(
      'MacBook : /Users/test/document.pdf'
    );
  });

  test('displays status indicators correctly', () => {
    render(<FileTable files={mockFiles} />);

    expect(screen.getAllByText('Available')).toHaveLength(2);
    expect(screen.getAllByText('Scheduled')).toHaveLength(1);
  });

  test('handles empty file list', () => {
    render(<FileTable files={[]} />);

    expect(screen.getByText('Name')).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');
    const selectAllCheckbox = checkboxes[0];
    expect(selectAllCheckbox).toBeDisabled();

    const downloadButton = screen.getByRole('button', { name: /download/i });
    expect(downloadButton).toBeDisabled();
  });

  describe('Edge Cases', () => {
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

      render(<FileTable files={allScheduledFiles} />);

      const checkboxes = screen.getAllByRole('checkbox');
      const selectAllCheckbox = checkboxes[0];

      expect(selectAllCheckbox).toBeDisabled();

      expect(checkboxes[1]).toBeDisabled();
      expect(checkboxes[2]).toBeDisabled();
    });

    test('handles single available file', () => {
      const singleAvailableFile: File[] = [
        {
          id: '1',
          name: 'single.txt',
          device: 'Device1',
          path: '/single',
          status: 'available',
        },
      ];

      render(<FileTable files={singleAvailableFile} />);

      const checkboxes = screen.getAllByRole('checkbox');
      const selectAllCheckbox = checkboxes[0];
      const fileCheckbox = checkboxes[1];

      expect(selectAllCheckbox).toBeEnabled();
      expect(fileCheckbox).toBeEnabled();
    });
  });

  describe('Integration with Production Data', () => {
    test('works correctly with production FILES data', () => {
      render(<FileTable files={FILES} />);

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Device')).toBeInTheDocument();
      expect(screen.getByText('Path')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();

      expect(screen.getByText('smss.exe')).toBeInTheDocument();
      expect(screen.getByText('netsh.exe')).toBeInTheDocument();
      expect(screen.getByText('uxtheme.dll')).toBeInTheDocument();

      expect(screen.getAllByText('Available').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Scheduled').length).toBeGreaterThan(0);
    });
  });
});
