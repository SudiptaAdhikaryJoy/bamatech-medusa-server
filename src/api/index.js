import { Router, json } from "express"
import cors from "cors"
import { projectConfig } from "../../medusa-config"
import { adminProductReview, productReviewGet, productReviewPost } from "../controllers/productReview"
import authenticate from "@medusajs/medusa/dist/api/middlewares/authenticate-customer"

export default () => {
    const router = Router()
    const storeCorsOptions = {
        origin: projectConfig.store_cors.split(","),
        credentials: true,
    }

    router.get("/store/products/:id/reviews", cors(storeCorsOptions), authenticate(), productReviewGet)

    router.use(json())
    router.options("/store/products/:id/reviews", cors(storeCorsOptions))
    router.post("/store/products/:id/reviews", cors(storeCorsOptions), authenticate(), productReviewPost)

    const corsOptions = {
        origin: projectConfig.admin_cors.split(","),
        credentials: true,
    }
    router.options("/admin/products/:id/reviews", cors(corsOptions))
    router.get("/admin/products/:id/reviews", cors(corsOptions), authenticate(), adminProductReview)

    return router;
}