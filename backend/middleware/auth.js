// middleware\auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      "GUoWMLippni3Yg7YMw-7uSaO8WqpxGoM!I1tFC9MNLJL-aXOLs7pivp-oXLOHVyHJ/XZ=u6cVG/3r8XMZ7VCe6r1lme/he=GSkhLxkFRK!a=Fm?-8jpYCmr=8Uli34XMOLutZnuxVgYu4?G2vmOXaHyj1J7DJnQllC7UcwrhRz=OiiG9q?7u/nIKJ9mmm9!mmXmDOSDaJ2eSm2f0UzHm/G/LeMFY4qDWkBWqysn25QZYUfW7UgNYr04wFqm/56y"
    );
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
