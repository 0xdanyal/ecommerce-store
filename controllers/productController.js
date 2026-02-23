import asyncHandler from 'express-async-handler';

export const getProducts = asyncHandler(async (req, res) => {
  // query params: keyword, category, minPrice, maxPrice, sort, page, limit
});

export const getProductById = asyncHandler(async (req, res) => {});
export const createProduct  = asyncHandler(async (req, res) => {
  // req.files → cloudinary URLs already set by uploadMiddleware
});
export const updateProduct  = asyncHandler(async (req, res) => {});
export const deleteProduct  = asyncHandler(async (req, res) => {});