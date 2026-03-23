/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect } from "react";
import DOMPurify from "isomorphic-dompurify";
import axios from "axios";
import { useForm } from "react-hook-form";

import Dashboard from "@/components/layouts/dashboardLayout";
import ArticleLayout from "@/components/layouts/articleLayout";
import TiptapEditor from "@/components/dashboard/articles/TiptapEditor"; // ✅ AJOUT

export default function CreateArticle() {

  const { register, handleSubmit, reset, watch } = useForm();

  const [imageIsDefined, setImageIsDefined] = useState(false);
  const [urlIsDefined, setUrlIsDefined] = useState(false);
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);

  const watchAll = watch();

  const _handleSubmit = (data) => {

    if (!content || content === "<p></p>") return;

    const cleanHTML = DOMPurify.sanitize(content);
    const article = new FormData();

    article.append("title", data.title);

    if (imageIsDefined) {
      article.append("image", image);
    }

    if (urlIsDefined) {
      article.append("image", data.url);
    }

    article.append("contents", cleanHTML);

    axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/article/create`,
      article,
      {
        withCredentials: true,
        headers: imageIsDefined
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" },
      }
    )
    .then(() => {
      reset();
      setImage(null);
      setContent("");
    })
    .catch((err) => {
      console.error("Erreur création article :", err);
    });
  };

  useEffect(() => {

    if (watchAll.url) setUrlIsDefined(true);
    else setUrlIsDefined(false);

    if (image) setImageIsDefined(true);
    else setImageIsDefined(false);

  }, [image, watchAll.url]);

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

              {/* Titre */}
              <fieldset>
                <div className="element">
                  <label>Titre de l'article :</label>
                  <input
                    type="text"
                    placeholder="Ajouter un titre à l'article"
                    {...register("title", { required: true })}
                    required
                  />
                </div>
              </fieldset>

              {/* Image de couverture */}
              <fieldset>
                <div className="element">
                  <label>Image de mis en avant pour l'article :</label>

                  <div className="inputs-container">
                    <input
                      disabled={imageIsDefined}
                      type="url"
                      placeholder="Utilisez cet champ pour une image en ligne"
                      {...register("url")}
                      required
                    />

                    <input
                      disabled={urlIsDefined}
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                      accept="image/jpeg, image/png"
                      required
                    />
                  </div>
                </div>
              </fieldset>

              {/* Contenu avec TIPTAP */}
              <fieldset>
                <div className="element">
                  <label>Contenus de l'article :</label>

                  <TiptapEditor
                    content={content}
                    setContent={setContent}
                  />

                  <button type="submit">Soumettre</button>
                </div>
              </fieldset>

            </form>

            {/* Prévisualisation */}
            <div className="previsualisation ql-container ql-snow">
              <h3>Prévisualisation :</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(content),
                }}
                className="ql-editor"
              />
            </div>
          </div>
        </>
      </ArticleLayout>
    </Dashboard>
  );
}