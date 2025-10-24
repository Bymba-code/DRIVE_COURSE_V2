const prisma = require("../../../Middlewares/prisma");
const bcrypt = require("bcrypt");

const STUDENT_REGISTER = async (req, res) => {
    try {
        const {
            familyName,
            firstname,
            lastname,
            birthdate,
            register,
            gender,
            blood_type,
            city,
            district,
            hayg,
            facebook,
            phone,
            medeelel,
            phoneTwo,
            selectedCategory,
            payment_method
        } = req.body;

        if (!familyName) {
            return res.status(400).json({ success: false, message: "Ургийн овог оруулна уу." });
        }

        if (!firstname) {
            return res.status(400).json({ success: false, message: "Овог нэр оруулна уу." });
        }

        if (!lastname) {
            return res.status(400).json({ success: false, message: "Өөрийн нэр оруулна уу." });
        }

        if (!birthdate) {
            return res.status(400).json({ success: false, message: "Төрсөн огноо оруулна уу." });
        }

        if (!register) {
            return res.status(400).json({ success: false, message: "Регистрийн дугаар оруулна уу." });
        }

        if (!gender) {
            return res.status(400).json({ success: false, message: "Хүйс сонгоно уу." });
        }

        if (!blood_type) {
            return res.status(400).json({ success: false, message: "Цусны бүлэг сонгоно уу." });
        }

        if (!city) {
            return res.status(400).json({ success: false, message: "Амьдарч буй байршил сонгоно уу." });
        }

        if (!district) {
            return res.status(400).json({ success: false, message: "Дүүрэг сонгоно уу." });
        }

        if (!hayg) {
            return res.status(400).json({ success: false, message: "Хаяг оруулна уу." });
        }

        if (!facebook) {
            return res.status(400).json({ success: false, message: "Facebook хаяг оруулна уу." });
        }

        if (!phone) {
            return res.status(400).json({ success: false, message: "Холбоо барих утасны дугаар оруулна уу." });
        }

        if (!phoneTwo) {
            return res.status(400).json({ success: false, message: "Яаралтай үед холбоо барих утасны дугаар оруулна уу." });
        }

        if (!medeelel) {
            return res.status(400).json({ success: false, message: "Мэдээлэл хаанаас авсан бэ?" });
        }

        const existingStudent = await prisma.users.findFirst({
            where: { 
                register: register
             },
        });

        if (existingStudent) {
            return res.status(409).json({
                success: false,
                message: "Регистрийн дугаар бүртгэгдсэн байна.",
            });
        }

        const rawPassword = register.slice(-4);
        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        const newStudent = await prisma.users.create({
            data: {
                familyname: familyName,
                first_name: firstname,
                last_name: lastname,
                birthdate: new Date(birthdate),
                register,
                gender: parseInt(gender),
                blood_type:parseInt(blood_type),
                city,
                district,
                hayg,
                facebook,
                phone,
                phonetwo: phoneTwo,
                medeelel_awsan: parseInt(medeelel),
                password: hashedPassword,
            },
        });

        return res.status(201).json({
            success: true,
            message: "Оюутан амжилттай бүртгэгдлээ.",
            data: newStudent,
        });

    } catch (err) {
        console.error("Оюутан бүртгэхэд алдаа гарлаа:", err);
        return res.status(500).json({
            success: false,
            message: "Серверийн алдаа гарлаа.",
            error: err.message || err,
        });
    }
};

module.exports = STUDENT_REGISTER;
