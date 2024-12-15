import { parseToken, validateToken } from "../utils/keyClockTokenUtils.js";

export const tokenValidationMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unathorized" });
  }
  try {
    const verifiedToken = await validateToken(token); // Validate the token
    //console.log("verified token", verifiedToken);
    // Extract the required fields from the token payload

    const { realm_access, preferred_username, isAdmin } = verifiedToken;
    const roles = realm_access?.roles || []; // Ensure roles exist even if empty

    // Create a new object with the extracted properties
    req.user = {
      username: preferred_username,
      roles: roles,
      isAdmin: isAdmin,
    };

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
