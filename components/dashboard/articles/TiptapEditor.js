"use client"; // indispensable pour Next.js 13+ App Router

import { useEditor, EditorContent, Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useEffect } from 'react';
import axios from 'axios';

export default function TiptapEditor({ content, setContent }) {

  // Extension personnalisée pour gérer alt + src comme ton CustomImageBlot
  const CustomImage = Image.extend({
    addAttributes() {
      return {
        src: { default: null },
        alt: { default: null },
      }
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      CustomImage,
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const handleImageUpload = async () => {
    let remoteURLImage = window.prompt("Utilisez ce champ pour une image déjà en ligne :");

    if(remoteURLImage && (remoteURLImage.startsWith("https://") || remoteURLImage.startsWith("http://"))) {
      let altImage = window.prompt("Saisissez le texte alternatif de cette image :");
      if(altImage) {
        editor.chain().focus().setImage({ src: remoteURLImage, alt: altImage }).run();
      }
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
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/add-illustration`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        });

        let altImage = window.prompt("Saisissez le texte alternatif de cette image :");
        if(altImage) {
          editor.chain().focus().setImage({ src: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${res.data.url}`, alt: altImage }).run();
        }
      } catch (err) {
        console.error("Erreur upload image:", err);
      }
    };
  };

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
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/add-file`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        });

        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${res.data.url}`;
        editor.chain().focus().insertContent(`<a href="${url}" target="_blank">${file.name}</a>`).run();

      } catch (err) {
        console.error("Erreur upload document:", err);
      }
    };
  };

  // On peut exposer les handlers pour le parent
  useEffect(() => {
    if (!editor) return;
    editor.options.editorProps = {
      handleDOMEvents: {
        // On pourrait ajouter des événements si besoin
      },
    };
  }, [editor]);

  return (
    <div>
      <div style={{ marginBottom: '0.5rem' }}>
        <button type="button" onClick={handleImageUpload}>Ajouter Image</button>
        <button type="button" onClick={handleDocumentUpload}>Ajouter Document</button>
      </div>
      <EditorContent editor={editor} className="ProseMirror" />
    </div>
  );
}