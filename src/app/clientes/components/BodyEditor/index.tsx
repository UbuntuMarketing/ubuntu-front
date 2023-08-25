"use client";
import "@mdxeditor/editor/style.css";
import { headingsPlugin } from "@mdxeditor/editor/plugins/headings";
import { toolbarPlugin } from "@mdxeditor/editor/plugins/toolbar";
import { linkPlugin } from "@mdxeditor/editor/plugins/link";
import React from "react";
import {
   BlockTypeSelect,
   BoldItalicUnderlineToggles,
   CreateLink,
   MDXEditorMethods,
   UndoRedo,
   imagePlugin,
   linkDialogPlugin,
   MDXEditor,
} from "@mdxeditor/editor";
import MyInsertImage from "./MyInsertImage";

// const MDXEditorComponent = dynamic(
//    // preferred way
//    () => import("@mdxeditor/editor/MDXEditor").then((mod) => mod.MDXEditor),
//    // legacy, larger bundle/
//    // () => import('@mdxeditor/editor').then((mod) => mod.MDXEditor),
//    { ssr: false }
// );
// const MDXEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => (
//    <MDXEditorComponent ref={ref} {...props} />
//  ));
//  MDXEditor.displayName = 'MDXEditor';

const BodyEditor = ({
   handleBody,
}: {
   handleBody: (markdown: string) => void;
}) => {
   const ref = React.useRef<MDXEditorMethods>(null);

   const handleChange = (mdk: string) => {
      handleBody(mdk);
   };
   const handleImage = (urlImagen: string, urlRedirect: string) => {
      let dataToAdd = "";

      if (urlImagen.trim() && urlRedirect.trim()) {
         dataToAdd = `\n\n[![alt](${urlImagen})](${urlRedirect})`;
      }
      if (urlImagen.trim() && !urlRedirect.trim()) {
         dataToAdd = `\n\n![](${urlImagen})`;
      }
      const currentMKD = ref.current?.getMarkdown() as string;
      ref.current?.setMarkdown(currentMKD + dataToAdd.replace("\\", ""));
   };

   //https://acumbamail.com/diseno-email/?refered=4&gad=1&gclid=CjwKCAjwloynBhBbEiwAGY25dDftfzk7BSo66flZc8DcOqwxFkxJg8dvVqYGNGwQcv7eFtAlDmG3IhoC4zUQAvD_BwE

   return (
      <div className="editor-container relative">
         <MDXEditor
            ref={ref}
            markdown=""
            onChange={(mdk) => handleChange(mdk)}
            plugins={[
               toolbarPlugin({
                  toolbarContents: () => (
                     <>
                        <UndoRedo />
                        <BoldItalicUnderlineToggles />
                        <BlockTypeSelect />
                        <MyInsertImage onSubmit={handleImage} />
                        <CreateLink />
                     </>
                  ),
               }),
               headingsPlugin(),
               imagePlugin({
                  // imageUploadHandler: (img) => {
                  //    return Promise.resolve("https://picsum.photos/200/300");
                  // },
               }),
               linkPlugin(),
               linkDialogPlugin(),
            ]}
         />
      </div>
   );
};

export default BodyEditor;
