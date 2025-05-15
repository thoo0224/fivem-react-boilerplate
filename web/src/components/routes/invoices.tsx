import type { Invoice } from "~/types"
import { Button } from "../ui/button"

export default function InvoicesRoute(props: {
  invoices: Invoice[]
}) {
  return (
    <div>
      {props.invoices.length > 0 ? (
        <table className="min-w-full border border-border rounded-md overflow-hidden">
          <thead className="bg-card">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Omschrijving</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Van</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Bedrag</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Datum</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-t border-border"
              >
                <td className="px-4 py-2 text-sm">{invoice.id}</td>
                <td className="px-4 py-2 text-sm">{invoice.description}</td>
                <td className="px-4 py-2 text-sm">{invoice.from}</td>
                <td className="px-4 py-2 text-sm">
                  €{invoice.amount.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-2 text-sm">
                  {invoice.date instanceof Date
                    ? `${invoice.date.toLocaleDateString()} ${invoice.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                    : invoice.date}
                </td>
                <td className="px-4 py-2.5">
                  <Button className="text-sm" size="sm" variant="outline">
                    Betalen
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <span className="text-sm text-foreground/80">Je hebt geen openstaande facturen!</span>
      )}
    </div>
  )
}
