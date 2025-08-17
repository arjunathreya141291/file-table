export type File = {
  id: string;
  name: string;
  device: string;
  path: string;
  status: 'available' | 'scheduled' | string;
};

export type StatusIndicatorProps = {
  color?: string;
  label: string;
};

export type FileTableProps = {
  files: File[];
};
