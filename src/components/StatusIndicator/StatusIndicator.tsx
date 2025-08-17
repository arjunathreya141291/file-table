import type { StatusIndicatorProps } from '../../types';

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  color,
  label,
}) => {
  return (
    <span className="status-indicator">
      {color && (
        <span
          className="status-dot"
          style={{
            display: 'inline-block',
            borderRadius: '50%',
            backgroundColor: color,
            width: '15px',
            height: '15px',
            marginRight: '4px',
          }}
        />
      )}
      <span className="status-label">{label}</span>
    </span>
  );
};
