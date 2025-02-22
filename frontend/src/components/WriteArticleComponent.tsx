"use client"; // remove it later
import React, { useEffect, useState } from "react";
import ArticlesCategories from "./ArticlesCategories";
import FroalaEditor from "react-froala-wysiwyg";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/code_view.min.js";
import "froala-editor/js/plugins/save.min.js";
import "froala-editor/js/plugins/markdown.min.js";
import "froala-editor/js/plugins/code_beautifier.min.js";

export default function WriteArticleComponent() {
  const [model, setModel] = useState("");

  useEffect(() => {
    const savedContent = localStorage.getItem("savedHtml");
    if (savedContent) {
      setModel(savedContent);
    } else {
      setModel("");
    }
  }, []);

  function handleModelChange(content: string) {
    // content automatic from the froala editor onModelChange event.
    setModel(content);
    localStorage.setItem("savedHtml", content);
  }

  return (
    <div className="bg-orange-400 mx-auto w-3/4 min-h-screen mt-1 flex flex-col gap-3 p-2">
      {/* title */}
      <input
        type="text"
        className="h-14 w-full border focus:outline-none border-gray-500 border-solid border-s-8 bg-orange-400 text-5xl p-4"
        placeholder="Title..."
        name="title"
      />

      {/* choose category */}
      <div className="bg-red-500 p-2 border-s-8 border-gray-500 flex gap-2 flex-wrap">
        <ArticlesCategories />
      </div>

      {/* text editor */}
      <div className="mt-6">
        <FroalaEditor
          model={model}
          onModelChange={handleModelChange}
          tag="textarea"
          config={{
            placeholderText: "Write !",
            charCounterCount: true,
            charCounterMax: 100,
            saveInterval: 1000,
            events: {
              "charCounter.exceeded": function () {
                alert("you have reached the max number of characters");
              },
            },
          }}
        />
        {model && <FroalaEditorView model={model} />}
      </div>
    </div>
  );
}
