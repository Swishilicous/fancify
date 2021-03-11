import { Plugin } from '@vizality/entities';
import { getModule } from '@vizality/webpack';
import { patch, unpatch } from '@vizality/patcher'
import util from '@vizality/util'; 
import FancyText from "./fancytext.json"


const Settings = require('./components/Settings')



// TODO: refactor to all separate files


export default class vztm extends Plugin {
  async start () {
		this.registerSettings(Settings)

    vizality.api.commands.registerCommand({
      command: "tm-er",
      description: 'Toggles tm-er.',
      usage: '{c} text',
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
      description: 'Clapifies 👏 your 👏 message.',
      usage: '{c} [-t] text',
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
      description: 'Toggles 👏 clapifing 👏 your 👏 message.',
      usage: '{c}',
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
      description: 'Makes your text big.',
      usage: '{c} text',
      executor: async (args) => {
        return {
          send: true,
          result: args.join(' ').toLowerCase().split('').map(c => c.match(/[a-z]/i) ? `:regional_indicator_${c}:` : c).join('') // Thanks swish :)
        }
      }
    })
    vizality.api.commands.registerCommand({
      command: "owoify",
      description: 'Makes your cute and weird.',
      usage: '{c} text',
      executor: async (args) => {
        return {
          send: true,
          result: util.string.owoifyText(args.join(" "))
        }
      }
    })
    vizality.api.commands.registerCommand({
      command: "fancytext",
      description: 'Makes your message 𝐹𝒶𝓃𝒸𝓎.',
      usage: '{c} text',
      executor: async (args) => {
        return {
          send: true,
          result: args.join('       ').split('').map(c => c in FancyText ? FancyText[c] : c).join('') // Again thanks swish :))))
        }
      }
    })
    vizality.api.commands.registerCommand({
      command: "thornify",
      description: 'Makes your message þornified.',
      usage: '{c} text',
      executor: async (args) => {
        return {
          send: true,
          result: args.join(" ").replace(/th/gi, "þ")
        }
      }
    })
    
    

    const MessageEvents = await getModule('sendMessage')
		  patch('message-send', MessageEvents, 'sendMessage', (args) => {
        let text = args[1].content

        if (this.settings.get('tmwordtoggle') == true) {
          let dict = this.settings.get('dictionary').split(',')
          let appendWord = this.settings.get('tmword', '™')
          dict.forEach(element => {
            text = text.replace(element, `${element}${appendWord}`)
          });
        }
        if (this.settings.get("clapchartoggle") == true) {
          let char = this.settings.get("clapchar", "👏")
          text = text.replace(/ /g, ` ${char} `)
        }
        
        args[1].content = text
      	return args
    }, true)

  }
  stop () {
    vizality.api.commands.unregisterCommand('tm-er')
    vizality.api.commands.unregisterCommand('clapify')
    vizality.api.commands.unregisterCommand('toggle-clapify')
    vizality.api.commands.unregisterCommand('bigtext')
    vizality.api.commands.unregisterCommand('owoify')
    vizality.api.commands.unregisterCommand('fancytext')
    unpatch('message-send')
  }
}