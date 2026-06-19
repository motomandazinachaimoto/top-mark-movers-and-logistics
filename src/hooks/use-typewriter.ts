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
    const start = window.setTimeout(() => {
      const id = window.setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          window.clearInterval(id);
          setDone(true);
        }
      }, speed);
      // attach for cleanup
      (start as unknown as { _id: number })._id = id;
    }, startDelay);

    return () => {
      window.clearTimeout(start);
      const id = (start as unknown as { _id?: number })._id;
      if (id) window.clearInterval(id);
    };
  }, [text, speed, startDelay]);

  return { text: out, done };
}
