export const useWorkerFetch = () => {
  let worker: Worker | null = null;
  let requestId = 0;
  const pendingRequests = new Map();

  const initWorker = () => {
    if (typeof Worker !== "undefined") {
      worker = new Worker("/fetch-worker.js");

      worker.onmessage = (e) => {
        const { requestId, result, error, success } = e.data;
        const { resolve, reject } = pendingRequests.get(requestId) || {};

        if (success) {
          resolve?.(result);
        } else {
          reject?.(new Error(error));
        }

        pendingRequests.delete(requestId);
      };
    }
  };
  const fetchDetailInWorker = (id: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!worker) {
        reject(new Error("Worker not available"));
        return;
      }

      const currentRequestId = ++requestId;
      pendingRequests.set(currentRequestId, { resolve, reject });

      worker.postMessage({ id, requestId: currentRequestId });
    });
  };

  const cleanup = () => {
    worker?.terminate();
    worker = null;
    pendingRequests.clear();
  };

  return {
    initWorker,
    fetchDetailInWorker,
    cleanup,
  };
};
