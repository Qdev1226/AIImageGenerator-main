import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { Tabs, Tab, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import { AI_MAKE_IMG_INIT } from "../../actions/config";
import TabPromptPage from "../TabPromptPage";

import { setAllCates, setModels } from "../../actions/modelAction";
import apiService from "../../services/apiService.js";
import "./studiopage.scss";

const StyledTabs = styled((props) => (
  <Tabs
    onChange={() => console.log("tab change")}
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: "3px",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    backgroundColor: "#8e72ff",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-selected": {
      color: "#fff",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const StudioPage = () => {
  // Use Redux
  const dispatch = useDispatch();

  const modelObj = useSelector((state) => state.modelObj);

  // States
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [aiState, setAiState] = useState(AI_MAKE_IMG_INIT);
  const [setting, setSetting] = useState({
    key: process.env.REACT_APP_STABLE_DIFFUSION_API_KEY, // Your API Key
    columns: 1, // Avatar Display nums.
    input_1: "", // Your first input
    input_2: "", // Your second input
    input_3: "", // Your third input
    old_prompt: "", // Fot the user of 2 way conversation
    old_assistant: "", // Fot the assistant of 2 way conversation
    category_name: "", // only require at first
    category_index: -1, // selected category index
    model_index: -1, // selected model index
    session_index: -1, // selected chat history index
    is_new_chat: true, // is new chat
    init_image: "", // link of Initial Image
    mask_image: "", // link of mask image for inpainting
    width: 512, // Width of output image. Maximum size is 1024x768 or 768x1024 because of memory limits
    height: 512, // Height of output image. Maximum size is 1024x768 or 768x1024 because of memory limits
    strength: 0.7, // Prompt strength when using init image. 1.0 corresponds to full destruction of information in init image
    num_inference_steps: 30, // Number of denoising steps (minimum: 1; maximum: 50)
    guidance_scale: 7.5, // Scale for classifier-free guidance (minimum: 1; maximum: 20)
    safety_checker: "yes", // Enhance prompts for better results, default : yes, option : yes/no
    seed: null, // Random seed. Leave blank to randomize the seed
    webhook: null, // webhook to call when image generation is completed
    track_id: null, // tracking id to track this api call
  });

  // Redirect Module
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    handleSetSetting({ key: "input_1", value: params.get("prompt") });
  }, []);

  // at first(when the page loading) the selected category index is 0
  useEffect(() => {
    apiService
      .getCategories()
      .then((data) => {
            dispatch(setAllCates(data))
            .then((res) => {
            })
            .catch((err) => {
            });
            handleSetSetting({ key: "category_name", value: data.categories[0].name });
        })
      .catch((err) => {
        err = err?.response?.data;
      });
  }, []);

  // if change the category index in setting, selected the model index is 0
  useEffect(() => {
    let category_name = "";
    if( setting.category_index >= 0 && 
        modelObj.categories && 
        modelObj.categories.length > 0 ) {
        category_name = modelObj.categories[setting.category_index].name;
    }
    getModelsByCategoryName(category_name);
  }, [setting.category_index]);

  // when the page load, for async with store, call the category name
  useEffect(() => {
    getModelsByCategoryName(setting.category_name);
  }, [setting.category_name]);

  // if the user change the model, clear the old prompt
  useEffect(() => {
    handleSetSetting([
      {key: "old_prompt", value: ""},
      {key: "old_assistant", value: ""}
    ]);
  }, [setting.model_index]);

  // when the user select the category, get the model list and clear the selected model
  const getModelsByCategoryName = ( category_name ) => {
    apiService
    .getModelsByCategory(category_name)
    .then((data) => {
        dispatch(setModels(data))
            .then((res) => {})
            .catch((err) => {});
        if(data.models.length > 0) {
            handleSetSetting({ key: "model_index", value: 0 });
        }
    })
    .catch((err) => {
      err = err?.response?.data;
    });
  }

  const handleTabChange = (event, idx) => {
    setTabIndex(idx);
  };

  const handleSetSetting = (item) => {
    const settingStr = JSON.stringify(setting);
    const settingObj = JSON.parse(settingStr);

    if (item.length !== undefined) {
      item.map((obj) => {
        settingObj[obj.key] = obj.value;
        setSetting(settingObj);
      });
    } else {
      settingObj[item.key] = item.value;
      setSetting(settingObj);
    }
  };

  return (
    <>
      <Box
        className="root-box"
        sx={{ height: "calc(100vh - 80px)", backgroundColor: "#1c1c27" }}
      >
        <Box sx={{ borderBottom: `1px solid #2A2C36` }}>
          <StyledTabs value={tabIndex} onChange={handleTabChange}>
            <StyledTab label="Prompt" />
          </StyledTabs>
        </Box>

        <TabPanel value={tabIndex} index={0} sx={{ padding: 0 }}>
          <TabPromptPage
            setting={setting}
            setSetting={handleSetSetting}
            loading={loading}
            setLoading={setLoading}
            aiState={aiState}
            setAiState={setAiState}
          />
        </TabPanel>
      </Box>
    </>
  );
};

export default StudioPage;
