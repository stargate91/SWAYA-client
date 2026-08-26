/**
 * Monkeypatches window.performance.measure to handle DataCloneError safely.
 */
export function installSafePerformanceMeasure() {
  const perf = window.performance;
  if (!perf || typeof perf.measure !== 'function' || perf.__swayaSafeMeasureInstalled) {
    return;
  }

  const originalMeasure = perf.measure.bind(perf);

  perf.measure = (...args) => {
    try {
      return originalMeasure(...args);
    } catch (error) {
      const isCloneFailure =
        error?.name === 'DataCloneError' ||
        error?.message?.includes('Data cannot be cloned');

      if (!isCloneFailure) {
        throw error;
      }

      try {
        const [name] = args;
        if (typeof name === 'string') {
          return originalMeasure(name);
        }
      } catch (err) {
        console.error(err);
      }

      return undefined;
    }
  };

  perf.__swayaSafeMeasureInstalled = true;
}

export default installSafePerformanceMeasure;
