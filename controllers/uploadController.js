const cloudinary = require("cloudinary").v2;
const Uploader = async (req, res) => {
  const filePath = req.file.path;

  const result = await cloudinary.uploader.upload(filePath, {
    folder: "uploads",
    resource_type: "video",
    streaming_profile: "hd",
    eager: [
      { width: 300, height: 300, crop: "pad", audio_codec: "none" },
      {
        width: 160,
        height: 100,
        crop: "crop",
        gravity: "south",
        audio_codec: "none",
      },
    ],
  });
  console.log(result);
  // Adative streaming url
  const streamingUrl = cloudinary.url(result.public_id, {
    resource_type: "video",
    transformation: [{ streaming_profile: "hd", format: "m3u8" }],
    // secure: true
  });
  fs.unlinkSync(filePath);
  res.status(200).json({ url: result.secure_url, streaming_url: streamingUrl });

  // res.status(500).json({ error: error.message });
};

module.exports = Uploader;
