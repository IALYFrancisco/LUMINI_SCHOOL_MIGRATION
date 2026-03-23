"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import axios from "axios";

import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Image as ImageIcon,
  FileText
} from "lucide-react";

export default function TiptapEditor({ content, setContent }) {

  // ✅ Extension image avec ALT (équivalent CustomImageBlot)
  const CustomImage = Image.extend({
    addAttributes() {
      return {
        src: { default: null },
        alt: { default: null },
      };
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      CustomImage,
    ],
    content: content || "",
    immediatelyRender: false, // ✅ FIX SSR
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  // ⚠️ important
  if (!editor) return null;

  // ========================
  // IMAGE UPLOAD
  // ========================
  const handleImageUpload = async () => {

    let remoteURLImage = window.prompt("Utilisez ce champ pour une image déjà en ligne :");

    if (remoteURLImage && (remoteURLImage.startsWith("http://") || remoteURLImage.startsWith("https://"))) {
      let altImage = window.prompt("Saisissez le texte alternatif :");
      editor.chain().focus().setImage({
        src: remoteURLImage,
        alt: altImage || ""
      }).run();
      return;
    }

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png";
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/article/add-illustration`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
          }
        );

        let altImage = window.prompt("Saisissez le texte alternatif :");

        editor.chain().focus().setImage({
          src: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${res.data.url}`,
          alt: altImage || ""
        }).run();

      } catch (err) {
        console.error("Erreur upload image:", err);
      }
    };
  };

  // ========================
  // DOCUMENT UPLOAD
  // ========================
  const handleDocumentUpload = async () => {

    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.png,.jpg";
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/article/add-file`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
          }
        );

        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${res.data.url}`;

        editor.chain().focus().insertContent(
          `<a href="${url}" target="_blank">${file.name}</a>`
        ).run();

      } catch (err) {
        console.error("Erreur upload document:", err);
      }
    };
  };

  // ========================
  // RENDER
  // ========================
  return (
    <div>

      {/* TOOLBAR */}
      <div className="toolbar">

        {/* HEADINGS */}
        <div className="group">
          <button
            className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <Heading2 size={16} />
          </button>

          <button
            className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            <Heading3 size={16} />
          </button>
        </div>

        <div className="divider" />

        {/* TEXT */}
        <div className="group">
          <button
            className={editor.isActive("bold") ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold size={16} />
          </button>

          <button
            className={editor.isActive("italic") ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic size={16} />
          </button>

          <button
            className={editor.isActive("strike") ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough size={16} />
          </button>

          <button
            className={editor.isActive("code") ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleCode().run()}
          >
            <Code size={16} />
          </button>
        </div>

        <div className="divider" />

        {/* LISTS */}
        <div className="group">
          <button
            className={editor.isActive("bulletList") ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List size={16} />
          </button>

          <button
            className={editor.isActive("orderedList") ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered size={16} />
          </button>
        </div>

        <div className="divider" />

        {/* BLOCK */}
        <div className="group">
          <button
            className={editor.isActive("blockquote") ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote size={16} />
          </button>
        </div>

        <div className="divider" />

        {/* MEDIA */}
        <div className="group">
          <button onClick={handleImageUpload}>
            <ImageIcon size={16} />
          </button>

          <button onClick={handleDocumentUpload}>
            <FileText size={16} />
          </button>
        </div>

        <div className="divider" />

        {/* HISTORY */}
        <div className="group">
          <button onClick={() => editor.chain().focus().undo().run()}>
            <Undo size={16} />
          </button>

          <button onClick={() => editor.chain().focus().redo().run()}>
            <Redo size={16} />
          </button>
        </div>

      </div>

      {/* EDITOR */}
      <EditorContent editor={editor} className="ProseMirror" />

    </div>
  );
}