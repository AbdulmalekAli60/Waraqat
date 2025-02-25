"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState, useRef } from "react";

const FroalaEditor = dynamic(
  async () => {
    const values = await Promise.all([
      import("react-froala-wysiwyg"),
      import("froala-editor/css/froala_editor.pkgd.min.css"),
      import("froala-editor/css/froala_style.min.css"),
      import("froala-editor/js/plugins/image.min.js"),
      import("froala-editor/js/plugins/char_counter.min.js"),
      import("froala-editor/js/plugins/code_view.min.js"),
      import("froala-editor/js/plugins/save.min.js"),
      import("froala-editor/js/plugins/markdown.min.js"),
      import("froala-editor/js/plugins/code_beautifier.min.js"),
    ]);
    return values[0].default;
  },
  { ssr: false }
);

const FroalaEditorView = dynamic(
  async () => {
    const values = await Promise.all([
      import("react-froala-wysiwyg/FroalaEditorView"),
    ]);
    return values[0].default;
  },
  { ssr: false }
);

export default function TextEditor({ onContentChange, initialContent = "" }) {
  const [model, setModel] = useState(initialContent);
  const [isClient, setIsClient] = useState(false);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
    const savedContent = localStorage.getItem("savedHtml");
    if (savedContent) {
      setModel(savedContent);
      onContentChange(savedContent);
    }
  }, []);

  const handleModelChange = (content: string) => {
    setModel(content);
    localStorage.setItem("savedHtml", content);
    onContentChange(content);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <FroalaEditor
        ref={editorRef}
        model={model}
        onModelChange={handleModelChange}
        tag="textarea"
        config={{
          placeholderText: "Write your article here!",
          charCounterCount: true,
          charCounterMax: 100000,
          saveInterval: 1000,
          events: {
            "charCounter.exceeded": function() {
              alert("You have reached the maximum number of characters");
            },
            'initialized': function() {
              editorRef.current = this;
            }
          },
        }}
      />
      {model && <FroalaEditorView model={model} />}
    </div>
  );
}