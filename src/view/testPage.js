import React from "react"
import { render } from "react-dom"
import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/theme-github"
import 'ace-builds/src-noconflict/ext-language_tools'


const TestPage = (props) => {

  function onChange (newValue) {
    console.log("change", newValue)
  }

  return <div>
    <AceEditor
      mode="c_cpp"
      theme="github"
      onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      setOptions={
        {
          enableLiveAutocompletion: true
        }
      }
    />
  </div>
}


export default TestPage
