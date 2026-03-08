const handleSearch = (event) => {
  event.preventDefault();
  
  const searchText = document.getElementById("search-input").value.toLowerCase();

  const filtered = allIssues.filter((issue) =>
    issue.title.toLowerCase().includes(searchText)
  );

  document.getElementById("count").textContent = filtered.length;
  displayIssues(filtered);
};