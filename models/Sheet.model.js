const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sheetSchema = new Schema (
    {
        title: String,
        timeSignature: String,
        keySignature: String,
        clef: String,
        notes: String,
        chords: String,
        lyrics: String,
        notebook: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notebook"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
)

const Sheet = mongoose.model("Sheet", sheetSchema);

module.exports = Sheet;