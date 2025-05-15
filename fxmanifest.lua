fx_version "cerulean"
game "gta5"
lua54 "yes"

author "Haarlem Roleplay"
version "1.0.0"

ui_page "web/dist/index.html"

client_scripts {
	"src/client/nui.lua",
	"src/client/client.lua"
}

files {
	"web/dist/index.html",
	"web/dist/**/*",
}
