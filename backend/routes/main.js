import { createRequire } from "module";
import { getAllPostsPageIds, getAllTopPostsPageIds, getPostBlocksUsingPageId, postQueriesToNotionDB ,getSiteMap } from "../controllers/main.js";
const require = createRequire(import.meta.url);

const express = require("express");



const router = express.Router();


router.route("/posts").get(
    getAllPostsPageIds);

router.route("/blocks/:id").get(getPostBlocksUsingPageId);

router.route("/top-posts").get(getAllTopPostsPageIds);


router.route("/queries").post(postQueriesToNotionDB);

router.route("/get-sitemap").get(getSiteMap)



export default router