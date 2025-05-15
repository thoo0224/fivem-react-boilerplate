import { useState } from "react";

import { useNuiEvent } from "~/hooks/useNuiEvent";
import { useKeyListener } from "~/hooks/useKeyListener";
import { fetchNui } from "~/lib/nui";

import { Button } from "./ui/button";

export default function App() {
  const [visible, setVisible] = useState(false);

  useNuiEvent("setVisible", setVisible);

  useKeyListener("Escape", () => {
    fetchNui("close")
  });

  return <div className="w-screen h-screen flex items-center justify-center">
    {visible && <main className="w-3/5 h-2/5 bg-background rounded-lg p-4">
      <Button>
        Hello
      </Button>
    </main>}
  </div>
}
