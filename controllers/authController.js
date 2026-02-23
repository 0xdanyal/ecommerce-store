import asyncHandler from 'express-async-handler';

// @route POST /api/auth/register
export const register = asyncHandler(async (req, res) => {
  // 1. destructure req.body
  // 2. check if user exists
  // 3. hash password (bcrypt)
  // 4. create user
  // 5. generate accessToken + refreshToken
  // 6. save refreshToken to user doc
  // 7. set cookies, send response
});

// @route POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  // 1. find user by email
  // 2. compare password
  // 3. generate tokens, set cookies
});

// @route POST /api/auth/logout
export const logout = asyncHandler(async (req, res) => {
  // 1. clear refreshToken from DB
  // 2. clear cookies
  // 3. send 200
});

// @route POST /api/auth/refresh
export const refreshToken = asyncHandler(async (req, res) => {
  // 1. get refreshToken from cookie
  // 2. verify with JWT_REFRESH_SECRET
  // 3. find user, validate stored token matches
  // 4. issue new accessToken, set cookie
});