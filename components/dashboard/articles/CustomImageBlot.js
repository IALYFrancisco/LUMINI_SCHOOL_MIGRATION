let ImageBlot;

if( typeof window !== "undefined" ) {

    const { Quill } = require ("react-quill-new");

    const BaseImage = Quill.import("formats/image");

    class CustomImageBlot extends BaseImage {

        static create(value) {

            const src = typeof value === "string" ? value : value?.src

            const node = super.create(src);

            if( typeof value === "object" && value?.alt) {

                node.setAttribute("alt", value.alt)

            }

            return node;

        }

        static value(node) {

            return {

                src: node.getAttribute("src"),
                alt: node.getAttribute("alt")

            }

        }

    }

    CustomImageBlot.blotName = "image";

    Quill.register(CustomImageBlot, true);

    ImageBlot = CustomImageBlot;

}

export default ImageBlot