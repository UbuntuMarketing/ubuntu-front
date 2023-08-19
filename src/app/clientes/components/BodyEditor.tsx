"use client";
import "@mdxeditor/editor/style.css";
import { headingsPlugin } from "@mdxeditor/editor/plugins/headings";
import { toolbarPlugin } from "@mdxeditor/editor/plugins/toolbar";
import { linkPlugin } from '@mdxeditor/editor/plugins/link'
import dynamic from "next/dynamic";
import React, { forwardRef, useEffect } from "react";
import {
   BlockTypeSelect,
   BoldItalicUnderlineToggles,
   CreateLink,
   InsertImage,
   MDXEditorMethods,
   MDXEditorProps,
   UndoRedo,
   imagePlugin,
   linkDialogPlugin,   
} from "@mdxeditor/editor";
import Button from "./Button";

const MDXEditorComponent = dynamic(
   // preferred way
   () => import("@mdxeditor/editor/MDXEditor").then((mod) => mod.MDXEditor),
   // legacy, larger bundle/
   // () => import('@mdxeditor/editor').then((mod) => mod.MDXEditor),
   { ssr: false }
);
const MDXEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => (
   <MDXEditorComponent ref={ref} {...props} />
 ));
 MDXEditor.displayName = 'MDXEditor';

const BodyEditor = ({handleBody}: {handleBody: (markdown:string) => void}) => {
   const ref = React.useRef<MDXEditorMethods>(null)
   useEffect( () => {
      console.log(ref.current)
   });

   const handleChange = (mdk: string) => {
      //Cuidado que si al enviar esta función que actualiza estado y se envia la campaña rapidamente
      //Pueda no haber cambiado a tiempo
      handleBody(mdk);  
      // console.log(mdk);
   };

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
                  <BlockTypeSelect/>
                  <InsertImage/>
                  <Button label="image" onClick={(e) => { e.preventDefault(); console.log('click')}}/>
                  <CreateLink/>
               </>
            ),
         }),
           headingsPlugin(),
           imagePlugin({
               imageUploadHandler: (img) => {
                  console.log(img)
                   return Promise.resolve('https://picsum.photos/200/300')
                 },
                 
           }),
           linkPlugin(),
           linkDialogPlugin(),
           
        ]}
     />
    </div>
      
   );
};

export default BodyEditor;
