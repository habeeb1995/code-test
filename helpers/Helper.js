class Helper {
  getPageList(totalPages, page, maxLength) {
    if (maxLength < 5) throw new Error('maxLength must be at least 5');

    function range(start, end) {
      return Array.from(Array(end - start + 1), (_, i) => i + start);
    }

    const sideWidth = 2;
    const leftWidth = 2;
    const rightWidth = 2;
    if (totalPages <= maxLength) {
      // no breaks in list
      return range(1, totalPages);
    }

    if (page <= 6) {
      // no break on left of page
      return range(1, maxLength - sideWidth - 1)
        .concat([0])
        .concat(range(totalPages - sideWidth + 1, totalPages));
    }

    if (page >= totalPages - sideWidth - 1 - rightWidth) {
      // no break on right of page
      return range(1, sideWidth)
        .concat([0])
        .concat(
          range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
        );
    }

    // Breaks on both sides
    return range(1, sideWidth)
      .concat([0])
      .concat(range(page - leftWidth, page - leftWidth + 4))
      .concat([0])
      .concat(range(totalPages - sideWidth + 1, totalPages));
  }
}

module.exports = new Helper();
