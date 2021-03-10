import { Plugin } from '@vizality/entities';
import { getModule } from '@vizality/webpack';
import { patch, unpatch } from '@vizality/patcher'


const Settings = require('./components/Settings')

export default class vztm extends Plugin {
  async start () {
		this.registerSettings(Settings)

    const MessageEvents = await getModule('sendMessage')
		  patch('message-send', MessageEvents, 'sendMessage', (args) => {
        var text = args[1].content
        var dict = this.settings.get('dictionary').split(',')
        var appendWord = this.settings.get('tmword')

        if (this.settings.get('tmwordtoggle') == true) {
          dict.forEach(element => {
            text = text.replace(element, `${element}${appendWord}`)
          });
        }


        args[1].content = text
      	return args
    }, true)

  }
  stop () {
     unpatch('message-send')
  }
}