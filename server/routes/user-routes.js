import express from "express";

import {
  getUser,
  signin,
  signup,
  signinGoogle,
  forgotPassword,
  resetPassword,
  purchaseRole,
} from "../controllers/clients/user.js";
import {
  createImage,
  searchImageByKeyword,
  favouriteImg,
  getImageById,
  followImgAuthor,
  makePrivate,
} from "../controllers/clients/image.js";
import { getAllRoles } from "../controllers/clients/role.js";
import { getCategories } from "../controllers/clients/categories.js";
import { getModelsByCategory } from "../controllers/clients/models.js";
import { setHistory, getHistory, getOneTextHistory } from "../controllers/clients/texthistories.js";
import clientAuthMiddleware from "../middleware/client-auth.js";

const router = express.Router();

router.get("/users/", clientAuthMiddleware, getUser);
router.post("/users/signin", signin);
router.post("/users/signup", signup);
router.post("/users/signin_google", signinGoogle);
router.post("/users/forgot", forgotPassword);
router.post("/users/reset", resetPassword);
router.post("/users/purchase_role", clientAuthMiddleware, purchaseRole);

router.post("/imgs/search", searchImageByKeyword);
router.post("/imgs/create", clientAuthMiddleware, createImage);
router.post("/imgs/fav", clientAuthMiddleware, favouriteImg);
router.post("/imgs/get_image_by_id", clientAuthMiddleware, getImageById);
router.post("/imgs/follow_img_author", clientAuthMiddleware, followImgAuthor);
router.post("/imgs/make_private", clientAuthMiddleware, makePrivate);

router.post("/roles/get_all_roles", getAllRoles);

router.post("/categories/get_categories", getCategories);
router.post("/models/get_model_by_category", getModelsByCategory);

router.post("/history/set_text", setHistory);
router.post("/history/get_text", getHistory);
router.post("/history/get_one_text", getOneTextHistory);

export default router;
