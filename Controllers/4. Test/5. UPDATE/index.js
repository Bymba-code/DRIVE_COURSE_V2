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


const UPDATE_TEST = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err) {
                return res.status(500).json({ success: false, message: "Зураг оруулахад алдаа гарлаа: " + err.message });
            }

        const { id } = req.params;  
        const {name, topic, category } = req.body;  

        if (!id) {
            return res.status(403).json({
                success: false,
                data: [],
                message: "Шинэчлэх тестийн ID байхгүй байна."
            });
        }

        const isTest = await prisma.test.findFirst({
            where: {
                id: parseInt(id)
            }
        })

        if(!isTest)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Сонгосон тест устсан эсвэл байхгүй байна."
            })
        }


        let updateData = {};

        if (req.file) {
            const imageFile = req.file;
            const imageUrl = imageFile ? `/uploads/${imageFile.filename}` : null;

            updateData.img = imageUrl;
        }

        if (name) {
            updateData.name = name;
        }

        if (topic) {
            updateData.topic = parseInt(topic);  
        }

        if (category) {
            updateData.category = parseInt(category); 
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "Шинэчлэх өгөгдөл байхгүй байна."  
            });
        }

        const result = await prisma.test.update({
            where: {
                id: parseInt(id)  
            },
            data: updateData  
        });

        return res.status(200).json({
            success: true,
            data: result,
            message: "Тест амжилттай шинэчиллээ."
        });
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            data: [],
            message: "Серверийн алдаа гарлаа. " + err
        });
    }
};

module.exports = UPDATE_TEST;
