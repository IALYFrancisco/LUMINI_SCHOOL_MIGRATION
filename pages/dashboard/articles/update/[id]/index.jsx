/* eslint-disable react/no-unescaped-entities */
import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill-new";
import DOMPurify from "dompurify";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import '../../CustomImageBlot'

export default function UpdateArticle() {

  const { register, handleSubmit, reset, watch, formState: { isDirty } } = useForm()
  var [ article, setArticle ] = useState(null)
  var [ imageIsDefined, setImageIsDefined ] = useState(false)
  var [ urlIsDefined, setUrlIsDefined ] = useState(false)
  const [ image, setImage ] = useState("")
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);
  const quillRef = useRef(null);
  const router = useRouter()

  const { id } = router.query

  var watchAll = watch()

  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/get?_id=${id}`, { withCredentials: true })
    .then((response)=>{
        setArticle(response.data)
        reset({
            title: response.data.title,
            url : (response.data.image.startsWith("https") || response.data.image.startsWith("http")) ? response.data.image : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${response.data.image}`,
        })
        setContent(response.data.contents)
    })
  }, [id, reset])

  const isModified = isDirty || image || (article !== null && content !== article.contents)

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

    if(!isModified) return;
    else {

        try{

            const cleanHTML = DOMPurify.sanitize(content);
            const _article = new FormData()
    
            if(article.title !== watchAll.title && data.title !== ""){
                _article.append("title", data.title)
            }
            if(article.contents !== content && content !== ""){
                _article.append('contents', cleanHTML)
            }
            if(image){
                _article.append('image', image)
            }
            if(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${article.image}` !== data.url && data.url !== ""){
                _article.append('image', data.url)
            }

            axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/update?_id=${id}`, _article,
                { 
                    headers: image ? {"Content-Type": "multipart/form-data"} : {"Content-Type": "application/json"},
                    withCredentials: true
                }
            ).then(()=>{
                axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/get?_id=${id}`)
                    .then((response)=>{
                        setArticle(response.data)
                        reset()
                        reset({
                            title: response.data.title,
                            url : (response.data.image.startsWith("https") || response.data.image.startsWith("http")) ? response.data.image : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${response.data.image}`,
                        })
                        setContent(response.data.contents)
                    })
                    setImage(null)
                })
            .catch((err)=> console.log(err))

        }catch(err){
            console.log(err)
        }
    }

};

  useEffect(()=>{
  
    if(watchAll.url) setUrlIsDefined(true)
    else setUrlIsDefined(false)

    if(image) setImageIsDefined(true)
    else setImageIsDefined(false)

  }, [image, watchAll.url])

  return (
    <>
      <div className="add-article">
        <h3>Modification d'un article :
           <Link href={`/dashboard/articles/update/${id}/seo`}>
            <button>Modifier le SEO</button>
           </Link>
        </h3>
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
                <input disabled={imageIsDefined} type="url" name="" id="" placeholder="Utilisez cet champ pour une image en ligne" { ...register("url") } required/>
                <input disabled={urlIsDefined} type="file" name="" id="" onChange={(e)=>setImage(e.target.files[0])} accept="image/jpeg, image/png" required/>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div className="element">
                <label htmlFor="">Contenus de l'article :</label>
                <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    placeholder="Écrivez votre article ici..."
                />
              <button disabled={!isModified}>Soumettre</button>
            </div>
          </fieldset>
        </form>

          <div className="previsualisation ql-container ql-snow">
              <h3>Prévisualisation :</h3>
              <div className="ql-editor" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
          </div>
      </div>
    </>
  );
};