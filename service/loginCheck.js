const loginCheck = () => {
  return (req, res, next) => {
    if (req.user) {
      next();
    } else {
      return res.status(403).json("Login required");
    }
  };
};

exports.loginCheck = loginCheck;
