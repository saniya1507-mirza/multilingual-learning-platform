require('dotenv').config();

const mongoose = require('mongoose');
const db = require('./config/db');
const User = require('./models/User');
const Course = require('./models/Course');
const Lesson = require('./models/Lesson');
const Quiz = require('./models/Quiz');

const DEMO_COURSE_TITLES = [
  'MLP Demo: Everyday English',
  'MLP Demo: Foundations of Biology',
  'MLP Demo: Practical Mathematics'
];

const translations = (hi, ur, te) => ({
  hi: { text: hi, provider: 'seed' },
  ur: { text: ur, provider: 'seed' },
  te: { text: te, provider: 'seed' }
});

const demoCourses = [
  {
    title: DEMO_COURSE_TITLES[0],
    descriptionOriginal: 'Build useful English vocabulary and conversation skills for everyday situations.',
    lessons: [
      {
        title: 'Greetings and Introductions',
        contentOriginal: 'Learn how to greet people, introduce yourself, and ask someone their name.',
        contentTranslations: translations(
          'लोगों का अभिवादन करना, अपना परिचय देना और किसी का नाम पूछना सीखें।',
          'لوگوں کو سلام کرنا، اپنا تعارف کرانا اور کسی کا نام پوچھنا سیکھیں۔',
          'ప్రజలను పలకరించడం, మిమ్మల్ని పరిచయం చేసుకోవడం మరియు పేరు అడగడం నేర్చుకోండి.'
        ),
        questions: [
          {
            text: 'Which phrase is a polite greeting?',
            choices: ['Good morning', 'Go away', 'No thanks', 'See you yesterday'],
            correctAnswer: 0,
            explanation: 'Good morning is a polite greeting.'
          }
        ]
      },
      {
        title: 'Daily Routines',
        contentOriginal: 'Practice describing common daily activities using simple present-tense sentences.',
        contentTranslations: translations(
          'सरल वर्तमान काल के वाक्यों से रोज़मर्रा की गतिविधियों का वर्णन करना सीखें।',
          'سادہ حال کے جملوں کے ذریعے روزمرہ کی سرگرمیوں کو بیان کرنا سیکھیں۔',
          'సాధారణ వర్తమాన కాల వాక్యాలతో రోజువారీ పనులను వివరించడం సాధన చేయండి.'
        ),
        questions: [
          {
            text: 'Which sentence describes a routine?',
            choices: ['I wake up at seven.', 'I woke up yesterday.', 'I will wake up tomorrow.', 'Wake up!'],
            correctAnswer: 0,
            explanation: 'The simple present commonly describes routines.'
          },
          {
            text: 'Choose the correct verb: She ___ breakfast every day.',
            choices: ['eat', 'eats', 'eating', 'ate'],
            correctAnswer: 1,
            explanation: 'With she, the present-tense verb is eats.'
          }
        ]
      }
    ]
  },
  {
    title: DEMO_COURSE_TITLES[1],
    descriptionOriginal: 'Explore cells, ecosystems, and the living systems around us.',
    lessons: [
      {
        title: 'Cells and Organelles',
        contentOriginal: 'Cells are the basic units of life. Organelles perform specialized jobs inside cells.',
        contentTranslations: translations(
          'कोशिकाएँ जीवन की मूल इकाइयाँ हैं। कोशिकांग कोशिकाओं के अंदर विशेष कार्य करते हैं।',
          'خلیے زندگی کی بنیادی اکائیاں ہیں۔ عضیے خلیوں کے اندر مخصوص کام انجام دیتے ہیں۔',
          'కణాలు జీవితం యొక్క ప్రాథమిక యూనిట్లు. కణాంగాలు కణాల లోపల ప్రత్యేక పనులు చేస్తాయి.'
        ),
        questions: [
          {
            text: 'What is the basic unit of life?',
            choices: ['Cell', 'Rock', 'Cloud', 'River'],
            correctAnswer: 0,
            explanation: 'The cell is the basic unit of life.'
          }
        ]
      },
      {
        title: 'Food Chains',
        contentOriginal: 'A food chain shows how energy moves from producers to consumers in an ecosystem.',
        contentTranslations: translations(
          'खाद्य श्रृंखला दिखाती है कि पारिस्थितिकी तंत्र में ऊर्जा उत्पादकों से उपभोक्ताओं तक कैसे जाती है।',
          'غذائی زنجیر دکھاتی ہے کہ ماحولیاتی نظام میں توانائی پیدا کرنے والوں سے صارفین تک کیسے جاتی ہے۔',
          'ఆహార గొలుసు పర్యావరణ వ్యవస్థలో శక్తి ఉత్పత్తిదారుల నుండి వినియోగదారులకు ఎలా వెళ్తుందో చూపిస్తుంది.'
        ),
        questions: [
          {
            text: 'Which organism is usually a producer?',
            choices: ['Plant', 'Wolf', 'Hawk', 'Mushroom'],
            correctAnswer: 0,
            explanation: 'Plants produce food using sunlight.'
          }
        ]
      }
    ]
  },
  {
    title: DEMO_COURSE_TITLES[2],
    descriptionOriginal: 'Strengthen your understanding of variables, equations, and everyday problem solving.',
    lessons: [
      {
        title: 'Variables and Expressions',
        contentOriginal: 'A variable represents an unknown value, and an expression combines numbers and operations.',
        contentTranslations: translations(
          'चर अज्ञात मान को दर्शाता है और व्यंजक संख्याओं तथा संक्रियाओं को मिलाता है।',
          'متغیر ایک نامعلوم قدر کی نمائندگی کرتا ہے، جبکہ عبارت اعداد اور عملیات کو ملاتی ہے۔',
          'చరరాశి తెలియని విలువను సూచిస్తుంది, మరియు వ్యక్తీకరణ సంఖ్యలు, క్రియలను కలుపుతుంది.'
        ),
        questions: [
          {
            text: 'What can a variable represent?',
            choices: ['An unknown value', 'Only zero', 'A punctuation mark', 'A color'],
            correctAnswer: 0,
            explanation: 'A variable can represent an unknown value.'
          }
        ]
      },
      {
        title: 'Solving Simple Equations',
        contentOriginal: 'Use inverse operations to find the value of a variable in a simple equation.',
        contentTranslations: translations(
          'सरल समीकरण में चर का मान ज्ञात करने के लिए विपरीत संक्रियाओं का उपयोग करें।',
          'سادہ مساوات میں متغیر کی قدر معلوم کرنے کے لیے الٹی عملیات استعمال کریں۔',
          'సాధారణ సమీకరణంలో చరరాశి విలువను కనుగొనడానికి విలోమ క్రియలను ఉపయోగించండి.'
        ),
        questions: [
          {
            text: 'What is x if x + 3 = 8?',
            choices: ['3', '5', '8', '11'],
            correctAnswer: 1,
            explanation: 'Subtract 3 from both sides to get x = 5.'
          },
          {
            text: 'Which operation reverses multiplication?',
            choices: ['Addition', 'Subtraction', 'Division', 'Squaring'],
            correctAnswer: 2,
            explanation: 'Division is the inverse of multiplication.'
          }
        ]
      }
    ]
  }
];

