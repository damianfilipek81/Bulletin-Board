/* eslint-disable linebreak-style */
const express = require('express');
const router = express.Router();

const isLogged = (req, res, next) => {
  if (req.user === undefined) {
    res.json({
      logged: false,
      email: '',
      id: '',
      name: '',
    });
  } else {
    next();
  }
};

router.get('/logged', isLogged, (req, res) => {
  const { sub, name, email } = req.user._json;
  const output = {
    id: sub,
    name,
    email,
    logged: true,
  };

  res.json(output);

});

module.exports = router;