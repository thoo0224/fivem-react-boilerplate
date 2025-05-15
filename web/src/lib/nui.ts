import type { NuiAction } from "~/hooks/useNuiEvent";

export function getParentResourceName() {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const getResourceName = (window as any).GetParentResourceName;
   return getResourceName ? getResourceName() : "nui-frame-app";
}

export function isBrowser() {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   return !(window as any).invokeNative;
}

export async function fetchNui<T, D>(event: string, data?: D) {
   const resourceName = getParentResourceName();
   const response = await fetch(`https://${resourceName}/${event}`, {
      method: "post",
      headers: {
         "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
   });

   const body = await response.json();
   return body as T;
}

export function debugEvent<T>(
   events: NuiAction<T> | NuiAction<T>[],
   delay: number = 1000,
) {
   if (!isBrowser()) return;

   events = Array.isArray(events) ? events : [events];
   for (const event of events) {
      setTimeout(() => {
         window.dispatchEvent(
            new MessageEvent("message", {
               data: {
                  action: event.action,
                  data: event.data,
               },
            }),
         );
      }, delay);
   }
}
