import React, { memo } from "react";
import { TextInput, SwitchItem } from "@vizality/components/settings";

export default memo(({ getSetting, updateSetting, toggleSetting }) => {
  return (
    <div>
     <TextInput
      value={getSetting("commandprefix")}
      onChange={value => {updateSetting("commandprefix", value)}}
    >
      Input your vizality command prefix here, so toggled modules don't take effect on command.
    </TextInput>
    <TextInput
      value={getSetting("dictionary")}
      onChange={value => {updateSetting("dictionary", value)}}
    >
      Your custom dictionary. Separate words with , without spaces. (ex. winston,is,a,furry)
    </TextInput>
    <TextInput
      value={getSetting("tmword")}
      onChange={value => {updateSetting("tmword", value)}}
    >
      Word to append to a word in dictionary.
    </TextInput>
    <SwitchItem
      value={getSetting("tmwordtoggle")}
      onChange={ () => {toggleSetting("tmwordtoggle")}}
    >
      Toggle appending a word.
    </SwitchItem>
    <TextInput
      value={getSetting("clapchar")}
      onChange={value => {updateSetting("clapchar", value)}}
    >
      Text For clapify (ex. this ð­ plugin ð­ is ð­ super ð­ sad)
    </TextInput>
    <SwitchItem
      value={getSetting("clapchartoggle")}
      onChange={value => {toggleSetting("clapchartoggle", value)}}
    >
      Toggle clapify manually.
    </SwitchItem>
    <SwitchItem
      value={getSetting("thornifytoggle")}
      onChange={value => {toggleSetting("thornifytoggle", value)}}
    >
      Toggle Thornify
    </SwitchItem>
    <SwitchItem
      value={getSetting("togglessify")}
      onChange={value => {toggleSetting("togglessify", value)}}
    >
      Toggle Ãify
    </SwitchItem>

    </div>
  );
});
