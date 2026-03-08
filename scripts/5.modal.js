const openModal = async (id) => {
  document.getElementById("modal").classList.remove("hidden");
  //spinner here
  document.getElementById("modal-content").innerHTML = `
    <div class="flex items-center justify-center py-10">
      <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  `;

  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const json = await res.json();
  const issue = json.data;

  const priority = priorityStyles[issue.priority] || priorityStyles.low;
  const status = statusStyles[issue.status] || statusStyles.closed;

  document.getElementById("modal-content").innerHTML = `
    <h2 class="text-xl font-bold text-gray-900 mb-3">${issue.title}</h2>

    <div class="flex items-center gap-2 mb-3 text-sm text-gray-500">
      <img src="${status.img}" class="w-5 h-5" />
      <span>${issue.status.toUpperCase()}</span>
      <span>•</span>
      <span class="text-black">Opened by ${issue.author}</span>
      <span>•</span>
      <span>${formatDate(issue.createdAt)}</span>
    </div>

    <div class="flex flex-wrap gap-2 mb-4">
      ${renderLabels(issue.labels)}
    </div>

    <p class="text-gray-600 text-sm leading-relaxed mb-4">${issue.description}</p>

    <div class="bg-gray-50 rounded-xl p-4 flex gap-6 text-sm">
      <div>
        <p class="text-gray-400 mb-1">Assignee:</p>
        <p class="font-semibold text-gray-800">${issue.assignee || "Unassigned"}</p>
      </div>
      <div>
        <p class="text-gray-400 mb-1">Priority:</p>
        <span class="text-xs font-bold px-3 py-1 rounded-full border ${priority.classes}">${priority.text}</span>
      </div>
    </div>
  `;
};

const closeModal = () => {
  document.getElementById("modal").classList.add("hidden");
};
