const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const GET_ALL_STATS = async (req, res) => {
    try {
        // 1. Нийт хэрэглэгчдийн тоо
        const totalUsers = await prisma.users.count()

        // 2. Нийт өгсөн тест (exam_test)
        const totalExamsCompleted = await prisma.exam_test.count()

        // 3. Өнөөдрийн огноо бэлтгэх
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        // 4. Өнөөдөр өгсөн тест (exam хүснэгтийн date ашиглах)
        const todayExamsCount = await prisma.exam.count({
            where: {
                date: {
                    gte: today,
                    lt: tomorrow
                }
            }
        })

        // 5. Амжилтын хувь тооцоолох (isSuccess = 1)
        const successfulTests = await prisma.exam_test.count({
            where: {
                isSuccess: 1
            }
        })
        const successRate = totalExamsCompleted > 0 
            ? ((successfulTests / totalExamsCompleted) * 100).toFixed(1)
            : 0

        // 6. Ангиллын тоо
        const totalCategories = await prisma.category.count()

        // 7. Сэдвийн тоо
        const totalTopics = await prisma.topic.count()

        // 8. Тестийн тоо
        const totalTests = await prisma.test.count()

        // 9. Өнөөдөр идэвхтэй хэрэглэгчид (өнөөдөр exam үүсгэсэн)
        const activeUsersToday = await prisma.exam.groupBy({
            by: ['user'],
            where: {
                date: {
                    gte: today,
                    lt: tomorrow
                }
            }
        })

        // 10. Сүүлийн 5 шалгалт (exam + exam_test холбоотой)
        const recentExams = await prisma.exam.findMany({
            take: 5,
            orderBy: {
                date: 'desc'
            },
            where: {
                isMake: 1  // Дууссан шалгалтууд
            },
            include: {
                users: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        username: true
                    }
                },
                examTest: {
                    take: 1,
                    orderBy: {
                        id: 'desc'
                    },
                    include: {
                        test_exam_test_testTotest: {
                            select: {
                                id: true,
                                name: true,
                                img: true
                            }
                        }
                    }
                }
            }
        })

        // 11. Ангилал бүрийн тест тоо
        const categoryStats = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
                _count: {
                    select: {
                        test_test_categoryTocategory: true,
                        topic_topic_categoryTocategory: true
                    }
                }
            },
            take: 5,
            orderBy: {
                test_test_categoryTocategory: {
                    _count: 'desc'
                }
            }
        })

        // 12. Хамгийн идэвхтэй сурагчид (сүүлийн 30 хоног)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const topStudents = await prisma.exam.groupBy({
            by: ['user'],
            where: {
                date: {
                    gte: thirtyDaysAgo
                },
                isMake: 1
            },
            _count: {
                id: true
            },
            orderBy: {
                _count: {
                    id: 'desc'
                }
            },
            take: 5
        })

        // Хамгийн идэвхтэй сурагчдын дэлгэрэнгүй мэдээлэл авах
        const topStudentsDetails = await Promise.all(
            topStudents.map(async (student) => {
                const userInfo = await prisma.users.findUnique({
                    where: { id: student.user },
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        username: true
                    }
                })
                return {
                    ...userInfo,
                    examCount: student._count.id
                }
            })
        )

        // Response бүтэц
        const stats = {
            overview: {
                totalUsers,
                totalExamsCompleted,
                todayExams: todayExamsCount,
                successRate: parseFloat(successRate),
                totalCategories,
                totalTopics,
                totalTests,
                activeUsersToday: activeUsersToday.length
            },
            recentExams: recentExams.map(exam => {
                const firstTest = exam.examTest && exam.examTest[0]
                return {
                    id: exam.id,
                    testName: firstTest?.test_exam_test_testTotest?.name || 'N/A',
                    testImage: firstTest?.test_exam_test_testTotest?.img || null,
                    userName: exam.users?.first_name || 'N/A',
                    userLastName: exam.users?.last_name || '',
                    isSuccess: firstTest?.isSuccess === 1,
                    date: exam.date
                }
            }),
            topStudents: topStudentsDetails,
            categoryStats: categoryStats.map(cat => ({
                id: cat.id,
                name: cat.name,
                testCount: cat._count.test_test_categoryTocategory,
                topicCount: cat._count.topic_topic_categoryTocategory
            }))
        }

        return res.status(200).json({
            success: true,
            data: stats,
            message: "Амжилттай."
        })

    } catch (err) {
        console.error("Dashboard stats error:", err)
        return res.status(500).json({
            success: false,
            data: null,
            message: "Серверийн алдаа гарлаа. " + err.message
        })
    }
}

module.exports = GET_ALL_STATS