const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    date_review: {
        type: Date,
        required: true
    },
    job_title: {
        type: String,
        required: true
    },
    current: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    overall_rating: {
        type: Number,
        required: true
    },
    work_life_balance: {
        type: Number,
        required: true
    },
    culture_values: {
        type: Number,
        required: true
    },
    diversity_inclusion: {
        type: Number,
        required: true
    },
    career_opp: {
        type: Number,
        required: true
    },
    comp_benefits: {
        type: Number,
        required: true
    },
    senior_mgmt: {
        type: Number,
        required: true
    },
    recommend: String,
    ceo_approv: String,
    outlook: String,
    headline: String,
    pros: String,
    cons: String,
    year: String,
    pros_cons_sentiment: String
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;