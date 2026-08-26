import { sendIpc } from './ipc';

/**
 * Returns a runtime snapshot of memory, focus, and document state.
 */
export const getRendererRuntimeSnapshot = () => {
  const memory = performance?.memory
    ? {
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        usedJSHeapSize: performance.memory.usedJSHeapSize,
      }
    : null;

  return {
    href: window.location.href,
    visibilityState: document.visibilityState,
    readyState: document.readyState,
    hasFocus: typeof document.hasFocus === 'function' ? document.hasFocus() : null,
    memory,
  };
};

/**
 * Sends a log entry to the main process via IPC.
 */
export const sendRendererLog = (level, message, details = null) => {
  sendIpc('renderer-log', { level, message, details });
};

/**
 * Intercepts console.error to log React rendering depth / loop errors via IPC.
 */
export const installConsoleLogging = () => {
  const originalConsoleError = console.error.bind(console);

  console.error = (...args) => {
    try {
      const [firstArg, ...restArgs] = args;
      let normalizedMessage = '';
      try {
        normalizedMessage = typeof firstArg === 'string' ? firstArg : String(firstArg);
      } catch {
        normalizedMessage = '';
      }

      if (
        normalizedMessage.includes('Maximum update depth exceeded') ||
        normalizedMessage.includes('Too many re-renders')
      ) {
        sendRendererLog('ERROR', 'Renderer React console error', {
          message: normalizedMessage,
          args: restArgs.map((arg) => {
            if (arg instanceof Error) {
              return {
                name: arg.name,
                message: arg.message,
                stack: arg.stack,
              };
            }
            if (typeof arg === 'string') {
              return arg;
            }
            try {
              return JSON.parse(JSON.stringify(arg));
            } catch {
              try {
                return String(arg);
              } catch {
                return '[Unformattable Object]';
              }
            }
          }),
          runtime: getRendererRuntimeSnapshot(),
        });
      }
    } catch (err) {
      originalConsoleError(err);
    }

    originalConsoleError(...args);
  };
};

/**
 * Attaches global window error and unhandled rejection listeners.
 */
export const installWindowErrorListeners = () => {
  window.addEventListener('error', (event) => {
    sendRendererLog('ERROR', 'Renderer window error', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error
        ? {
            name: event.error.name,
            message: event.error.message,
            stack: event.error.stack,
          }
        : null,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason =
      event.reason instanceof Error
        ? {
            name: event.reason.name,
            message: event.reason.message,
            stack: event.reason.stack,
          }
        : event.reason;

    sendRendererLog('ERROR', 'Renderer unhandled promise rejection', reason);
  });
};

/**
 * Initializes all renderer logging and global error interception.
 */
export function initRendererLogger() {
  installConsoleLogging();
  installWindowErrorListeners();
}

export default initRendererLogger;
