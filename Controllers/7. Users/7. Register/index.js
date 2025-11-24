const { default: axios } = require("axios");
const prisma = require("../../../Middlewares/prisma");
const bcrypt = require("bcrypt");

const REGISTER_USER = async (req, res) => {
    try {
        const {
            familyname,
            first_name,
            last_name,
            birthdate,
            register,
            gender,
            blood_type,
            city,
            district,
            hayg,
            facebook,
            phone,
            medeelel_awsan,
            phoneTwo,
            category,
            mobile
        } = req.body;

        // if (!first_name || !last_name || !username || !password || !mobile) {
        //     return res.status(400).json({
        //         success: false,
        //         data: [],
        //         message: "Заавал бөглөх талбаруудыг бөглөнө үү."
        //     });
        // }

        // const existingUser = await prisma.users.findFirst({
        //     where: {
        //         username: username
        //     }
        // });

        // if (existingUser) {
        //     return res.status(403).json({
        //         success: false,
        //         data: [],
        //         message: "Хэрэглэгчийн нэр бүртгэгдсэн байна."
        //     });
        // }

        const storePayToken = await prisma.storepay.findUnique({
            where: {
                id: parseInt(1)
            }
        });

        if (!storePayToken || !storePayToken.access_token) {
            return res.status(404).json({
                success: false,
                data: [],
                message: "StorePay токен олдсонгүй."
            });
        }

        const issuedAt = Math.floor(Date.now() / 1000);
        const expiresIn = 2592000; // 30 days
        const expiresAt = issuedAt + expiresIn;
        const expireDate = new Date(expiresAt * 1000);

        if (storePayToken.expire_date && new Date() > new Date(storePayToken.expire_date)) {
            return res.status(403).json({
                success: false,
                data: [],
                message: "Токений хугацаа дууссан байна."
            });
        }

        let storePayResponse = null;
        let loanId = null;

        try {
            const storePayPayload = {
                storeId: storePayToken.store_id || "26421",
                mobileNumber: mobile,
                description: category ? `${category} ангилалын төлбөр` : "Элсэлтийн төлбөр",
                amount: 600000
            };

            storePayResponse = await axios.post(
                'https://service.storepay.mn/merchant/loan',
                storePayPayload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${storePayToken.access_token}`
                    },
                    timeout: 30000 
                }
            );

            console.log('StorePay Response:', storePayResponse.data);

            if (storePayResponse.data && storePayResponse.data.id) {
                loanId = storePayResponse.data.id;
            } else if (storePayResponse.data && storePayResponse.data.status === 'Failed') {
                return res.status(400).json({
                    success: false,
                    data: [],
                    message: "Нэхэмжлэх үүсгэхэд алдаа гарлаа: " + (storePayResponse.data.message || "Тодорхойгүй алдаа")
                });
            }

        } catch (storePayError) {
            console.error('StorePay API Error:', storePayError.response?.data || storePayError.message);

            return res.status(500).json({
                success: false,
                data: [],
                message: "Төлбөрийн системтэй холбогдоход алдаа гарлаа: " + (storePayError.response?.data?.message || storePayError.message)
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.users.create({
            data: {
                familyname: familyname || null,
                first_name: first_name,
                last_name: last_name,
                birthdate: birthdate ? new Date(birthdate) : null,
                register: register || null,
                gender: gender || null,
                blood_type: blood_type || null,
                city: city || null,
                district: district || null,
                hayg: hayg || null,
                facebook: facebook || null,
                phone: phone || null,
                medeelel_awsan: medeelel_awsan || null,
                phonetwo: phoneTwo || null,
                username: username,
                password: hashedPassword,
                role: 'user', // default role
                create_date: new Date(),
                end_date: expireDate,
                storepay_loan_id: loanId, // Save loan ID if you have this field
                storepay_request_id: storePayResponse?.data?.requestId || null
            }
        });

        if (category && Array.isArray(category)) {
            const categoryLinks = category.map(catId => ({
                user_id: newUser.id,
                category_id: parseInt(catId)
            }));

            await prisma.user_category.createMany({
                data: categoryLinks
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                userId: newUser.id,
                username: newUser.username,
                loanId: loanId,
                loanStatus: storePayResponse?.data?.status || 'Pending'
            },
            message: "Хэрэглэгч амжилттай бүртгэгдлээ. Нэхэмжлэх үүсгэгдлээ."
        });

    } catch (err) {
        console.error('Error in REGISTER_USER:', err);
        return res.status(500).json({
            success: false,
            data: [],
            message: "Серверийн алдаа гарлаа: " + err.message
        });
    }
};

module.exports = REGISTER_USER;