async function seed() {
  await db.connect();

  const author = await User.findOne().sort({ createdAt: 1, _id: 1 });
  if (!author) throw new Error('No registered user exists. Register a user before running the seed.');

  const oldCourses = await Course.find({ title: { $in: DEMO_COURSE_TITLES } }).select('_id');
  const oldCourseIds = oldCourses.map(course => course._id);
  const oldLessons = oldCourseIds.length
    ? await Lesson.find({ courseId: { $in: oldCourseIds } }).select('_id')
    : [];
  const oldLessonIds = oldLessons.map(lesson => lesson._id);

  if (oldLessonIds.length) await Quiz.deleteMany({ lessonId: { $in: oldLessonIds } });
  if (oldCourseIds.length) await Lesson.deleteMany({ courseId: { $in: oldCourseIds } });
  if (oldCourseIds.length) await Course.deleteMany({ _id: { $in: oldCourseIds } });

  for (const courseData of demoCourses) {
    const course = await Course.create({
      title: courseData.title,
      descriptionOriginal: courseData.descriptionOriginal,
      authorId: author._id,
      languageOriginal: 'en',
      languagesAvailable: ['en', 'hi', 'ur', 'te'],
      published: true,
      lessons: []
    });

    for (const [index, lessonData] of courseData.lessons.entries()) {
      const lesson = await Lesson.create({
        courseId: course._id,
        title: lessonData.title,
        contentOriginal: lessonData.contentOriginal,
        contentTranslations: lessonData.contentTranslations,
        order: index + 1
      });

      await Quiz.create({
        lessonId: lesson._id,
        title: `${lesson.title} Quiz`,
        questions: lessonData.questions
      });

      course.lessons.push(lesson._id);
    }

    await course.save();
  }

  console.log(`Seeded ${demoCourses.length} demo courses for ${author.email}.`);
}

seed()
  .catch(error => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
