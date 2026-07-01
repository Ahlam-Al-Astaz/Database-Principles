// 1. الانتقال لقاعدة البيانات وإنشاء المجموعات (Collections)
use blog
db.createCollection("users")
db.createCollection("posts")
db.createCollection("followers")

// 2. إدخال بيانات المستخدمين الأساسيين للمشروع
db.users.insertMany([
  { name: "Sara", age: 20, email: "sara@tst.com", gender: "female" },
  { name: "Noura", age: 20, email: "noura@tst.com", gender: "female" },
  { name: "Ahmed", age: 22, email: "ahmed@tst.com", gender: "male" },
  { name: "Yasser", age: 25, email: "yasser@tst.com", gender: "male" }
])

// 3. تنظيف قاعدة البيانات وحذف أي مستخدمين قدامى خارج المشروع
db.users.deleteMany({ name: { $nin: ["Sara", "Noura", "Ahmed", "Yasser"] } })

// 4. إدخال بيانات المنشورات (Posts) وربطها بالمستخدمين عبر الـ ObjectId
db.posts.insertMany([
  {userId: ObjectId("6a454c5a517424ba8e1cb5ad"),
    title: "iOS programming",
    content: "Swift is a powerful and intuitive programming language for macOS, iOS, watchOS, tvOS and beyond"},
  {userId: ObjectId("6a454c5a517424ba8e1cb5ae"),
    title: "android programming",
    content: "you learn beginning Android programming concepts using the Kotlin programming language, and you build a variety of apps using Android Studio"},
  {userId: ObjectId("6a454c5a517424ba8e1cb5ae"),
    title: "machine learning",
    content: "Machine learning is the study of computer algorithms that improve automatically through experience"},
  {userId: ObjectId("6a454dfd517424ba8e1cb5b0"),
    title: "artificial intelligence",
    content: "Artificial intelligence, is intelligence demonstrated by machines, unlike the natural intelligence displayed by humans and animals"}
])

// 5. إدخال بيانات المتابعين (جعل Ahmed يتابع Yasser)
db.followers.insertOne({
  followerId: ObjectId("6a454c5a517424ba8e1cb5af"),
  followingId: ObjectId("6a454dfd517424ba8e1cb5b0")
})

// 6. تحديث إيميل المستخدم Yasser
db.users.updateOne({ name: "Yasser" }, { $set: { email: "yasser@gmail.com" } })

// 7. الاستعلامات وعمليات الفلترة (Queries)
// عرض جميع المستخدمين بشكل منظم وبدون الـ _id
db.users.find({}, { name: 1, email: 1, age: 1, _id: 0 })

// البحث عن المنشورات التي تحتوي على كلمة programming
db.posts.find({ title: /programming/i })

// استعلام عن المستخدمين الذين تزيد أعمارهم عن 21 عاماً
db.users.find({ age: { $gt: 21 } })
