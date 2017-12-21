import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// TODO: add uniqueness and email validations to email field

var AuthModel = class {
  constructor(user) {
   if (user) {
    this.email = user.email;
    this.password_hash = user.password_hash;
    this.confirmed = user.confirmed;
    this.confirmation_token = user.confirmation_token;
   }

   this.schema = {
      email: {
        type: String,
        required: true,
        lowercase: true,
        index: true,
        unique: true
      },
      password_hash: { type: String, required: true },
      confirmed: { type: Boolean, default: false },
      confirmation_token: { type: String, default: "" }
    }
  }
};

AuthModel.prototype.isValidPassword = function(password) {
  console.log(password + '-' + this.password_hash);
  return bcrypt.compareSync(password, this.password_hash);
};

AuthModel.prototype.setPassword = function(password) {
  this.password_hash = bcrypt.hashSync(password, 10);
  return this.password_hash;
};

AuthModel.prototype.setConfirmationToken = function() {
  this.confirmation_token = this.generateJWT();
  return this.confirmation_token;
};

AuthModel.prototype.generateConfirmationUrl = function() {
  return `${process.env.HOST}/confirmation/${this.confirmation_token}`;
};

AuthModel.prototype.generateResetPasswordLink = function() {
  return `${process.env.HOST}/reset_password/${this.generateResetPasswordToken()}`;
};

AuthModel.prototype.generateJWT = function () {
  return jwt.sign ({
    email: this.email,
  }, process.env.JWT_SECRET);
};

AuthModel.prototype.generateResetPasswordToken = function() {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

AuthModel.prototype.toAuthJSON = function() {
  return {
    email: this.email,
    confirmed: this.confirmed,
    token: this.generateJWT()
  };
};

export default AuthModel;
