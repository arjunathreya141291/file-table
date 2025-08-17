export const FILES = [
  {
    id: 'smss-exe-mario',
    name: 'smss.exe',
    device: 'Mario',
    path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
    status: 'scheduled',
  },
  {
    id: 'netsh-exe-luigi',
    name: 'netsh.exe',
    device: 'Luigi',
    path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
    status: 'available',
  },
  {
    id: 'uxtheme-dll-peach',
    name: 'uxtheme.dll',
    device: 'Peach',
    path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll',
    status: 'available',
  },
  {
    id: 'aries-sys-daisy',
    name: 'aries.sys',
    device: 'Daisy',
    path: '\\Device\\HarddiskVolume1\\Windows\\System32\\aries.sys',
    status: 'scheduled',
  },
  {
    id: 'cryptbase-dll-yoshi',
    name: 'cryptbase.dll',
    device: 'Yoshi',
    path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll',
    status: 'scheduled',
  },
  {
    id: '7za-exe-toad',
    name: '7za.exe',
    device: 'Toad',
    path: '\\Device\\HarddiskVolume1\\temp\\7za.exe',
    status: 'scheduled',
  },
];

export const HEADER = ['Name', 'Device', 'Path', 'Status'];

export const UI_TEXT = {
  SELECTION: {
    NONE_SELECTED: 'None selected',
    SELECTED_COUNT: 'Selected',
  },
  BUTTONS: {
    DOWNLOAD_SELECTED: 'Download Selected',
  },
  ALERTS: {
    DOWNLOAD_FORMAT: ' : ',
  },
};
