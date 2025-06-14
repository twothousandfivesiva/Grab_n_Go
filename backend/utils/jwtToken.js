// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() +Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    //httpOnly improves security by preventing malicious scripts from stealing your token stored in cookies.
    //expires: tells the browser when to delete the cookie automatically.

//httpOnly: makes the cookie inaccessible to client-side JS for security.
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;