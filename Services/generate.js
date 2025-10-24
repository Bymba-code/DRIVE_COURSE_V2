const prisma = require("../../../Middlewares/prisma");

const generateStudentCode = async (prefix = "AZ01D") => {
    const lastStudent = await prisma.student.findFirst({
        where: {
            username: {
                startsWith: prefix,
            },
        },
        orderBy: {
            createdAt: "desc", 
        },
    });

    let nextNumber = 1;

    if (lastStudent && lastStudent.username) {
        const lastCode = lastStudent.username.replace(prefix, "");
        nextNumber = parseInt(lastCode, 10) + 1;
    }

    const paddedNumber = String(nextNumber).padStart(3, "0");

    return `${prefix}${paddedNumber}`; 
};

module.exports = generateStudentCode;