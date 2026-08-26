/**
 * Queue and buffering manager for telemetry events.
 */

class TelemetryQueue {
  constructor(maxQueueSize = 50) {
    this.queue = [];
    this.maxQueueSize = maxQueueSize;
  }

  /**
   * Enqueues an event for batching or delayed dispatch.
   * @param {string} type
   * @param {object} payload
   */
  enqueue(type, payload) {
    if (this.queue.length >= this.maxQueueSize) {
      this.queue.shift(); // Drop oldest event if capacity is exceeded
    }
    this.queue.push({
      type,
      payload,
      timestamp: Date.now(),
    });
  }

  /**
   * Drains the queue and returns all accumulated events.
   * @returns {Array<{ type: string, payload: object, timestamp: number }>}
   */
  drain() {
    const items = [...this.queue];
    this.queue = [];
    return items;
  }

  /**
   * Clears the queue without returning items.
   */
  clear() {
    this.queue = [];
  }

  /**
   * Returns the current number of queued items.
   */
  get size() {
    return this.queue.length;
  }
}

export const telemetryQueue = new TelemetryQueue();
export default telemetryQueue;
