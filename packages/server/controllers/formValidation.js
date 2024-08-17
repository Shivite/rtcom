const { formSchema } = require("@rtcom-app/common");

const validateFrom = (req, res, next) => {
  const formData = req.body;
  try {
    formSchema
      .validate(formData)
      .catch((err) => {
        res.status(422).send();
        console.log("validation error", err.errors);
      })
      .then((res) => {
        if (res) {
          console.log("successfull");
          next();
        } else {
          res.status(422).send();
        }
      });
  } catch (err) {
    console.log("validation error catch", err);
  }
};

module.exports = validateFrom;
