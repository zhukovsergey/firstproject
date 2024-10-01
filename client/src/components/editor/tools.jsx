import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import Link from "@editorjs/link";
import ImageTool from "@pawritharya/editorjs-image-tool-delete";

import fileUpload, { deleteImageFromServer } from "@/common/aws";

const uploadImageByFile = (e) => {
  return fileUpload(e).then((url) => {
    console.log(url);
    return {
      success: 1,
      file: {
        url: "http://localhost:3000" + url.url,
      },
    };
  });
};

export const tools = {
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true,
  },
  link: Link,
  image: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByFile: uploadImageByFile,
        uploadByURL: false,
      },
      deleter: {
        deleteFile: async (url) => deleteImageFromServer(url),
      },
    },
  },
  header: {
    class: Header,
    config: {
      defaultLevel: 2,
      placeholder: "Заголовок",
      levels: [2, 3],
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      defaultLevel: 2,
      placeholder: "Цитата",
    },
  },
  marker: Marker,
  inlineCode: InlineCode,
};
