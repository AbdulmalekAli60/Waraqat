"use client";
import { useCreateNewArticle } from "@/context/NewArticleContext";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

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

export default function TextEditore() {
  const [model, setModel] = useState("");
  const [isClient, setIsClient] = useState(false);

  const { newArticleData, setNewArticleData } = useCreateNewArticle();

  useEffect(() => {
    setIsClient(true);
    const savedContent = localStorage.getItem("savedHtml");
    if (savedContent) {
      setModel(savedContent);
    }
  }, []);

  function handleModelChange(content: string) {
    setModel(content);
    setNewArticleData({ ...newArticleData, content: content });
    localStorage.setItem("savedHtml", content);
  }

  if (!isClient) {
    return null; // loading
  }

  return (
    <div>
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
  );
}
