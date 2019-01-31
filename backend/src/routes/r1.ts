import * as express from "express";
import Tools from "../utils/tools";

const router = express.Router();
const logger = Tools.Instance.getLogger("app:visite");

router.use(express.json());
router.get("/", (req, res) => res.send("Buru world"));

export = router;
