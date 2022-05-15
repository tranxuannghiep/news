const render = (res) => {
  $("table tbody").empty();
  $(".pagination").empty();
  res.data.forEach((val) => {
    $("table tbody").append(`
        <tr>
          <td>${val.id}</td>
          <td>${val.title}</td>
          <td>${val.price}</td>
        </tr>
    `);
  });
  for (i = 0; i < res.paginate.totalPages; i++) {
    $(".pagination").append(`
      <button data-page=${i + 1}>${i + 1}</button>
      `);
  }
};

const loadBooks = (page = 1) => {
  const url = `http://localhost:3000/api/v1/book?page=${page}&limit=2`;
  $.get(url, (res) => {
    render(res);
  });
};

$(document).on("click", ".pagination button", function () {
  const page = $(this).data("page");
  loadBooks(page);
});

loadBooks();
