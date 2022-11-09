import EditorJS from "@editorjs/editorjs";

import List from "@editorjs/list";
import Header from "editorjs-header-with-alignment";
import SimpleImage from "@editorjs/simple-image";
import Checklist from "@editorjs/checklist";
import RawTool from "@editorjs/raw";
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";
import editorjsCodeflask from "@calumk/editorjs-codeflask";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import DragDrop from "editorjs-drag-drop";

import "./style.css";

const configureEditor = (holder, readOnly = false) => {
  return {
    onReady: () => {
      new DragDrop(editor);
    },
    holder: holder,
    readOnly: readOnly,
    tools: {
      header: {
        class: Header,
        config: {
          placeholder: "Введите заголовок",
          levels: [1, 2, 3, 4],
          defaultLevel: 2,
        },
      },
      image: SimpleImage,
      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },
      raw: RawTool,
      list: {
        class: List,
        inlineToolbar: true,
        config: {
          defaultStyle: "unordered",
        },
      },
      embed: Embed,
      quote: Quote,
      code: {
        class: editorjsCodeflask,
        showlinenumbers: false,
      },
      Marker: {
        class: Marker,
        shortcut: "CMD+SHIFT+M",
      },
      inlineCode: {
        class: InlineCode,
      },
    },
    placeholder: "Let`s write an awesome story!",
  };
};

const editor = new EditorJS(configureEditor("editorjs", false));

const saveButton = document.querySelector(".btn-save");
const readOnlyBlock = document.querySelector("#readonly");
const dataContainer = document.querySelector(".data-container");

saveButton.addEventListener("click", () => {
  editor
    .save()
    .then((data) => {
      readOnlyBlock.innerHTML = "";
      const readOnlyEditor = new EditorJS(configureEditor("readonly", true));
      readOnlyEditor.isReady.then(() => {
        readOnlyEditor.render(data);
      });
      const plainData = JSON.stringify(data);
      localStorage.setItem("pageData", plainData);
      dataContainer.innerText = plainData;
      navigator.clipboard.writeText(plainData);
    })
    .catch((error) => {
      console.log("failed", error);
    });
});
