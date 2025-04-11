"use client";

import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  ConditionalContents,
  toolbarPlugin,
  ChangeCodeMirrorLanguage,
  UndoRedo,
  Separator,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  imagePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
} from "@mdxeditor/editor";
import "./dark-editor.css";
import {basicDark} from "cm6-theme-basic-dark"
import { useTheme } from "next-themes";
import "@mdxeditor/editor/style.css";

interface Props {
  value: string;
  fieldChange: (value: string) => void;
  editorRef: ForwardedRef<MDXEditorMethods> | null;
}

const Editor = ({ value, editorRef, fieldChange, ...props }: Props) => {

  const {resolvedTheme} = useTheme();
  const theme = resolvedTheme === "dark" ? [basicDark] : [];

  return (
    <MDXEditor
    key={resolvedTheme}
    ref={editorRef}
    markdown={value}
    onChange={fieldChange}
    className="background-light800_dark200 light-border-2 markdown-editor dark-editor w-full border grid"
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        imagePlugin(),
        codeBlockPlugin({defaultCodeBlockLanguage: ""}),
        codeMirrorPlugin({
          codeBlockLanguages: {
            css: "css",
            txt: "txt",
            sql: "sql",
            html: "html",
            saas: "saas",
            scss: "scss",
            bash: "bash",
            json: "json",
            js: "javascript",
            ts: "typescript",
            "": "unspecified",
            tsx: "Typescript (React)",
            jsx: "Javascript (React)",
          },
          autoLoadLanguageSupport: true,
          codeMirrorExtensions: theme,
        }),
        diffSourcePlugin({viewMode: "rich-text", diffMarkdown: ""}),
        tablePlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents 
              options={[
                {when: (editor) => editor?.editorType === "codeblock",
                  contents: () => <ChangeCodeMirrorLanguage />
                },
                {
                  fallback: () => (
                    <>
                      <UndoRedo />
                      <Separator />

                      <BoldItalicUnderlineToggles />
                      <Separator />

                      <ListsToggle />
                      <Separator />

                      <CreateLink />
                      <InsertImage />
                      <Separator />

                      <InsertTable />
                      <InsertThematicBreak />

                      <InsertCodeBlock />
                    </>
                  )
                }
              ]}
            />
            )
        }),
      ]}
      {...props}
    />
  );
};

export default Editor;