import { useState } from "react";
import { motion } from "motion/react";

import { useNuiEvent } from "~/hooks/useNuiEvent";
import { useKeyListener } from "~/hooks/useKeyListener";
import { debugEvent, fetchNui } from "~/lib/nui";

import { Button } from "./ui/button";

debugEvent({
  action: "setVisible",
  data: true
}, 1000)

export default function App() {
  const [visible, setVisible] = useState(false);

  useNuiEvent("setVisible", setVisible);

  useKeyListener(["Escape", "F7"], () => {
    fetchNui("close")
  });

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <motion.div
        className="w-3/5 h-2/5 bg-background rounded-lg p-4"
        initial={{ scale: 0.8, opacity: 0, pointerEvents: "none" }}
        animate={{
          scale: visible ? 1 : 0.8,
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none"
        }}
        exit={{ scale: 0.8, opacity: 0, pointerEvents: "none" }}
        transition={{
          type: "spring",
          stiffness: 900,
          damping: 30,
          opacity: { duration: 0.1, ease: "linear" }
        }}
      >
        <Button>
          Hello
        </Button>
      </motion.div>
    </div>
  )
}
