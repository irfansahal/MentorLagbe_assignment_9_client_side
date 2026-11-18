
const categories = [
    { name: "Science", subjects: ["Physics", "Chemistry", "Biology"] },
    { name: "Mathematics", subjects: ["General Math", "Higher Math"] },
    { name: "Languages", subjects: ["English", "Bangla", "Arabic"] },
    { name: "Computer & IT", subjects: ["Programming", "Web Development", "Networking"] },
    { name: "Business", subjects: ["Accounting", "Finance", "Economics"] },
    { name: "Humanities", subjects: ["History", "Geography", "Civics"] },
    { name: "Admission Preparation", subjects: ["University Admission", "Medical", "Engineering"] },
    { name: "Professional Skills", subjects: ["Graphic Design", "Digital Marketing", "Communication"] },
    { name: "Test Preparation", subjects: ["IELTS", "TOEFL"] },
    { name: "Others", subjects: ["ICT", "Statistics"] },
]

const SebjectSection = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16">
            {/* Section heading */}
            <h2 className="text-center text-3xl font-bold text-black sm:text-4xl">
                Browse Subjects by Category
            </h2>

            {/* Cards */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categories.map((category) => (
                    <div
                        key={category.name}
                        className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
                    >
                        {/* Category heading */}
                        <h3 className="text-lg font-bold text-[#fb9d06]">{category.name}</h3>

                        {/* Subheadings (subjects under this category) */}
                        <ul className="mt-4 flex flex-col gap-2">
                            {category.subjects.map((subject) => (
                                <li key={subject} className="text-sm font-semibold text-zinc-700">
                                    {subject}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default SebjectSection
