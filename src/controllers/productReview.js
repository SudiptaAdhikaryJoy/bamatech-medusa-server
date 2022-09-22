//  product review from store get method
async function productReviewGet(req, res, next){

            try {
                const { scope:{resolve}, params:{id} } = req;
                const productReviewService = resolve("productReviewService")
                const productReview = await productReviewService.getProductReviews(id);
                res.status(200).send(productReview);
            } catch (error) {
                console.log(error);
                const {} = error;
            }
        
  
}

// product review from store post method

async function productReviewPost(req, res) {
    try {
        const { scope:{resolve}, params:{id}, body } = req;
        console.log(body)
        const productReviewService = resolve("productReviewService")
        // 1. throw an error if product id or body are not available
        // 2. throw error if product with provided product id is not available
        // 3. throw error if the review does not get saved in the database
        const productReview = await productReviewService.addProductReview(id, body);
        res.status(200).send(productReview);
    } catch (error) {
        // console.log(error)
        const {name, message, id} = error;
        if(id===null) res.status(404).send("Not found in server");
    }
   
}

// product review from admin get method

async function adminProductReview(req, res) {
    
        const productReviewService = req.scope.resolve("productReviewService")
        await productReviewService.getProductReviews(req.params.id).then((product_reviews) => {
            return res.json({
                product_reviews
            })
        })
   
}

module.exports = { productReviewGet, productReviewPost, adminProductReview };

