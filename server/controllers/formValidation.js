const Yup = require("Yup");

const formSchema = Yup.object({
  username: Yup.string()
    .required("The user name is required field!")
    .min(6, "Username is too short")
    .max(28, "Username can not be too long!"),
  password: Yup.string()
    .required("The user name is required field!")
    .min(6, "Username is too short")
    .max(28, "Username can not be too long!"),
});

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
