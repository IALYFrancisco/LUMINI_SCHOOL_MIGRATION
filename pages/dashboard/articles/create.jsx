/* eslint-disable react/no-unescaped-entities */

import dynamic from "next/dynamic"
import { useState, useRef, useEffect } from "react";
import DOMPurify from "isomorphic-dompurify"
import axios from "axios";
import { useForm } from "react-hook-form";
import '@/components/dashboard/articles/CustomImageBlot'
import Dashboard from "@/components/layouts/dashboardLayout";
import ArticleLayout from "@/components/layouts/articleLayout";

const ReactQuill = dynamic(()=> import('react-quill-new'), { ssr: false })

export default function CreateArticle() {

  const { register, handleSubmit, reset, watch } = useForm()
  var [ imageIsDefined, setImageIsDefined ] = useState(false)
  var [ urlIsDefined, setUrlIsDefined ] = useState(false)
  const [ image, setImage ] = useState("")
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);
  const quillRef = useRef(null);

  var watchAll = watch()

  const modules = {
    history:{
      delay: 1000,
      maxStack: 100,
      userOnly: true
    },
    toolbar: {
      container: [
        [{ header: [ 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        ["link", "image", "document"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
      handlers: {
        image: () => handleImageUpload(),
        document: () => handleDocumentUpload(),
      },
    },
  };

  const formats = [
    "header", "bold", "italic", "underline", "strike",
    "blockquote", "list", "link",
    "image", "color", "background", "code-block", "align",
  ];

  const handleImageUpload = async () => {

    let remoteURLImage = window.prompt("Utilisez ce champ pour une image déjà en ligne :")

    if(remoteURLImage && remoteURLImage.startsWith("https://") || remoteURLImage.startsWith("http://")){
      let altImage = window.prompt("Saisissez le texte  alternatif de cette image :")
      if(altImage){
        let quill = quillRef.current.getEditor()
        let range = quill.getSelection(true)
  
        quill.insertEmbed(range.index, "image", {
          src: remoteURLImage,
          alt: altImage || ""
        })

        return
      }
    }

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/jpeg, image/png");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        setUploading(true);
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/add-illustration`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        });

        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();

        let altImage = window.prompt("Saisissez le texte  alternatif de cette image :")

        if(altImage){
          quill.insertEmbed(range.index, "image", {
            src: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${res.data.url}`,
            alt: altImage
          })
        }

      } catch (err) {
        console.error("Erreur upload image:", err);
      } finally {
        setUploading(false);
      }
    };
  };

const handleDocumentUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.png,.jpg");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        setUploading(true);
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/add-file`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        });

        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertText(range.index, file.name, "link", `${process.env.NEXT_PUBLIC_API_BASE_URL}${res.data.url}`);
      } catch (err) {
        console.error("Erreur upload document:", err);
      } finally {
        setUploading(false);
      }
    };
  };

const _handleSubmit = (data) => {

  if(content == "<p><br></p>") return

  const cleanHTML = DOMPurify.sanitize(content);
  const article = new FormData()
  
  article.append('title', data.title)
  if(imageIsDefined){
    article.append('image', image)
  }
  if(urlIsDefined){
    article.append('image', data.url)
  }
  article.append('contents', cleanHTML)
  
  axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/create`, article, { withCredentials: true, headers: imageIsDefined ? { "Content-Type": "multipart/form-data" } : { "Content-Type": "application/json" } })
  .then(()=>{
    reset()
    setImage(null)
    setContent("")
  })
};

  useEffect(()=>{
  
    if(watchAll.url) setUrlIsDefined(true)
    else setUrlIsDefined(false)

    if(image) setImageIsDefined(true)
    else setImageIsDefined(false)

  }, [image, watchAll.url])

  return (
    <Dashboard>
        <ArticleLayout>
            <>
            <div className="add-article">
                <h3>Création d'un article :</h3>
                {uploading && (
                    <p className="upload-message">
                        🔄 Upload en cours...
                    </p>
                )}
                <form onSubmit={handleSubmit(_handleSubmit)}>
                <fieldset>
                    <div className="element">
                    <label htmlFor="">Titre de l'article :</label>
                    <input type="text" name="" id="" placeholder="Ajouter un titre à l'article" { ...register("title", { required: true }) } required />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="element">
                    <label htmlFor="">Image de mis en avant pour l'article :</label>
                    <div className="inputs-container">
                        <input disabled={imageIsDefined} type="url" id="" placeholder="Utilisez cet champ pour une image en ligne" { ...register("url") } required />
                        <input disabled={urlIsDefined} type="file" id="" onChange={(e)=>setImage(e.target.files[0])} accept="image/jpeg, image/png" required />
                    </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="element">
                        <label htmlFor="">Contenus de l'article :</label>
                        <TiptapEditor content={content} setContent={setContent} />
                    <button>Soumettre</button>
                    </div>
                </fieldset>
                </form>
                <div className="previsualisation ql-container ql-snow">
                    <h3>Prévisualisation :</h3>
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} className="ql-editor" ></div>
                </div>
            </div>
            </>
        </ArticleLayout>    
    </Dashboard>
  );
};