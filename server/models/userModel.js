const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    userName : {
        type: String,
        required : [true, "You must provide a name"],
    },
    email : {
        type: String,
        required: [true, "You must provide an email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail,"Please provide a valid email!"],
    },
    //profile and avatar here later
    password: {
        type: String,
        required: [true, "You must provide a password "],
        match: [
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, //Minimum six characters, at least one letter and one number
        "Please provide a valid password",
        ],
        select: true,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords are not the same!",
        }
    },
    createdAt: Date,
})

//Before Save , Check if the password is NOT Modified, then hash it and save into the db.
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

//Before Save , Check if the password is NOT Modified, then update passwordChangedAt to the now date minus 1 Second which is the time taken to handle the request.
userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.methods.correctPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}


const User = mongoose.model("User", userSchema);
module.exports = User;