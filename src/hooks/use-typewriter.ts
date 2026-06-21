import { useEffect, useState } from "react";

/**
 * Smoothly types out the given text character-by-character.
 * Resets whenever `text` changes.
 */
export function useTypewriter(text: string, speed = 22, startDelay = 600) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setOut("");
    setDone(false);
    let i = 0;
    let intervalId: number | undefined;
    const start = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          window.clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(start);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { text: out, done };
}
