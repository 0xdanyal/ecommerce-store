import asyncHandler from 'express-async-handler';

export const placeOrder = asyncHandler(async (req, res) => {
  // 1. validate cart items / stock
  // 2. create order
  // 3. decrement product stock
  // 4. clear cart
});
export const getMyOrders = asyncHandler(async (req, res) => {});
export const getAllOrders = asyncHandler(async (req, res) => {});
export const updateOrderStatus = asyncHandler(async (req, res) => {});