import React, { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/gruvbox-dark';
import './App.css'

function App() {
  const [text, setText] = useState(``);
  const editor = useRef(null);
  const previewer = useRef(null);
  const editorToggler = () => editor.current.classList.toggle('full');
  const previewerToggler = () => previewer.current.classList.toggle('full');
  return (
    <div className="App">
      <div className={`editor`} ref={editor}>
        <div className='head'>
          <span><i className="ri-edit-box-line"></i></span>
          <h5>Editor</h5>
          <span><i className="ri-drag-move-2-fill" onClick={editorToggler}></i></span>
        </div>
        <textarea rows={10} cols={30} onChange={e => setText(e.target.value)}></textarea>
      </div>
      <div className={`previewer`} ref={previewer}>
        <div className='head'>
          <span><i className="ri-code-view"></i></span>
          <h5>Previewer</h5>
          <span><i className="ri-drag-move-2-fill" onClick={previewerToggler}></i></span>
        </div>
        <ReactMarkdown
          className='markdown-body'
          children={text}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={prism}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;
