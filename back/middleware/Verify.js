const jwt = require("jsonwebtoken");

const Verify = (req, res, next) => {
  const token = req.cookies.SessionID;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acesso negado. Faça login para continuar." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_HASH);

    req.userId = decoded.id;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Sessão inválida ou expirada. Faça login novamente." });
  }
};

module.exports = Verify;
