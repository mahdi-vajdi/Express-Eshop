const { Profile } = require("../models/profile.model");
const { User } = require("../models/user.model");

exports.createProfile = async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    console.log("profile.controller: created profile: ", profile);
    res.status(201).json({ message: "Created profile", profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      const profile = await Profile.findById(user.profile);
      if (profile) {
        ReadableByteStreamController.status(200).json(profile);
      } else {
        res.status(404).json({ message: "Couldm't find profile" });
      }
    } else {
      res.status(404).json({ message: "Couldn't find user" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.UpdateProfile = async (req, res) => {
    try {
        const updatedProfile = await Profile.findByIdAndUpdate(req.user.id, req.body, {
          returnDocument: "after",
          runValidators: true,
        }).exec();
    
        if (!updatedUser)
          return res
            .status(404)
            .json({ message: "The requested ID does not have a correct form" });
    
        res.status(200).json({ message: "Updated user successfully", updatedUser });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
