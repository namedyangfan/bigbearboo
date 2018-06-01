import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import _ from 'lodash'
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


export default class EditorConvertToHTML extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      needAsync: true
    }
  }

  componentDidUpdate(prevProps,prevState){
    if(this.state.needAsync && this.props.html){
      console.log('DIDUPDATE' + this.props.html)

      const html = this.props.html
      const contentBlock = htmlToDraft(html);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState)

      this.setState({
        editorState,
        needAsync: false
      })

    }
  }

  hadnleParentUpdate = _.debounce( (editorState) => {
    this.props.onChange(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    )
  }, 800)

  onEditorStateChange = (editorState) => {
    this.setState({ editorState })

    if (this.props.onChange) {
      this.hadnleParentUpdate(editorState)
    }
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}