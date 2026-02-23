import asyncHandler from 'express-async-handler';

export const getCart         = asyncHandler(async (req, res) => {});
export const addToCart       = asyncHandler(async (req, res) => {
  // upsert logic: if item+variant exists → increment qty, else push
});
export const updateCartItem  = asyncHandler(async (req, res) => {});
export const removeCartItem  = asyncHandler(async (req, res) => {});