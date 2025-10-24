const prisma = require("../../../Middlewares/prisma");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage }).single("image");

const INSERT_TEST = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err) {
                return res.status(500).json({ success: false, message: "Image upload failed: " + err.message });
            }

            const { name, topic, category } = req.body;
            const imageFile = req.file;

            if (!topic) return res.status(403).json({ success: false, message: "Тестийн сэдэвийг сонгоно уу." });
            if (!category) return res.status(403).json({ success: false, message: "Тестийн ангилалыг сонгоно уу." });
            if (!name) return res.status(403).json({ success: false, message: "Тестийн асуулт оруулна уу." });
        
           

            const isTest = await prisma.test.findFirst({ where: { name } });
            if (isTest) return res.status(402).json({ success: false, message: "Тест аль хэдийн нэмэгдсэн байна." });

            const imageUrl = imageFile ? `/uploads/${imageFile.filename}` : null;

            const result = await prisma.test.create({
                data: {
                    name,
                    img: imageUrl,
                    topic: parseInt(topic),
                    category: parseInt(category),
                    date: new Date(),
                },
            });

            return res.status(200).json({ success: true, data: result, message: "Тестийг амжилттай нэмлээ." });
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Серверийн алдаа гарлаа. " + err });
    }
};

module.exports = INSERT_TEST;
