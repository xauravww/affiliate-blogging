import { createRequire } from "module";
import { getAllPostsPageIds, getAllTopPostsPageIds, getPostBlocksUsingPageId, postQueriesToNotionDB ,getSiteMap, getPostDetailByPageIds ,searchPosts ,getPageIdsOfSameCategory ,fetchPostIds} from "../controllers/main.js";
const require = createRequire(import.meta.url);

const express = require("express");



const router = express.Router();


router.route("/posts").get(
    getAllPostsPageIds);
router.route("/posts/:id").get(
    getPostDetailByPageIds);

router.route("/blocks/:id").get(getPostBlocksUsingPageId);

router.route("/top-posts").get(getAllTopPostsPageIds);


router.route("/queries").post(postQueriesToNotionDB);
router.route("/search").get(searchPosts);
router.route("/category").post(getPageIdsOfSameCategory)
router.route("/get-sitemap").get(getSiteMap)
router.route("/fetch-post-ids").get(fetchPostIds)



export default router