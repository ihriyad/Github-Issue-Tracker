const filterCards = (status) => {
  let filtered;
  if (status === "all") {
    filtered = allIssues;
  } else {
    filtered = allIssues.filter((issue) => issue.status === status);
  }

  // update count
  document.getElementById("count").textContent = filtered.length;

  displayIssues(filtered);
};
