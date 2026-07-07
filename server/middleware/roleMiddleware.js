const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    console.log("Allowed Roles:", roles);
    console.log("User Role:", req.user.role);

    next();
  };
};

module.exports = roleMiddleware;