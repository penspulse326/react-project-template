import { useState } from 'react';
import { Button } from '~/components/ui/button';

export default function Example1UseState() {
  const [count, setCount] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);

  function handleIncrease() {
    setCount(count + 1);
  }

  function handleReset() {
    setCount(0);
    setCountdown(null);
  }

  async function handleAsyncCalculate() {
    if (countdown !== null) {
      return;
    } // 避免重複點擊

    const totalTime = 1500;
    const intervalTime = 100;
    let timeLeft = totalTime;

    setCountdown(timeLeft / 1000);

    const timer = setInterval(() => {
      timeLeft -= intervalTime;

      if (timeLeft <= 0) {
        clearInterval(timer);
        setCountdown(null);
      } else {
        setCountdown(timeLeft / 1000);
      }
    }, intervalTime);

    setTimeout(() => {
      setCount(prev => prev + 1);
    }, totalTime);
  }

  return (
    <>
      <h1 className="text-4xl font-extrabold tracking-tight">[example-1] useState</h1>
      <p className="text-lg text-slate-400">{count}</p>

      <div className="flex items-center justify-center gap-2">
        <Button onClick={handleIncrease}>增加</Button>
        <Button onClick={handleAsyncCalculate} disabled={countdown !== null}>
          {countdown !== null ? `增加中 (${countdown.toFixed(1)}s)` : '異步增加'}
        </Button>
        <Button onClick={handleReset}>重置</Button>
      </div>
    </>
  );
}
