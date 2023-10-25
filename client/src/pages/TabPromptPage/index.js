import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Stack, AlertTitle } from "@mui/material";

import { setGeneratedText, setTextSessionHistory } from "../../actions/textAction";
import {
  AI_MAKE_IMG_START,
  AI_MAKE_IMG_SUCCESS,
  AI_MAKE_IMG_FAILED,
  AI_MAKE_IMG_INIT,
  AI_MAKE_TXT_START,
  AI_MAKE_TXT_SUCCESS,
  AI_MAKE_TXT_COMPLETED,
  AI_MAKE_TXT_FAILD
} from "../../actions/config";
import OptTextarea from "../../components/OptTextarea";
import OptSlider from "../../components/OptSlider";
import OptImgDimenItem from "../../components/OptImgDimenItem";
import ColorButton from "../../components/ColorButton";
import OptSelect from "../../components/OptSelect";
import TextSessionItem from "../../components/TextSessionItem";
import ResultImgItem from "../../components/ResultImgItem";
import ResultTextItem from "../../components/ResultTextItem";
import PendingImgItem from "../../components/PendingImgItem";
import { primaryBtnColor } from "../../stylesheets/colors";
import "./tabprompt.scss";

import AiService from "../../services/aiService";
import apiService from "../../services/apiService.js";
import fs from "fs";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const TabPromptPage = (props) => {
  // Props
  const { setting, setSetting, setLoading, aiState, setAiState } = props;

  // Use Redux
  const dispatch = useDispatch();
  const userObj = useSelector((state) => state.auth);
  const aiObj = useSelector((state) => state.aiObj);
  const imgObj = useSelector((state) => state.img);
  const modelObj = useSelector((state) => state.modelObj);
  const textObj = useSelector((state) => state.textObj);

  // States
  const [recentImages, setRecentImages] = useState(""); // Generated Image Base64
  // const [recentTexts, setRecentTexts] = useState([]); // Generate Text Objects
  const [isRecentImgState, setisRecentImgState] = useState(false);
  const [streamText, setStreamText] = useState(""); // Generated text
  const [conversationTexts, setConversationTexts] = useState([]); // History Text Object

  // Get session history
  useEffect(() => {
    let model_id = "";
    if( setting.model_index < 0 )
      model_id = modelObj?.models?.[0]?._id;
    else
      model_id = modelObj?.models?.[setting.model_index]?._id;

    apiService.getTextHistory({
      user_id: userObj.user?._id,
      model_id: model_id
    }).then(async (res) => {
      console.log(res.result);
      dispatch(setTextSessionHistory(res.result)).then((res)=>{}).catch((res)=>{});
    }).catch((err) => {
      console.log(err);
    });
  }, [setting.model_index]);

  // display generated images
  useEffect(() => {
    setRecentImages(imgObj.recentImages);
  }, [imgObj.recentImages]);

  // display streaming texts
  // useEffect(() => {
  //   setRecentTexts(textObj.chioces);
  // }, [textObj.chioces]);

  // get one text conversation when user click the existing conversation
  useEffect(() => {
    if( setting.session_index >= 0 ) {
      const textSessionObj = textObj.text_sessions?.[setting.session_index];
      const contentArr = textSessionObj?.content;
      setConversationTexts(contentArr);
    } else {
      setConversationTexts([]);
    }
  }, [setting.session_index]);

  /**
   * @description
   *  Generate image using DREAMBOOTH API
   */
  const handleGenerate = async () => {
    const aiService = new AiService();
    try {
      let selectedModel = modelObj.models[setting.model_index];
      // If user select the text generation model
      // if selected engine type is 0, this is text generation model
      if (  selectedModel && selectedModel.engine &&
            selectedModel.engine.length > 0 && selectedModel.engine[0].type === 0 ) {
          let user_id = userObj.user?._id;
          let model_id = selectedModel._id;
          let subject_id = Date.now();
          if( !setting.is_new_chat ) {
            subject_id = textObj.text_sessions?.[setting.session_index]?.subject_id;
          }
          let subject_title = "";
          // Generate prompt from input
          let newPrompt = "";
          newPrompt += setting.input_1 !== "" ? setting.input_1 : "";
          if( newPrompt.length !== 0 && setting.input_2.length !== 0 ) {
            newPrompt += ". ";
          }
          newPrompt += setting.input_2 !== "" ? setting.input_2 : "";
          if( newPrompt.length !== 0 && setting.input_3.length !== 0 ) {
            newPrompt += ". ";
          }
          newPrompt += setting.input_3 !== "" ? setting.input_3 : "";
          subject_title = newPrompt;
          newPrompt = "Input: " + newPrompt;

          
          let message = [
            { "role": "system", "content": selectedModel.prompt_start?selectedModel.prompt_start:"" },
            { "role": "user", "content": "" },
            { "role": "assistant", "content": selectedModel.assistant_content?selectedModel.assistant_content:"" }
          ];

          if( conversationTexts.length !== 0 ) {
            message = conversationTexts;
          }
          message.push({"role":"user", "content": newPrompt});

          // Text generate
          setAiState(AI_MAKE_TXT_START);
          setLoading(true);
          const settings = {
            // model: selectedModel.engine[0].name,
            model: "gpt-4-0314",
            messages: message,
            stream: true
          }

          aiService
            .makeText(settings)
            .then(async (res) => {
              const lines = res?.toString()?.split("\n").filter((line) => line.trim() !== "");
              setAiState(AI_MAKE_TXT_SUCCESS);
              let resultStr = "";
              for(const line of lines) {
                const msg = line.replace(/^data: /, "");
                if( msg === "[DONE]" ) {

                } else {
                  let token;
                  try {
                    token = JSON.parse(msg)?.choices?.[0]?.delta?.content;
                    if( token !== undefined ) {
                      resultStr += token;
                      await sleep(100);
                      await setStreamText(resultStr);
                    }
                  } catch {
                    console.log("Error");
                    setAiState(AI_MAKE_TXT_FAILD);
                    return ;
                  }
                }
              }
              message.push({"role" : "assistant", "content" : resultStr});
              setConversationTexts(message);
              setAiState(AI_MAKE_TXT_COMPLETED);
              
              // Send the histiry to the server for updateing or creating
              let obj = {
                is_new : setting.is_new_chat,
                user_id : user_id,
                model_id : model_id,
                subject_id : subject_id,
                subject_title : subject_title,
                content : message
              }
              apiService
              .setTextHistory(obj)
              .then((data) => {
                    console.log(data);
                })
              .catch((err) => {
                err = err?.response?.data;
              });

              setSetting([
                {key: "old_prompt", value: newPrompt},
                {key: "old_assistant", value: resultStr} ]);
            })
            .catch((err) => {
              console.log(err);
            });
      } else if (  selectedModel && selectedModel.engine &&
        selectedModel.engine.length > 0 && selectedModel.engine[0].type === 1 ) {
        // Image generate
        let newPrompt = setting.input_1;
        let params = null;
        // Todo: have to update this part
        // if( selectedModel.version && selectedModel.version.length > 0 ) {
        //   params = {
        //     version: selectedModel.version,
        //     input: {
        //       prompt: newPrompt
        //     }
        //   }
        // } else {
          params = {
            prompt: newPrompt,
            model: selectedModel?.name
          }
        // }
        setAiState(AI_MAKE_IMG_START);
        aiService.makeImg("txt2img", params).then(async (res) => {
            setAiState(AI_MAKE_IMG_SUCCESS);
            if( res ) {
              console.log("=================================");
              console.log(res);
              const blob = new Blob([res], {type: 'image/png'});
              const objectUrl = URL.createObjectURL(blob);
              setRecentImages(objectUrl);
              // setRecentImages(btoa(unescape(encodeURIComponent(res))));
            }
            // if (res.status === "starting") {
                // var callBackRes = {
                //     "status" : "",
                //     "output" : ""
                // };
                // while( callBackRes.status !== "succeeded" ) {
                    // await sleep(90000);
                    // callBackRes = await aiService.makeImg("getimg", res).then(async (getImgRes) => getImgRes);
                    
                    // if (callBackRes.status === "succeeded") {
                    //   if( callBackRes.output && callBackRes.output.length > 0 ) {
                    //     if( Array.isArray(callBackRes.output[0]) ) {
                    //       setRecentImages(callBackRes.output[0]);
                    //     } else {
                    //       setRecentImages(callBackRes.output);
                    //     }
                    //   }
                    //     setAiState(AI_MAKE_IMG_SUCCESS);
                    //     return;
                    // } else { // if (callBackRes.status === "failed" || callBackRes.status === "canceled") {
                    //     setAiState(AI_MAKE_IMG_FAILED); 
                    //     callBackRes = await aiService.makeImg("cancel", res).then(async (getImgRes) => getImgRes);
                    //     return;
                    // }
                // }
            // } else {
            //     setAiState(AI_MAKE_IMG_FAILED);
            // }
        })
        .catch((err) => {
          console.log(err);
        });
      }

    } catch (err) {
      console.log("handleGeneratedImg - Err", err);
      setLoading(false);
      setAiState(AI_MAKE_IMG_FAILED);
    }
  };

  /**
   * 
   */

  /**
   * @description
   *  Change image state
   */
  const handleChgImage = (image) => {
    var tmpRecentImgs = recentImages;
    var len = tmpRecentImgs.length;

    for (var i = 0; i < len; i++) {
      if (tmpRecentImgs[i]._id === image._id) tmpRecentImgs[i] = image;
    }
    setRecentImages(tmpRecentImgs);
    setisRecentImgState(!isRecentImgState);
  };

  const clickSessionItem = (index) => {
    if( index >= 0 ) {
      setSetting([
        {key: "is_new_chat", value: false},
        {key: "session_index", value: index}
      ]);
    } else {
      setSetting([
        {key: "is_new_chat", value: true},
        {key: "session_index", value: -1}
      ]);
    }
  }

  return (
    <>
      <div id="prompt-studio-container">
        <aside className="left-sidebar">
          <div className="px-6 space-y-6">
            <OptSelect
              htmlfor={`category-type`}
              labelstr={`Category`}
              options={modelObj.categories}
              value={setting.category_index}
              onChange={(index) =>
                setSetting({ key: "category_index", value: index })
              }
            />
            <OptSelect
              htmlfor={`model-type`}
              labelstr={`Model`}
              options={modelObj.models}
              value={setting.model_index}
              onChange={(index) =>
                setSetting({ key: "model_index", value: index })
              }
            />
            {
              modelObj.models[setting.model_index] &&
              modelObj.models[setting.model_index].input_name_1 &&
              modelObj.models[setting.model_index].input_name_1.length > 0 && (
                <OptTextarea
                  labelfor={`prompt-textarea`}
                  label={modelObj.models[setting.model_index].input_name_1}
                  placeholder={
                    modelObj.models[setting.model_index].placehold_name_1 &&
                    modelObj.models[setting.model_index].placehold_name_1.length > 0 && (
                      modelObj.models[setting.model_index].placehold_name_1
                    )
                  }
                  minHeight={50}
                  value={setting.input_1}
                  onChange={(value) => setSetting({ key: "input_1", value: value })}
                />
              )
            }

            {
              modelObj.models[setting.model_index] &&
              modelObj.models[setting.model_index].input_name_2 &&
              modelObj.models[setting.model_index].input_name_2.length > 0 && (
                <OptTextarea
                  labelfor={`prompt-textarea`}
                  label={modelObj.models[setting.model_index].input_name_2}
                  placeholder={
                    modelObj.models[setting.model_index].placehold_name_2 &&
                    modelObj.models[setting.model_index].placehold_name_2.length > 0 && (
                      modelObj.models[setting.model_index].placehold_name_2
                    )
                  }
                  minHeight={50}
                  value={setting.input_2}
                  onChange={(value) => setSetting({ key: "input_2", value: value })}
                />
              )
            }

            {
              modelObj.models[setting.model_index] &&
              modelObj.models[setting.model_index].input_name_3 &&
              modelObj.models[setting.model_index].input_name_3.length > 0 && (
                <OptTextarea
                  labelfor={`prompt-textarea`}
                  label={modelObj.models[setting.model_index].input_name_3}
                  placeholder={
                    modelObj.models[setting.model_index].placehold_name_3 &&
                    modelObj.models[setting.model_index].placehold_name_3.length > 0 && (
                      modelObj.models[setting.model_index].placehold_name_3
                    )
                  }
                  minHeight={50}
                  value={setting.input_3}
                  onChange={(value) => setSetting({ key: "input_3", value: value })}
                />
              )
            }
            { modelObj.models[setting.model_index] &&
              modelObj.models[setting.model_index].engine &&
              modelObj.models[setting.model_index].engine.length > 0 &&
              modelObj.models[setting.model_index].engine[0].type === 1 && (
                <div>
                  <OptSlider
                    min={1}
                    max={6}
                    label={`Columns`}
                    color={primaryBtnColor}
                    // disabled={(auth?.user?.role_idx === 1 || auth?.user?.role_idx === 2) ? false : true}
                    value={setting.columns}
                    onChange={(value) =>
                      setSetting({ key: "columns", value: value })
                    }
                  />
                  <OptSlider
                    min={1}
                    max={1024}
                    label={`Image Dimensions`}
                    description={`Width × Height of the finished image.`}
                    color={primaryBtnColor}
                    // disabled={(auth?.user?.role_idx === 1 || auth?.user?.role_idx === 2) ? false : true}
                    value={setting.width}
                    onChange={(val) => {
                      setSetting({
                        key: "width",
                        value: Math.round(val / 8) * 8,
                      });
                    }}
                  />
                  <OptSlider
                    min={1}
                    max={1024}
                    color={primaryBtnColor}
                    // disabled={(auth?.user?.role_idx === 1 || auth?.user?.role_idx === 2) ? false : true}
                    value={setting.height}
                    onChange={(val) => {
                      setSetting({
                        key: "height",
                        value: Math.round(val / 8) * 8,
                      });
                    }}
                  />
                  <fieldset style={{ display: "flex" }}>
                    <div style={{ flexGrow: 1 }}>
                      <OptImgDimenItem
                        width={512}
                        height={512}
                        active={
                          setting.width === 512 && setting.height === 512
                            ? true
                            : false
                        }
                        handleClick={() => {
                          setSetting([
                            { key: "width", value: 512 },
                            { key: "height", value: 512 },
                          ]);
                        }}
                      />
                    </div>
                    <div
                      style={{
                        flexGrow: 1,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <label style={{ fontSize: `13px` }}>
                        Good for avatars
                      </label>
                    </div>
                  </fieldset>

                  <OptSlider
                    min={1}
                    max={200}
                    label={`Prompt Guidance`}
                    description={`Higher guidance will make your image closer to your prompt.`}
                    color={primaryBtnColor}
                    // disabled={(auth?.user?.role_idx === 1 || auth?.user?.role_idx === 2) ? false : true}
                    value={Math.round(setting.guidance_scale * 10)}
                    onChange={(val) =>
                      setSetting({ key: "guidance_scale", value: val / 10 })
                    }
                  />

                  <OptSlider
                    min={1}
                    max={50}
                    label={`Quality & Details`}
                    description={`More steps will result in a high quality image but will take longer.`}
                    color={primaryBtnColor}
                    // disabled={(auth?.user?.role_idx === 1 || auth?.user?.role_idx === 2) ? false : true}
                    value={setting.num_inference_steps}
                    onChange={(val) =>
                      setSetting({ key: "num_inference_steps", value: val })
                    }
                  />
                </div>
              )
            }
          </div>
          <div className="field-button">
          {
            (aiState !== AI_MAKE_IMG_START && aiState !== AI_MAKE_TXT_START) && (
              <ColorButton
                variant="contained"
                name={`Genereate`}
                handle={() => handleGenerate()}
              />
            )
          }
          </div>
        </aside>
        <main className="main-content">
          <div className="draggable-bounds">
            <div className="scroll-container">
              <div>
                <TextSessionItem
                  options={textObj.text_sessions}
                  onclick={(index) => clickSessionItem(index)}
                />
              </div>
              <hr/>
              <div className="sesstion-list">
                {
                  conversationTexts?.map((item, key) => (
                    (key > 2)&&<span key={key}><strong>{item?.role + ":"}</strong> {item?.content}<br/><hr/></span>
                  ))
                }
              </div>
              <div className="scroll-container-outbox">
                <div className="scroll-container-inbox">
                  {aiState === AI_MAKE_IMG_INIT && (
                    <Stack
                      sx={{
                        width: "70%",
                        textAlign: "left",
                        marginLeft: "15%",
                        marginTop: "5%",
                      }}
                    >
                      <Alert severity="info">
                        <AlertTitle>TEXT TO IMAGE</AlertTitle>
                        Press <strong>Generate</strong> button!
                      </Alert>
                    </Stack>
                  )}
                  {(aiState === AI_MAKE_IMG_FAILED || aiState === AI_MAKE_TXT_FAILD) && (
                    <Stack
                      sx={{
                        width: "70%",
                        textAlign: "left",
                        marginLeft: "15%",
                        marginTop: "5%",
                      }}
                    >
                      <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Generating image is field. —{" "}
                        <strong>Try it again!</strong>
                      </Alert>
                    </Stack>
                  )}
                  <div
                    className="grid-box"
                    style={{
                      gridTemplateColumns: `repeat(${setting.columns}, minmax(0px, 1fr))`,
                    }}
                  >
                    {aiState === AI_MAKE_IMG_START && <PendingImgItem />}
                    {aiState === AI_MAKE_IMG_SUCCESS &&
                      (
                        <img 
                          src={recentImages}
                          alt="GeneratedImage"
                        />
                      )
                    }
                    {aiState === AI_MAKE_TXT_START && <PendingImgItem />}
                    {aiState === AI_MAKE_TXT_SUCCESS && 
                      (
                        <ResultTextItem 
                          content={streamText}
                        />
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default TabPromptPage;
