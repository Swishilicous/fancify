import { Plugin } from "@vizality/entities";
import { getModule } from "@vizality/webpack";
import { patch, unpatch } from "@vizality/patcher"
import util from "@vizality/util"; 

import FancyText from "./fancytext.json"
import owoify from "./owoify"

const Settings = require("./components/Settings")

export default class vztm extends Plugin {
  async start () {
    this.registerSettings(Settings)
    vizality.api.commands.registerCommand({
      command: "tm-er",
      description: "Toggles tm-er.",
      usage: "{c} text",
      executor: async (args) => {
        // TODO: Send a toast
        this.settings.set("tmwordtoggle", !this.settings.get("tmwordtoggle"))
        return {
          send: false,
          result: `Switched tm-er to ${this.settings.get("tmwordtoggle")}`// TODO: Format to make it be on/off
        }
      }
    })


    vizality.api.commands.registerCommand({
      command: "clapify",
      description: "Clapifies 👏 your 👏 message.",
      usage: "{c} [-t] text",
      executor: async (args) => {
        let char = this.settings.get("clapchar", "👏")

        return {
          send: true,
          result: args.join(" ").replace(/ /g, ` ${char} `)
        }
      }
    })
    vizality.api.commands.registerCommand({
      command: "toggle-clapify",
      description: "Toggles 👏 clapifing 👏 your 👏 message.",
      usage: "{c}",
      executor: async (args) => {
        this.settings.set("clapchartoggle", !this.settings.get("clapchartoggle"))
        return {
          send: false,
          result: `Switched clapify to ${this.settings.get("clapchartoggle")}`// TODO: Format to make it be on/off
          // TODO: Make a toast for this
        }
      }
    })
    vizality.api.commands.registerCommand({
      command: "bigtext",
      description: "Makes your text big.",
      usage: "{c} text",
      executor: async (args) => {
        return {
          send: true,
          result: args.join(" ").toLowerCase().split("").map(c => c.match(/[a-z]/i) ? `:regional_indicator_${c}:` : c.replace(/þ/gi, ":regional_indicator_t::regional_indicator_h:").replace(/ß/g, ":regional_indicator_s::regional_indicator_s:")).join("") // Thanks swish :)
        }
      }
    })
    vizality.api.commands.registerCommand({
      command: "owoify",
      description: "Makes you cute and weird.",
      usage: "{c} text",
      executor: async (args) => {
        return {
          send: true,
          result: owoify(args.join(" "))
        }
      }
    })
    vizality.api.commands.registerCommand({
      command: "fancytext",
      description: "Makes your message 𝐹𝒶𝓃𝒸𝓎.",
      usage: "{c} text",
      executor: async (args) => {
        return {
          send: true,
          result: args.join("  ").split("").map(c => c in FancyText ? FancyText[c] : c).join("") // Again thanks swish :)))) 
        }
      }
    })
    vizality.api.commands.registerCommand({
      command: "thornify",
      description: "Makes your message þornified.",
      usage: "{c} text",
      executor: async (args) => {
        return {
          send: true,
          result: args.join(" ").replace(/th/g, "þ").replace(/Th/g, "Þ").replace(/tH/g, "Þ").replace(/TH/g, "Þ") // Idea by vax or cute as they call themselves
        }
      }
    })
    vizality.api.commands.registerCommand({
      command: "toggle-thornify",
      description: "Toggles þornify",
      usage: "{c} text",
      executor: async (args) => {
        this.settings.set("thornifytoggle", !this.settings.get("thornifytoggle"))
        return {
          send: false,
          result: `Toggled thornify to ${this.settings.get("thornifytoggle") ? "on" : "off"}` 
        }
      }
    })
    vizality.api.commands.registerCommand({
      command: "ssify",
      description: "Makes your message ßified.",
      usage: "{c} text",
      executor: async (args) => {
        return {
          send: true,
          result: args.join(" ").replace(/ss/g, "ß") // Idea by vax or cute as they call themselves
        }
      }
    })
    vizality.api.commands.registerCommand({
      command: "toggle-ssify",
      description: "Toggles ßified",
      usage: "{c} text",
      executor: async (args) => {
        this.settings.set("togglessify", !this.settings.get("togglessify"))
        return {
          send: false,
          result: `Toggled ssify to ${this.settings.get("togglessify") ? "on" : "off"}` 
        }
      }
    })
    vizality.api.commands.registerCommand({
      command: "cutie",
      description: "Yes.",
      usage: "{c}",
      executor: async (args) => {
        return {
          send: true,
          result: `<@764495937095204895> is a cutie i guess (maybe a furry).` 
        }
      }
    })
    
    const MessageEvents = await getModule("sendMessage")
		  patch("message-send", MessageEvents, "sendMessage", (args) => {
        let text = args[1].content
        if (text.startsWith(this.settings.get("commandprefix", "."))) return;

        if (this.settings.get("tmwordtoggle") == true) {
          let dict = this.settings.get("dictionary").split(",")
          let appendWord = this.settings.get("tmword", "™")
          dict.forEach(element => {
            text = text.replace(element, `${element}${appendWord}`)
          });
        }
        if (this.settings.get("clapchartoggle") == true) {
          let char = this.settings.get("clapchar", "👏")
          text = text.replace(/ /g, ` ${char} `)
        }
        if (this.settings.get("thornifytoggle") == true) {
          text = text.replace(/th/g, "þ").replace(/Th/g, "Þ").replace(/tH/g, "Þ").replace(/TH/g, "Þ") // Idea by vax or cute as they call themselves
        }
        if (this.settings.get("togglessify") == true) {
          text = text.replace(/ss/g, "ß")
        }
        
        args[1].content = text
      	return args
    }, true)

  }
  stop () {
    vizality.api.commands.unregisterCommand("tm-er")
    vizality.api.commands.unregisterCommand("clapify")
    vizality.api.commands.unregisterCommand("toggle-clapify")
    vizality.api.commands.unregisterCommand("bigtext")
    vizality.api.commands.unregisterCommand("owoify")
    vizality.api.commands.unregisterCommand("fancytext")
    vizality.api.commands.unregisterCommand("thornify")
    vizality.api.commands.unregisterCommand("toggle-thornify")
    vizality.api.commands.unregisterCommand("ssify")
    vizality.api.commands.unregisterCommand("toggle-ssify")
    vizality.api.commands.unregisterCommand("cutie")
    unpatch("message-send")
  }
}