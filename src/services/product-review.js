import { BaseService } from "medusa-interfaces";

class ProductReviewService extends BaseService {
    constructor({ productReviewRepository, manager }) {
        super();

        this.productReviewRepository = productReviewRepository
        this.manager = manager
    }
   
    async getProductReviews(product_id) {
        
            const productReviewRepository = this.manager.getCustomRepository(this.productReviewRepository);
            return await productReviewRepository.find({
                product_id
            });
        
    }

    async addProductReview(product_id, data) {
        
            try {
                const { title, customer_id, content, rating } = data;
                if (!(title || customer_id || content || rating)) {
                    throw new Error("product review requires title, customer_id, content, and rating")
                }

                const productReviewRepository = this.manager.getCustomRepository(this.productReviewRepository);
                const createdReview = productReviewRepository.create({
                    product_id,
                    title,
                    customer_id,
                    content,
                    rating
                })
                const productReview = await productReviewRepository.save(createdReview);

                return productReview
            } catch (error) {
                console.log(error);
                // const {} = error 
            }
        
    }
}

export default ProductReviewService;