import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token in verifytoken", token);
  if (!token) {
   return res
      .status(401)
      .json({ success: false, message: "invalid token,  Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
     return res
        .status(401)
        .json({ success: false, message: "invalid token,  Unauthorized" });
    }
    req.userId = decoded.userId;
    console.log("decoded userId", req.userId);
    next();
  } catch (error) {
    console.log("invalid token,  Unauthorized", error);
     res
      .status(401)
      .json({ success: false, message: "invalid token,  Unauthorized" });
  }
};
