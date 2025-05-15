nui = {}
nui.registerNuiCallback = RegisterNUICallback
nui.setNuiFocus = SetNuiFocus

---@param action string
---@param data? any
function nui.sendAction(action, data)
   SendNUIMessage({
      action = action,
      data = data
   })
end

function nui.setVisibility(visible)
   nui.setNuiFocus(visible, visible)
   nui.sendAction("setVisible", visible)
end

-- Callbacks --

nui.registerNuiCallback("close", function(data, cb)
   cb()
   nui.setVisibility(false)
end)
