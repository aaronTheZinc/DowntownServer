import {uploadMany} from '../imagekit/index'
import axios from 'axios'

const url = "https://api.cloudinary.com/v1_1/dtus-us/upload"

const postImage = (stringedData: string) => {
    const config = {
        upload_preset: 'downtown',
        file: stringedData,
        folder: 'downtown'
    }
    axios.post(url, config)
}

export const pushNewImages = (images: string) => uploadMany([])