import router from "./userRoutes";


 // admin will create a product
router.post("/create", protect, authorize("admin"), createProduct);

 // admin will update a product
router.put("/edit/:id", protect, authorize("admin"), updateProduct)

// admin will delete a product
router.delete("/delete/:id", protect, authorize("admin"), deleteProduct)

 // both customer and admin can see all products
router.get("/", protect, showAllProducts);

 // both customer and admin can see a single product
router.get("/:id", protect, showProduct);

export default router;

