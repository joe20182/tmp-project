const fetchDetail = (id) => {
  const now = Date.now();
  console.log("start to fetch detail with id", id, "at", now);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id, name: `John Doe ${id}`, ans: mockHeavy((+id % 5) + 37) });
      console.log("fetch detail with id", id, "done at", Date.now() - now);
    }, 3000 * Math.random());
  });
};

/**
 * Mock heavy function to simulate the heavy calculation
 */
const mockHeavy = (n) => {
  if (n <= 1) return n;
  return mockHeavy(n - 1) + mockHeavy(n - 2);
};

// 監聽主線程消息
self.onmessage = async function (e) {
  const { id, requestId } = e.data;

  try {
    const result = await fetchDetail(id);
    self.postMessage({ requestId, result, success: true });
  } catch (error) {
    self.postMessage({ requestId, error: error.message, success: false });
  }
};
