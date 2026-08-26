type SendChannel =
  | 'renderer-log'
  | 'broadcast-ipc-event'
  | 'theme-changed'
  | 'mpv-command'
  | 'mpv-restore'
  | 'mpv-close'
  | 'app-close-response'
  | 'mpv-toggle-pip'
  | 'mpv-minimize'
  | 'mpv-player-ready'
  | 'mpv-resize'
  | 'app-restart'
  | 'app-quit'
  | 'window-minimize'
  | 'window-maximize-toggle'
  | 'window-resize-to-minimum';

type InvokeChannel =
  | 'mpv-take-snapshot'
  | 'mpv-open-fullscreen'
  | 'select-folder'
  | 'select-file'
  | 'show-item-in-folder'
  | 'mpv-play'
  | 'open-external';

type ReceiveChannel =
  | 'invalidate-query-cache'
  | 'app-close-requested'
  | 'player-state-update'
  | 'theme-changed'
  | 'mpv-event'
  | 'pip-mode-change';

export interface ElectronAPI {
  getApiToken(): string;
  send(channel: SendChannel, ...args: any[]): void;
  invoke(channel: InvokeChannel, ...args: any[]): Promise<any>;
  on(channel: ReceiveChannel, listener: (event: any, ...args: any[]) => void): () => void;
  getPathForFile(file: File): string;
  openExternal(url: string): Promise<void>;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}
