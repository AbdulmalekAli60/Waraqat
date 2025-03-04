"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState, useRef } from "react";

// Define proper types for Froala Editor
interface FroalaEditorInstance {
  html: {
    get: () => string;
    set: (content: string) => void;
  };
  // Add other methods you might need
}

// Define props interface
interface TextEditorProps {
  onContentChange: (content: string) => void;
  initialContent?: string;
}

const FroalaEditor = dynamic(
  async () => {
    const values = await Promise.all([
      import("react-froala-wysiwyg"),
      import("froala-editor/css/froala_editor.pkgd.min.css"),
      import("froala-editor/css/froala_style.min.css"),
      import("froala-editor/js/plugins/image.min.js"),
      import("froala-editor/js/plugins/char_counter.min.js"),
      import("froala-editor/js/plugins/save.min.js"),
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

export default function TextEditor({ onContentChange, initialContent = "" }: TextEditorProps) {
  const [model, setModel] = useState(initialContent);
  const [isClient, setIsClient] = useState(false);
  const editorRef = useRef<FroalaEditorInstance | null>(null);

  useEffect(() => {
    setIsClient(true);
    const savedContent = localStorage.getItem("savedHtml");
    if (savedContent) {
      setModel(savedContent);
      onContentChange(savedContent);
    }
  }, [onContentChange]);  


  useEffect(() => {
   
    const savedContent = localStorage.getItem("savedHtml");
    if (savedContent) {
      onContentChange(savedContent);
    }
  }, [onContentChange]);

  const handleModelChange = (content: string) => {
    setModel(content);
    localStorage.setItem("savedHtml", content);
    onContentChange(content);
  };

  if (!isClient) {
    return (
      <div className="min-h-[200px] w-full flex items-center justify-center bg-gray-50 border rounded-md">
        <p className="text-gray-400">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="pb-4">
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
            toolbarSticky: true,
            toolbarStickyOffset: 0,
            heightMin: 300,
            heightMax: 600,
            toolbarButtons: {
              moreText: {
                buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontSize', 'textColor', 'backgroundColor', 'clearFormatting'],
              },
              moreParagraph: {
                buttons: ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'lineHeight', 'outdent', 'indent', 'quote'],
              },
              moreRich: {
                buttons: ['insertImage', 'insertHR', 'emoticons', 'specialCharacters'],
              },
              moreMisc: {
                buttons: ['undo', 'redo', 'selectAll'],
                align: 'right',
                buttonsVisible: 2,
              }
            },
            events: {
              "charCounter.exceeded": function() {
                alert("You have reached the maximum number of characters");
              },
              'initialized': function(this: FroalaEditorInstance) {
                editorRef.current = this;
              }
            },
          }}
        />
      </div>
      
      {model && (
        <div className="p-4 border rounded-md bg-white">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Preview:</h3>
          <div className="prose max-w-none">
            <FroalaEditorView model={model} />
          </div>
        </div>
      )}
    </div>
  );
}