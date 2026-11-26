import { toolsOff } from './workspaceTools.js';

export const defaultPlugins = {
  images: true,
  imageMotion: true,
  ...toolsOff,
  customize_dashboard: true,
  toolConnection: '',
};
