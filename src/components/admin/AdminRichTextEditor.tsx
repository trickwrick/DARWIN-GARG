"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "jodit/es2021/jodit.min.css";
import styles from "@/app/admin/admin.module.css";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => <div className={styles.rteLoading}>Loading editor...</div>,
});

const FULL_TOOLBAR_BUTTONS = [
  "source",
  "|",
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "eraser",
  "|",
  "superscript",
  "subscript",
  "|",
  "ul",
  "ol",
  "indent",
  "outdent",
  "|",
  "font",
  "fontsize",
  "brush",
  "paragraph",
  "|",
  "image",
  "table",
  "link",
  "symbols",
  "|",
  "hr",
  "copyformat",
  "|",
  "left",
  "center",
  "right",
  "justify",
  "|",
  "undo",
  "redo",
  "|",
  "find",
  "preview",
  "print",
  "|",
  "fullsize",
];

type AdminRichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
};

export default function AdminRichTextEditor({
  value,
  onChange,
  placeholder = "Write content here...",
  minHeight = 280,
}: AdminRichTextEditorProps) {
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder,
      height: minHeight,
      toolbar: true,
      toolbarSticky: false,
      statusbar: true,
      showCharsCounter: true,
      showWordsCounter: true,
      showXPathInStatusbar: false,
      buttons: FULL_TOOLBAR_BUTTONS,
      buttonsMD: FULL_TOOLBAR_BUTTONS,
      buttonsSM: FULL_TOOLBAR_BUTTONS,
      buttonsXS: FULL_TOOLBAR_BUTTONS,
      uploader: {
        url: "/api/admin/upload",
        format: "json",
        method: "POST",
        filesVariableName: () => "image",
        withCredentials: true,
      },
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: "insert_as_html" as const,
    }),
    [minHeight, placeholder]
  );

  return (
    <div className={styles.joditWrap}>
      <JoditEditor
        value={value}
        config={config}
        onBlur={(newValue) => onChange(newValue)}
        onChange={(newValue) => onChange(newValue)}
      />
    </div>
  );
}
