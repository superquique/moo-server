const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notebookSchema = new Schema(
    {
        name: String,
        isFavorite: {
            type: Boolean,
            default: false
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

notebookSchema.index({ name: 'text' });

const Notebook = mongoose.model("Notebook", notebookSchema);

module.exports = Notebook;