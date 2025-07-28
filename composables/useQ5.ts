export const useQ5 = () => {
  const fetchList = () => {
    return new Promise<{ id: string }[]>((resolve, reject) => {
      setTimeout(() => {
        resolve([
          { id: '1' },
          { id: '2' },
          { id: '3' },
          { id: '4' },
          { id: '5' },
          { id: '6' },
          { id: '7' },
          { id: '8' },
          { id: '9' },
          { id: '10' },
          { id: '11' },
          { id: '12' },
          { id: '13' },
          { id: '14' },
          { id: '15' },
          { id: '16' },
          { id: '17' },
          { id: '18' },
          { id: '19' },
          { id: '20' },
        ])
      }, 1000)
    })
  }
  
  const fetchDetail = (id: string) => {
    const now = Date.now()
    console.log('start to fetch detail with id', id, 'at', now);
    return new Promise<{ id: string, name: string, ans: number }>((resolve, reject) => {
      setTimeout(() => {
        resolve({ id, name: `John Doe ${id}`, ans: mockHeavy(+id % 5 + 37) })
        console.log('fetch detail with id', id, 'done at', Date.now() - now);
      }, 3000 * Math.random())
    })
  }

  /**
   * Mock heavy function to simulate the heavy calculation
   */
  const mockHeavy = (n: number): number => {
    if (n <= 1) return n;
    return mockHeavy(n - 1) + mockHeavy(n - 2);
  }

  return {
    fetchList,
    fetchDetail,
    mockHeavy
  }
}
