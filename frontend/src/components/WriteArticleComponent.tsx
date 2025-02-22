import React from "react";
import ArticlesCategories from "./ArticlesCategories";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
export default function WriteArticleComponent() {
  return (
    <div className="bg-orange-400 mx-auto w-3/4 min-h-screen mt-1 flex flex-col gap-3 p-2">
      {/* title */}
      <input
        type="text"
        onClick={() => focus()}
        className="h-14 w-full border focus:outline-none border-gray-500 border-solid border-s-8 bg-orange-400 text-5xl p-4"
        placeholder="Title..."
        name="title"
      />
      {/* title */}

      {/* choose category */}
      <div className="bg-red-500 p-2 border-s-8 border-gray-500 flex gap-2 flex-wrap">
        <ArticlesCategories />
      </div>
      {/* choose category */}

      {/* text editor */}
      <div className="mt-6">
        <FroalaEditor
          tag="texarea"
          config={{
            placeholderText: "Write !",
            charCounterCount: true,
            charCounterMax: 100,
            events: {
              "charCounter.exceeded": function () {
                alert("you have racherd the max number of characters");
              },
            },
          }}
        />
      </div>
      {/* text editor */}
    </div>
  );
}
