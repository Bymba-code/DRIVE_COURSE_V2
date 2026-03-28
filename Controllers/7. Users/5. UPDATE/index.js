const prisma = require("../../../Middlewares/prisma");
const bcrypt = require("bcrypt");

const UPDATE_USERS = async (req, res) => {
    try {

        /* ══════════════════════════════════════════════════
           1. ID шалгах
        ══════════════════════════════════════════════════ */
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Хэрэглэгчийн ID буруу эсвэл байхгүй байна.",
            });
        }

        const userId = parseInt(id);

        /* ══════════════════════════════════════════════════
           2. Хэрэглэгч олдож байгаа эсэх
        ══════════════════════════════════════════════════ */
        const user = await prisma.users.findUnique({
            where: { id: userId },
            include: { user_category: true },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Хэрэглэгч олдсонгүй.",
            });
        }

        /* ══════════════════════════════════════════════════
           3. Body-с field авах
           STUDENT_REGISTER_V2-тэй нийцүүлсэн нэрс:
             familyName  → familyname
             firstname   → first_name
             lastname    → last_name
             birthdate   → birthdate
             register    → register
             gender      → gender (int)
             blood_type  → blood_type (int)
             city        → city (int)
             district    → district (int)
             ward        → ward (int)
             hayg        → hayg
             facebook    → facebook
             phone       → phone
             phoneTwo    → phonetwo
             medeelel    → medeelel_awsan (int)
             role        → role
             endDate     → end_date
             password    → password (hash)
             categories  → user_category[] нэмэх
        ══════════════════════════════════════════════════ */
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
            ward,
            hayg,
            facebook,
            phone,
            phoneTwo,
            medeelel,
            role,
            endDate,
            password,
            categories = [],   // [{category: id, payment?: amount}]
        } = req.body;

        /* ══════════════════════════════════════════════════
           4. Register давхардал шалгах
        ══════════════════════════════════════════════════ */
        if (register && register !== user.register) {
            const dup = await prisma.users.findFirst({
                where: { register, NOT: { id: userId } },
            });
            if (dup) {
                return res.status(409).json({
                    success: false,
                    message: "Регистрийн дугаар аль хэдийн бүртгэгдсэн байна.",
                });
            }
        }

        /* ══════════════════════════════════════════════════
           5. updateData цуглуулах — зөвхөн ирсэн field-үүд
        ══════════════════════════════════════════════════ */
        const updateData = {};

        if (familyName  !== undefined) updateData.familyname      = familyName;
        if (firstname   !== undefined) updateData.first_name      = firstname;
        if (lastname    !== undefined) updateData.last_name       = lastname;
        if (register    !== undefined) updateData.register        = register;
        if (role        !== undefined) updateData.role            = role;
        if (hayg        !== undefined) updateData.hayg            = hayg;
        if (facebook    !== undefined) updateData.facebook        = facebook;
        if (phone       !== undefined) updateData.phone           = phone;

        if (birthdate   !== undefined) updateData.birthdate       = new Date(birthdate);
        if (endDate     !== undefined) updateData.end_date        = endDate ? new Date(endDate) : null;

        // Integer болгох шаардлагатай field-үүд
        if (gender      !== undefined) updateData.gender          = parseInt(gender);
        if (blood_type  !== undefined) updateData.blood_type      = parseInt(blood_type);
        if (city        !== undefined) updateData.city            = parseInt(city);
        if (district    !== undefined) updateData.district        = parseInt(district);
        if (ward        !== undefined) updateData.ward            = parseInt(ward);
        if (medeelel    !== undefined) updateData.medeelel_awsan  = parseInt(medeelel);
        if (phoneTwo    !== undefined) updateData.phonetwo        = phoneTwo;

        // Нууц үг — хоосон бол өөрчлөхгүй
        if (password && password.trim() !== "") {
            const salt          = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password.trim(), salt);
        }

        /* ══════════════════════════════════════════════════
           6. Шинэчлэх зүйл байгаа эсэх
        ══════════════════════════════════════════════════ */
        const hasUserUpdate     = Object.keys(updateData).length > 0;
        const hasCategoryUpdate = Array.isArray(categories) && categories.length > 0;

        if (!hasUserUpdate && !hasCategoryUpdate) {
            return res.status(400).json({
                success: false,
                message: "Шинэчлэх өгөгдөл байхгүй байна.",
            });
        }

        /* ══════════════════════════════════════════════════
           7. Transaction — users + user_category хамт
        ══════════════════════════════════════════════════ */
        await prisma.$transaction(async (tx) => {

            /* 7a. Users хүснэгт */
            if (hasUserUpdate) {
                await tx.users.update({
                    where: { id: userId },
                    data:  updateData,
                });
            }

            /* 7b. Categories — байгааг давтахгүй, шинийг нэмнэ */
            if (hasCategoryUpdate) {
                for (const cat of categories) {
                    const catId = parseInt(cat.category ?? cat.id);
                    if (!catId || isNaN(catId)) continue;

                    // Аль хэдийн бүртгэлтэй эсэх
                    const existing = await tx.user_category.findFirst({
                        where: { user: userId, category: catId },
                    });

                    if (!existing) {
                        // payment өгөөгүй бол category-н үнэ авах
                        let payment = cat.payment;
                        if (payment === undefined || payment === null) {
                            const categoryInfo = await tx.category.findUnique({
                                where: { id: catId },
                            });
                            payment = categoryInfo?.price ?? 0;
                        }

                        await tx.user_category.create({
                            data: {
                                user:     userId,
                                category: catId,
                                payment:  String(payment),   // STUDENT_REGISTER_V2 String хадгалдаг
                                date:     new Date(),
                            },
                        });
                    }
                }
            }
        });

        /* ══════════════════════════════════════════════════
           8. Шинэчлэгдсэн мэдээлэл буцаах
        ══════════════════════════════════════════════════ */
        const updatedUser = await prisma.users.findUnique({
            where: { id: userId },
            select: {
                id:             true,
                familyname:     true,
                first_name:     true,
                last_name:      true,
                birthdate:      true,
                register:       true,
                gender:         true,
                blood_type:     true,
                city:           true,
                district:       true,
                ward:           true,
                hayg:           true,
                facebook:       true,
                phone:          true,
                phonetwo:       true,
                medeelel_awsan: true,
                role:           true,
                end_date:       true,
                username:       true,
                create_date:    true,
                user_category: {
                    select: {
                        id:       true,
                        category: true,
                        payment:  true,
                        date:     true,
                    },
                },
            },
        });

        return res.status(200).json({
            success: true,
            data:    updatedUser,
            message: "Амжилттай шинэчлэгдлээ.",
        });

    } catch (err) {
        console.error("UPDATE_USERS алдаа:", err);
        return res.status(500).json({
            success: false,
            message: "Серверийн алдаа гарлаа.",
            error:   process.env.NODE_ENV === "development" ? err.message : undefined,
        });
    }
};

module.exports = UPDATE_USERS;