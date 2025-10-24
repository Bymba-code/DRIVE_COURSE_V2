const prisma = require("../../../Middlewares/prisma");

const INSERT_REACTIONS = async (req, res) => {
  try {
    const user = req.user;
    const { post, type } = req.body;

    if (!post) {
      return res.status(403).json({
        success: false,
        data: [],
        message: "Постийн мэдээлэл байхгүй байна."
      });
    }

    if (!type) {
      return res.status(403).json({
        success: false,
        data: [],
        message: "Reaction төрөл сонгоно уу."
      });
    }

    // Одоогийн хэрэглэгчийн reaction-г хайна
    const existingReaction = await prisma.comment_reactions.findFirst({
      where: {
        user: parseInt(user.id),
        post: parseInt(post)
      }
    });

    // Хэрэв байгаа бөгөөд адил төрлийн reaction бол устгана
    if (existingReaction && existingReaction.type === parseInt(type)) {
      await prisma.comment_reactions.delete({
        where: { id: existingReaction.id }
      });
      return res.status(200).json({
        success: true,
        data: [],
        message: "Reaction устгагдлаа."
      });
    }

    // Хэрэв байгаа бөгөөд өөр төрлийн reaction бол update хийнэ
    if (existingReaction && existingReaction.type !== parseInt(type)) {
      const updatedReaction = await prisma.comment_reactions.update({
        where: { id: existingReaction.id },
        data: { type: parseInt(type), date: new Date() }
      });
      return res.status(200).json({
        success: true,
        data: updatedReaction,
        message: "Reaction шинэчлэгдлээ."
      });
    }

    // Шинэ reaction нэмнэ
    const result = await prisma.comment_reactions.create({
      data: {
        post: parseInt(post),
        user: parseInt(user.id),
        type: parseInt(type),
        date: new Date()
      }
    });

    return res.status(200).json({
      success: true,
      data: result,
      message: "Reaction амжилттай нэмэгдлээ."
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Серверийн алдаа гарлаа. " + err
    });
  }
};

module.exports = INSERT_REACTIONS;
