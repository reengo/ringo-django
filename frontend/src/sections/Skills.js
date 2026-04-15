function pick5(arr, pinned = []) {
  const rest = arr.filter((item) => !pinned.includes(item));
  const random = [...rest].sort(() => Math.random() - 0.5).slice(0, 5 - pinned.length);
  return [...pinned, ...random];
}

function Skills() {
  const groups = [
    {
      label: "Languages",
      items: ["Python", "JavaScript", "Java", "PHP", "SQL", "Swift", "Dart", "Objective-C", "Golang", "HTML / CSS"],
    },
    {
      label: "Frameworks & Libraries",
      items: ["Django", "NestJS", "React", "Node.js", "FastAPI", "TailwindCSS", "NextJS", "Vue / Nuxt", "Express", "Spring Boot"],
    },
    {
      label: "Infrastructure",
      items: ["Docker", "Kubernetes", "PostgreSQL", "Apache2 / Nginx", "Terraform", "Git", "AWS", "Google Cloud", "CI/CD", "Digital Ocean"],
    },
    {
      label: "Leadership",
      items: ["Engineering Management", "System Architecture", "Product Strategy", "Technical Documentation", "Compliance & Governance", "Mentorship", "Mobile Technology", "Platform Engineering", "Security-First Development", "Continuous Quality Engineering"],
    },
  ];

  return (
    <div className="bg-slate-950 py-20 sm:py-60">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <span className="mb-2 block text-sm font-semibold text-orange-400">What I Work With</span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">Skills & Stack</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => (
            <div key={group.label}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-4">
                {group.label}
              </h3>
              <ul className="flex flex-col gap-2">
                {pick5(
                    group.items,
                    group.label === "Languages" ? ["Python", "JavaScript", "PHP"] : []
                  ).map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;
