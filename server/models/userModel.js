const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required : [true, "You must provide a name"],
    },
    lastName : {
        type: String,
        required : [true, "You must provide a name"],
    },
    phone : {
        type : String,
        match:/^(01)(1|2|0|5)\d{8}$/,
        required : [function() {
            // Require phone only for local users
            return this.provider !== 'google';
        }, "You must provide a phone number"],
    },
    email : {
        type: String,
        required: [true, "You must provide an email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail,"Please provide a valid email!"],
    },
    //OAuth data 
    provider: String,
    providerId: String,
    accessToken: String,
    //profile and avatar here later
    password: {
        type: String,
        required: [function () {
            // Require password only for local users
            return this.provider !== 'google';
        }, "You must provide a password "],
        match: [
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, //Minimum six characters, at least one letter and one number
        "Please provide a valid password",
    ],
        select: true,
    },
    passwordConfirm: {
        type: String,
        required: [function() {
            // Require passwordConfirm only for local users
            return this.provider !== 'google';
        }, "Please confirm your password"],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords are not the same!",
        }
    },
    profile: {
        // You can add various fields for the user's profile, such as age, gender, address, etc.
        age: Number,
        gender: String,
        address: String,
    },
    avatar: {
        type: String,
        // You can store the path or URL to the user's avatar image.
        // You may want to consider using a file storage service to store the actual image.
    },
    verificationCode: String,
    isVerified: {
        type: Boolean,
        default: false 
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

// Define a custom validation function for checking if the phone number starts with '01' (Egyptian mobile phone prefix)
userSchema.path('phone').validate(function validatePhone () {
    return this.phone.startsWith('01');
}, 'Please provide a valid Egyptian mobile phone number.')


const User = mongoose.model("User", userSchema);
module.exports = User;