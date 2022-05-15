exports.pick = (req) => {
  const { page, limit, select } = req.query;
  const selectRegex = select ? select.replace(/,/g, " ") : "";
  return {
    limit: +limit,
    page: +page,
    select: selectRegex,
    lern: true,
    populate: [
      {
        path: "author_detail",
        select: "name email -_id",
      },
      {
        path: "category",
        select: "name description -_id",
      },
    ],
  };
};
