module.exports = {
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
    }