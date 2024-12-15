import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

// Keycloak JWKS configuration
const client = jwksClient({
  jwksUri: "http://localhost:8080/realms/master/protocol/openid-connect/certs", // Replace with your JWKS URI
  cache: true, // Cache signing keys for faster validation
  cacheMaxEntries: 5, // Maximum number of keys to cache
  cacheMaxAge: 36000000, // 10 hours cache duration
});

// Function to get the signing key
export const getSigningKey = async (kid) => {
  return new Promise((resolve, reject) => {
    client.getSigningKey(kid, (err, key) => {
      if (err) {
        return reject(err);
      }
      const signingKey = key.publicKey || key.rsaPublicKey;
      resolve(signingKey);
    });
  });
};

// Validate JWT
export const validateToken = async (token) => {
  if (!token) {
    throw new Error("Token is missing");
  }

  const decodedHeader = jwt.decode(token, { complete: true });
  if (!decodedHeader || !decodedHeader.header) {
    throw new Error("Invalid token");
  }

  const kid = decodedHeader.header.kid;
  if (!kid) {
    throw new Error('Token is missing "kid" in header');
  }

  try {
    const signingKey = await getSigningKey(kid);
    const verifiedToken = jwt.verify(token, signingKey, {
      algorithms: ["RS256"],
    });
    return verifiedToken;
  } catch (err) {
    throw new Error(`Token validation failed: ${err.message}`);
  }
};

// Parse token without validation
export const parseToken = (token) => {
  if (!token) {
    throw new Error("Token is missing");
  }

  try {
    const payload = jwt.decode(token);
    return payload;
  } catch (err) {
    throw new Error(`Token parsing failed: ${err.message}`);
  }
};
