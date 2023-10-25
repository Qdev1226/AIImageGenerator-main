import {
    AI_MAKE_IMG_START,
    AI_MAKE_IMG_SUCCESS,
    AI_MAKE_IMG_FAILED,
    AI_MAKE_IMG_ERROR,
    AI_SET_SETTING
} from "../actions/config";

const initialState = {
    loading: false,
    settings: {
        key: "iIjvdXCYHvVOuemfFgGH9JXSsVwl3grN7ZPtGGGAxY1g32kayxq1SVB3s08A",            // Your API Key
        columns: 1,                     // Avatar Display nums.
        input_1: "",                     // Your Prompt 1
        input_2: "",                     // Your Prompt 2
        input_3: "",                     // Your Prompt 3
        old_prompt: "",                  // For the user of 2 way conversation
        old_assistant: "",               // For the assistant of 2 way conversation
        category_name: "",               // category name
        category_index: -1,              // category array's index
        model_index: -1,                 // model name
        filter: {
            _id: 123123,
            name: "None",
            avatar: "https://storage.googleapis.com/pai-marketing/filters/ominous_escape.png",
            prompt: ""
        },                              // Style (None, Colorpop, Black&white ...), Fields(_id, avatar, name, prompt))
        init_image: "",                 // link of Initial Image
        mask_image: "",                 // link of mask image for inpainting
        width: 512,                     // Width of output image. Maximum size is 1024x768 or 768x1024 because of memory limits
        height: 512,                    // Height of output image. Maximum size is 1024x768 or 768x1024 because of memory limits
        strength: 0.7,                  // Prompt strength when using init image. 1.0 corresponds to full destruction of information in init image
        num_inference_steps: 30,        // Number of denoising steps (minimum: 1; maximum: 50)
        guidance_scale: 7.5,            // Scale for classifier-free guidance (minimum: 1; maximum: 20)
        safety_checker: "yes",          // Enhance prompts for better results, default : yes, option : yes/no
        seed: null,                     // Random seed. Leave blank to randomize the seed
        webhook: null,                  // webhook to call when image generation is completed
        track_id: null                  // tracking id to track this api call
    },
    models: [
        // {
        //     name: 'Stable Diffusion v1.5',
        //     value: 'stable-diffu'
        // }, {
        //     name: 'Stable Diffusion v2',
        //     value: 'stable-diffu'
        // }, {
        //     name: 'Stable Diffusion v3',
        //     value: 'stable-diffu'
        // },
        {
            name: 'MidJourney v4',
            value: 'midjourney'
        }, {
            name: 'Protogen x3.4',
            value: 'protogen-3.4'
        }, {
            name: 'Realistic Vision v1.3',
            value: 'realistic-vision-v13'
        }, {
            name: 'Project Unreal Engine 5',
            value: 'project-unreal-engin'
        }, {
            name: 'T-shirt print designs',
            value: 't-shirt-prin'
        }, {
            name: 'Anything v4',
            value: 'anything-v4'
        }, {
            name: 'Dream Shaper',
            value: 'dream-shaper-8797'
        }, {
            name: 'Vintedois',
            value: 'vintedois-diffusion'
        }, {
            name: 'F222',
            value: 'f222-diffusion'
        }, {
            name: 'animefull2',
            value: 'animefull2'
        }],
    styles: [{
        _id: 123123,
        name: "None",
        avatar: "https://storage.googleapis.com/pai-marketing/filters/ominous_escape.png",
        prompt: ""
    }, {
        _id: 4314123,
        name: "Colorpop",
        avatar: "https://storage.googleapis.com/pai-marketing/filters/elizaport_style.png",
        prompt: "Colorpop"
    }, {
        _id: 5192931,
        name: "Instaport",
        avatar: "https://storage.googleapis.com/pai-marketing/filters/instaport_style.png",
        prompt: "123"
    }, {
        _id: 612341234,
        name: "Playtoon",
        avatar: "https://storage.googleapis.com/pai-marketing/filters/pltn-style.png",
        prompt: ""
    }, {
        _id: 5192432,
        name: "Woolitize",
        avatar: "https://storage.googleapis.com/pai-marketing/filters/woolitize.jpeg",
        prompt: ""
    }, {
        _id: 72563546,
        name: "App Icons",
        avatar: "https://storage.googleapis.com/pai-marketing/filters/appicon-style.jpg",
        prompt: ""
    }, {
        _id: 52123412,
        name: "Retro Futurism",
        avatar: "https://storage.googleapis.com/pai-marketing/filters/retrofuturism.png",
        prompt: ""
    }, {
        _id: 654465,
        name: "Origamip",
        avatar: "https://storage.googleapis.com/pai-marketing/filters/origami.png",
        prompt: ""
    }, {
        _id: 2734563456,
        name: "Black and white",
        avatar: "https://storage.googleapis.com/pai-marketing/filters/haze.png",
        prompt: ""
    }],                         // Styles (_id, avatar, name, prompt)
    result: null,                      // AI Image Generator Result (Image Objects) 
    error: "",                          // Error Message
};

export default function aiReducer(state = initialState, action) {
    switch (action.type) {
        case AI_SET_SETTING:
            const settingStr = JSON.stringify(state.settings);
            const settingObj = JSON.parse(settingStr);
            settingObj[action.payload.key] = action.payload.value;
            return {
                ...state,
                settings: settingObj
            }
        case AI_MAKE_IMG_START:
            console.log("AI_MAKE_IMG_START");
            return {
                ...state,
                loading: true,
                result: null
            }
        case AI_MAKE_IMG_SUCCESS:
            console.log("AI_MAKE_IMG_SUCCESS");
            return {
                ...state,
                loading: false,
                result: action?.data?.res
            }
        case AI_MAKE_IMG_FAILED:
            console.log("AI_MAKE_IMG_FAILED");
            return {
                ...state,
                loading: false,
                result: action?.data?.res,
                error: action?.data?.errMsg
            }
        case AI_MAKE_IMG_ERROR:
            console.log("AI_MAKE_IMG_ERROR");
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}