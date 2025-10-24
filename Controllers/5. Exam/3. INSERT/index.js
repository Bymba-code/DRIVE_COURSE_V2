const prisma = require("../../../Middlewares/prisma");

const INSERT_EXAM = async (req, res) => {
  try {
    const { category, testNumber } = req.body;

    if (!category) {
      return res.status(403).json({
        success: false,
        data: [],
        message: "Жолооны ангилал алга байна.",
      });
    }

    if (!testNumber || isNaN(testNumber) || parseInt(testNumber) <= 0) {
      return res.status(400).json({
        success: false,
        data: [],
        message: "Хүссэн тестийн тоо буруу байна.",
      });
    }

    const parsedCategory = parseInt(category);
    const totalTestsNeeded = parseInt(testNumber);

    const isCategory = await prisma.category.findFirst({
      where: { id: parsedCategory },
    });

    if (!isCategory) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "Жолооны ангилал байхгүй байна.",
      });
    }

    let selectedTests = [];
    let selectedTestIds = new Set();

    // 🎯 ТУСГАЙ НӨХЦӨЛ: category === 11
    if (parsedCategory === 11) {
      if (totalTestsNeeded !== 20) {
        return res.status(400).json({
          success: false,
          data: [],
          message: "Ангилал 11 зөвхөн 20 тесттэй байж болно.",
        });
      }

      const testRanges = [
        { testNum: 1, ranges: [[257, 296]] },
        { testNum: 2, ranges: [[297, 336]] },
        { testNum: 3, ranges: [[337, 373], [379, 381]] },
        { testNum: 4, ranges: [[382, 422]] },
        { testNum: 5, ranges: [[423, 464]] },
        { testNum: 6, ranges: [[465, 504]] },
        { testNum: 7, ranges: [[505, 544]] },
        { testNum: 8, ranges: [[545, 584]] },
        { testNum: 9, ranges: [[585, 624]] },
        { testNum: 10, ranges: [[625, 664]] },
        { testNum: 11, ranges: [[665, 704]] },
        { testNum: 12, ranges: [[705, 744]] },
        { testNum: 13, ranges: [[745, 784]] },
        { testNum: 14, ranges: [[785, 824]] },
        { testNum: 15, ranges: [[825, 864]] },
        { testNum: 16, ranges: [[865, 904]] },
        { testNum: 17, ranges: [[905, 944]] },
        { testNum: 18, ranges: [[945, 984]] },
        { testNum: 19, ranges: [[985, 1024]] },
        { testNum: 20, ranges: [[1025, 1064]] },
      ];

      const missingTests = [];

      for (const { testNum, ranges } of testRanges) {
        const conditions = ranges.map(([min, max]) => 
          `(id BETWEEN ${min} AND ${max})`
        ).join(' OR ');

        const query = `
          SELECT * FROM test
          WHERE (${conditions})
          AND category = ${parsedCategory}
          ORDER BY RAND()
          LIMIT 1
        `;

        const tests = await prisma.$queryRawUnsafe(query);

        if (tests.length > 0) {
          if (!selectedTestIds.has(tests[0].id)) {
            selectedTests.push(tests[0]);
            selectedTestIds.add(tests[0].id);
          }
        } else {
          // Range-д тест олдоогүй бол бүртгэх
          const rangeStr = ranges.map(([min, max]) => `${min}-${max}`).join(', ');
          missingTests.push(`Тест №${testNum} (${rangeStr})`);
        }
      }

      // Хэрэв зарим range-ээс тест олдоогүй бол мэдэгдэх
      if (missingTests.length > 0) {
        console.warn('⚠️ Дараах range-үүдэд category=11-тэй тест байхгүй:');
        console.warn(missingTests.join('\n'));
      }

      // Хэрэв 20 тест олдоогүй бол алдаа буцаах
      if (selectedTests.length < 20) {
        return res.status(400).json({
          success: false,
          data: [],
          message: `Ангилал 11-д хангалттай тест олдсонгүй. Олдсон: ${selectedTests.length}/20. Дутуу range: ${missingTests.join(', ')}`,
        });
      }

    } else {
      // 🧠 БУСАД АНГИЛЛЫН ЛОГИК
      const topics = await prisma.topic.findMany({
        where: { category: parsedCategory },
      });

      if (topics.length === 0) {
        return res.status(404).json({
          success: false,
          data: [],
          message: "Холбогдох сэдэв байхгүй байна.",
        });
      }

      const shuffledTopics = [...topics].sort(() => Math.random() - 0.5);
      const testsPerTopic = Math.floor(totalTestsNeeded / shuffledTopics.length);
      const remainingTests = totalTestsNeeded % shuffledTopics.length;

      // 1-р шат
      for (let i = 0; i < shuffledTopics.length; i++) {
        const topic = shuffledTopics[i];
        const testsToTake = testsPerTopic + (i < remainingTests ? 1 : 0);
        if (testsToTake === 0) continue;

        let query = `
          SELECT * FROM test
          WHERE topic = ${topic.id}
          AND category = ${parsedCategory}
        `;

        if (selectedTestIds.size > 0) {
          query += ` AND id NOT IN (${Array.from(selectedTestIds).join(',')})`;
        }

        query += ` ORDER BY RAND() LIMIT ${testsToTake}`;

        const tests = await prisma.$queryRawUnsafe(query);

        for (const test of tests) {
          if (!selectedTestIds.has(test.id)) {
            selectedTests.push(test);
            selectedTestIds.add(test.id);
          }
        }
      }

      // 2-р шат: нэмэлт авах
      let attemptCount = 0;
      const maxAttempts = shuffledTopics.length * 2;

      while (selectedTests.length < totalTestsNeeded && attemptCount < maxAttempts) {
        const retryTopics = [...shuffledTopics].sort(() => Math.random() - 0.5);

        for (const topic of retryTopics) {
          if (selectedTests.length >= totalTestsNeeded) break;

          let query = `
            SELECT * FROM test
            WHERE topic = ${topic.id}
            AND category = ${parsedCategory}
          `;

          if (selectedTestIds.size > 0) {
            query += ` AND id NOT IN (${Array.from(selectedTestIds).join(',')})`;
          }

          query += ` ORDER BY RAND() LIMIT 1`;

          const tests = await prisma.$queryRawUnsafe(query);

          if (tests.length > 0 && !selectedTestIds.has(tests[0].id)) {
            selectedTests.push(tests[0]);
            selectedTestIds.add(tests[0].id);
          }
        }

        attemptCount++;
      }

      // 3-р шат: fallback
      if (selectedTests.length < totalTestsNeeded) {
        const needed = totalTestsNeeded - selectedTests.length;

        let query = `
          SELECT * FROM test
          WHERE category = ${parsedCategory}
        `;

        if (selectedTestIds.size > 0) {
          query += ` AND id NOT IN (${Array.from(selectedTestIds).join(',')})`;
        }

        query += ` ORDER BY RAND() LIMIT ${needed}`;

        const tests = await prisma.$queryRawUnsafe(query);

        for (const test of tests) {
          if (!selectedTestIds.has(test.id)) {
            selectedTests.push(test);
            selectedTestIds.add(test.id);
          }
        }
      }

      if (selectedTests.length < totalTestsNeeded) {
        return res.status(400).json({
          success: false,
          data: [],
          message: `Хангалттай тест олдсонгүй. Шаардлагатай: ${totalTestsNeeded}, Олдсон: ${selectedTests.length}`,
        });
      }
    }

    // 🎯 Эцэст нь: шалгалт үүсгэж, тестүүдийг холбоно
    // Тестүүдийг ID-ийн дарааллаар эрэмбэлэх (санамсаргүй холих биш)
    selectedTests = selectedTests.sort((a, b) => a.id - b.id);

    const newExam = await prisma.exam.create({
      data: {
        user: req.user.id,
        isMake: 0,
        date: new Date(),
      },
    });

    const examTests = selectedTests.map((test) => ({
      exam: newExam.id,
      test: test.id,
      answer: null,
    }));

    await prisma.exam_test.createMany({ data: examTests });

    return res.status(200).json({
      success: true,
      data: {
        exam: newExam,
        tests: selectedTests,
      },
      message: "Амжилттай шалгалт үүсгэлээ.",
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      data: [],
      message: "Серверийн алдаа гарлаа: " + err.message,
    });
  }
};

module.exports = INSERT_EXAM;