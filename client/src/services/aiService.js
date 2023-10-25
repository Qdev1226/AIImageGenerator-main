import axios from "axios";

export default class AiService {
    constructor() {
        this.imgservice = axios.create({
            baseURL: process.env.REACT_APP_CORS_HEADER + `https://dezgo.p.rapidapi.com/text2image`
        });
        this.imgservice.defaults.headers.common['X-RapidAPI-Key'] = "5e8b0a78b2mshc9975c9586fb24dp1b8781jsn9a6041004244";
        this.imgservice.defaults.headers.common['X-RapidAPI-Host'] = "dezgo.p.rapidapi.com";

        // initialize as text generation api informations
        this.textService = axios.create({
            baseURL: process.env.REACT_APP_CORS_HEADER + process.env.REACT_APP_TEXT_GENERATION_URL
        });
        this.textService.defaults.headers.common['Authorization'] = process.env.REACT_APP_TEXT_GENERATION_API_KEY;
        this.textService.defaults.headers.common['Content-Type'] = "application/json";
        
        this.supResSvc = axios.create({
            baseURL: process.env.REACT_APP_CORS_HEADER + `https://stablediffusionapi.com/api/v3/super_resolution`
        });
    }

    // Token 62651ffe0d2ed7ec747031e47f6f9cf062deaec8 -> replicate api key

    /**
     * @description
     *  Generate image by ai (both txt2txt and img2txt)
     * @params
     *  type(String): txt2img or img2img flag
     *  settings(Arr):  api parameters
     */
    makeImg = (type, settings) => {
        return new Promise(async (resolve, reject) => {
            if (type === "txt2img") {
                console.log(settings);
                await this.imgservice.post('', settings, {responseType: "arraybuffer"}).then(async res => {
                    console.log("TXT2IMG_CREATED");
                    await resolve(res.data)
                }).catch(async err => {
                    console.log("TXT2IMG_FAILED");
                    await reject(err)
                });
            } else if (type === "getimg") {
                console.log(settings.id);
                await this.imgservice.get('/' + settings.id).then( async res => {
                    await resolve(res.data)
                }).catch(err => {
                    console.log("TXT2IMG_FAILED");
                    reject(err)
                });
            } else if (type === "cancel") {
                await this.imgservice.post('/' + settings.id + '/cancel').then( async res => {
                    console.log("TXT2IMG_CANCELED");
                    reject(res);
                }).catch(err => {
                    console.log("TXT2IMG_FAILED");
                    reject(err)
                });
            }
        })
    }

    /**
     * @description
     * Text completion generation
     */
    makeText = (settings) => {
        return new Promise(async (resolve, reject) => {
            await this.textService.post('', settings).then(async res => {
                console.log("TXT2TXT_CREATED");
                await resolve(res.data)
            }).catch(async err => {
                console.log("TXT2TXT_FAILED");
                await reject(err)
            });
        });
    }

    /**
     * @description
     *  Make super resolution image. 
     * @params
     *  key : Your API Key
     *  url : Image Url you want you want to super resolution for
     *  scale : Scale number
     *  webhook : webhook to call when image generation is completed
     *  face_enhance : boolean (true/false) for face enhancement feature
     */
    superResolution = (params) => {
        return new Promise((resolve, reject) => {
            this.supResSvc.post('', params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
}
