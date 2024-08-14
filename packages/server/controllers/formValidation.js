const { formSchema } = require("@rtcom-app/common");

const validateFrom = (req, res) => {
  const formData = req.body;
  try {
    formSchema
      .validate(formData)
      .catch((err) => {
        res.status(422).send();
        console.log("err---", err.errors);
      })
      .then((res) => console.log("response.....", res));
  } catch (err) {
    console.log("try catch eerro", err);
  }
};

module.exports = validateFrom;
