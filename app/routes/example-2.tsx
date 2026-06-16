import { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button';

export default function Example2Page() {
  const [count, setCount] = useState(0);

  function handleIncrease() {
    setCount(count + 1);
  }

  function handleReset() {
    setCount(0);
  }

  /**
   * - 每次渲染都會觸發
   * - 沒有 dependencies
   */
  useEffect(() => {
    console.warn(count % 2 === 0 ? '偶數' : '奇數');
  });

  /**
   * - 只在初始化時觸發
   * - 空的 dependencies
   */
  useEffect(() => {
    console.warn('mounted');
  }, []);

  /**
   * - 只有 dependencies 發生變動時，才會觸發
   */
  useEffect(() => {
    console.warn(`count: ${count}`);
  }, [count]);

  /**
   * - 無窮迴圈
   */
  // useEffect(() => {
  //   setCount(prev => prev + 1)
  //   console.warn('小心無窮迴圈')
  // }, [count]);

  return (
    <>
      <h1 className="text-4xl font-extrabold tracking-tight">[example-02] useEffect</h1>
      <p className="text-lg text-slate-400">{count}</p>

      <div className="flex items-center justify-center gap-2">
        <Button onClick={handleIncrease}>增加</Button>
        <Button onClick={handleReset}>重置</Button>
      </div>
    </>
  );
}
