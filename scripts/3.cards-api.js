const priorityStyles = {
  high: { classes: "bg-red-50 text-red-500 border-red-200", text: "HIGH" },
  medium: {
    classes: "bg-yellow-50 text-yellow-500 border-yellow-200",
    text: "MEDIUM",
  },
  low: { classes: "bg-gray-100 text-gray-400 border-gray-200", text: "LOW" },
};

const statusStyles = {
  open: {
    img: "./assets/Open-Status.png",
    topBar: "border-t-4 border-green-400",
  },
  closed: {
    img: "./assets/closed.png",
    topBar: "border-t-4 border-purple-400",
  },
};

const labelStyles = {
  bug: {
    classes: "bg-red-50 text-red-500 border-none",
    icon: `<i class="fa-solid fa-bug"></i>`,
  },
  "help wanted": {
    classes: "bg-yellow-50 text-yellow-500 border-none",
    icon: `<i class="fa-solid fa-life-ring"></i>`,
  },
  enhancement: {
    classes: "bg-blue-100 text-blue-500 border-none",
    icon: `<i class="fa-solid fa-wand-magic-sparkles"></i>`,
  },
  documentation: {
    classes: "bg-gray-100 text-gray-500 border-none",
    icon: `<i class="fa-solid fa-chalkboard"></i>`,
  },
  "good first issue": {
    classes: "bg-green-100 text-green-500 border-none",
    icon: `<i class="fa-solid fa-star"></i>`,
  },
};

const renderLabels = (labels) => {
  let html = "";

  labels.forEach((label) => {
    let style;
    if (labelStyles[label]) {
      style = labelStyles[label];
    }

    html += `
      <span class="flex items-center gap-1.5 ${style.classes} border text-xs font-semibold px-3 py-1 rounded-full">
        ${style.icon}
        ${label.toUpperCase()}
      </span>
    `;
  });

  return html;
};

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

let allIssues = [];

const loadCards = async () => {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const json = await res.json();
  allIssues = json.data;
  filterCards("all");
};

const displayIssues = (cards) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  cards.forEach((issue) => {
    const priority = priorityStyles[issue.priority] || priorityStyles.low;
    const status = statusStyles[issue.status] || statusStyles.closed;

    const card = document.createElement("div");
    card.style.cursor = "pointer";
    card.onclick = () => openModal(issue.id);
    card.innerHTML = `
      <div class="bg-white rounded-2xl  shadow-sm overflow-hidden w-full h-full flex flex-col ${status.topBar}">
        <div class="p-5 flex flex-col flex-1">

          <!-- Status + Priority -->
          <div class="flex items-center justify-between mb-4">
            <img src="${status.img}" alt="" class="w-7 h-7" />
            <span class="text-xs font-semibold px-3 py-1 rounded-full border ${priority.classes} tracking-wide">
              ${priority.text}
            </span>
          </div>

          <!-- Title -->
          <h2 class="text-gray-900 font-bold text-lg leading-snug mb-2">
            ${issue.title}
          </h2>

          <!-- Description -->
          <p class="text-gray-500 text-sm leading-relaxed mb-4">
            ${issue.description}
          </p>

          <!-- Labels -->
          <div class="flex flex-wrap gap-2 mb-5">
            ${renderLabels(issue.labels)}
          </div>

          <!-- author -->
          <div class="border-t border-gray-100 mt-auto pt-4 flex flex-col gap-1 text-gray-400 text-sm">
            <span>#${issue.id} by <span class="text-gray-600 font-medium">${issue.author}</span></span>
            <span>${formatDate(issue.createdAt)}</span>
          </div>

        </div>
      </div>
    `;
    cardContainer.append(card);
  });
};

loadCards();
