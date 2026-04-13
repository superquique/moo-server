const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notebookSchema = new Schema(
    {
        name: String,
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

const Notebook = mongoose.model("Notebook", notebookSchema);

module.exports = Notebook;