const mongoose = require ("mongoose")

const NewsletterSchema = mongoose.Schema({
    emiail: {
        type: String,
        unique: true,
    }
})

module.exports = mongoose.model("Newsletter", NewsletterSchema)