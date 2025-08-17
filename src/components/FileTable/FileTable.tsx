import './FileTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { HEADER, UI_TEXT } from '../../constants';
import { StatusIndicator } from '../StatusIndicator';
import { capitalizeFirstLetter } from '../../utils';
import { useFileSelection } from '../../hooks';
import type { FileTableProps } from '../../types';

export const FileTable: React.FC<FileTableProps> = ({ files }) => {
  const {
    selectedFiles,
    selectAllRef,
    availableFiles,
    allSelected,
    handleSelectAll,
    handleCheckboxSelection,
    getSelectedFiles,
  } = useFileSelection(files);

  const handleDownload = () => {
    const selectedFileForDownload = getSelectedFiles();
    if (selectedFileForDownload.length === 0) return;
    alert(
      selectedFileForDownload
        .map(
          file => `${file.device}${UI_TEXT.ALERTS.DOWNLOAD_FORMAT}${file.path}`
        )
        .join('\n')
    );
  };

  return (
    <div className="file-table-container">
      <div className="header">
        <input
          type="checkbox"
          ref={selectAllRef}
          checked={allSelected}
          disabled={availableFiles.length === 0}
          onChange={handleSelectAll}
          aria-label="Select all available files"
        />
        <span>
          {selectedFiles.size > 0
            ? `${UI_TEXT.SELECTION.SELECTED_COUNT} ${selectedFiles.size}`
            : UI_TEXT.SELECTION.NONE_SELECTED}
        </span>
        <button
          onClick={handleDownload}
          disabled={selectedFiles.size === 0}
          className={`download-button ${selectedFiles.size === 0 ? 'button-disabled' : ''}`}
          aria-label="Download selected files"
        >
          <FontAwesomeIcon
            icon={faDownload}
            size="lg"
            style={{ marginRight: '8px' }}
          />
          {UI_TEXT.BUTTONS.DOWNLOAD_SELECTED}
        </button>
      </div>

      <table className="file-table" aria-label="File list">
        <thead>
          <tr>
            <th></th>
            {HEADER.map((headerText, index) => (
              <th key={index}>{headerText}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {files.map(file => {
            const isStatusAvailable = file.status === 'available';
            const isFileSelected = selectedFiles.has(file.id);

            return (
              <tr
                key={file.id}
                className={`${isFileSelected ? 'selected' : ''} ${!isStatusAvailable ? 'scheduled' : ''}`.trim()}
              >
                <td>
                  <input
                    type="checkbox"
                    disabled={!isStatusAvailable}
                    checked={isFileSelected}
                    onChange={() => handleCheckboxSelection(file.id)}
                    aria-label={`Select ${file.name}`}
                  />
                </td>
                <td>{file.name}</td>
                <td>{file.device}</td>
                <td>{file.path}</td>
                <td>
                  <StatusIndicator
                    color={isStatusAvailable ? 'green' : undefined}
                    label={capitalizeFirstLetter(file.status)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
