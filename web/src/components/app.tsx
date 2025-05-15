import { useState } from "react";
import { motion } from "motion/react";
import { File, History } from "lucide-react";

import { useNuiEvent } from "~/hooks/useNuiEvent";
import { useKeyListener } from "~/hooks/useKeyListener";
import { debugEvent, fetchNui } from "~/lib/nui";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";

import InvoicesRoute from "./routes/invoices";
import HistoryRoute from "./routes/history";
import RouteContainer from "./route-container";

import Logo from "~/assets/haarlem.png";
import type { Invoice } from "~/types";

debugEvent({
  action: "setVisible",
  data: true
}, 1000)

debugEvent<Invoice[]>({
  action: "setInvoices",
  data: [
    {
      id: 1,
      from: "Belastingdienst",
      amount: 120,
      date: new Date(),
      description: "Wegenbelasting",
      status: "pending"
    },
    {
      id: 2,
      from: "Belastingdienst",
      amount: 566_000,
      date: new Date(),
      description: "Inkomstenbelasting",
      status: "pending"
    },
    {
      id: 3,
      from: "Pechhulp",
      amount: 2500,
      date: new Date(),
      description: "Voertuig Reparatie",
      status: "pending"
    }
  ]
})

const routes = [
  {
    label: "Facturen",
    name: "invoices",
    icon: <File />
  },
  {
    label: "Geschiedenis",
    name: "history",
    icon: <History />
  }
]

export default function App() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [visible, setVisible] = useState(false);
  const [route, setRoute] = useState(routes[0].name);

  useNuiEvent("setInvoices", setInvoices);
  useNuiEvent("setVisible", setVisible);

  useKeyListener(["Escape", "F7"], () => {
    fetchNui("close")
  });

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <motion.div
        className="w-3/5 h-3/6 bg-background rounded-lg p-4"
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
        <main className="flex gap-7">
          <aside className="w-1/5">
            <img src={Logo} alt="Haarlem Roleplay" className="w-20 object-contain  max-h-18" />
            <nav className="flex flex-col gap-2 pt-4">
              {routes.map((r) => (
                <Button variant="ghost" key={r.label} className={cn("w-full justify-start", route == r.name && "bg-accent/50")} onClick={() => setRoute(r.name)}>
                  {r.icon}
                  <span>{r.label}</span>
                </Button>
              ))}
            </nav>
          </aside>

          <p className="w-full">
            <RouteContainer label={routes.find((r) => r.name == route)?.label ?? "Unknown"}>
              {route == "invoices" && <InvoicesRoute invoices={invoices} />}
              {route == "history" && <HistoryRoute />}
            </RouteContainer>
          </p>
        </main>
      </motion.div>
    </div>
  )
}
