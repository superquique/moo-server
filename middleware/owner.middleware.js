
const isOwner = (Model) => {

    return (req, res, next) => {
        const { id } = req.params;
        const userId = req.payload._id;

        // Check if the resource belongs to the user
        Model.findById(id)
        .then(resource => {
            if (!resource) {
                return res.status(404).json({ message: "Project not found" });
            }

            if (resource.user.toString() !== userId) {
                return res.status(403).json({ message: "Forbidden: You are not the owner of this resource" });
            }

            // If the user is the owner, proceed to the next middleware or route handler
            req.resource = resource;
            next();
        })
        .catch(error => {
            res.status(500).json({ message: "Server error", error });
        });
    }
}

module.exports = {
  isOwner
}