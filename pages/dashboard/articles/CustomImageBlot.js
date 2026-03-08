import { Quill } from 'react-quill-new'

const BaseImage = Quill.import('formats/image')

class ImageBlot extends BaseImage {
    static create(value){
        const src = typeof value === 'string' ? value : value?.src
        
        const node = super.create(src)

        if (typeof value === 'object' && value?.alt){
            node.setAttribute('alt', value.alt)
        }

        return node
    }

    static value(node){
        return {
            src: node.getAttribute('src'),
            alt: node.getAttribute('alt')
        }
    }
}

ImageBlot.blotName = 'image'

Quill.register(ImageBlot, true)

export default ImageBlot