const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: items } = data;
    const currentPage = page > 0 ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    
    prev = currentPage > 1 ? currentPage - 1 : 1;
    console.log(items.length)
    next = currentPage < items.length ? currentPage + 1 : null;

    return { totalItems, items, totalPages, currentPage, prev, next };
};

const getPagination = (page, size) => {
    const limit = size? +size : 30 ;
    const offset = page ? page * limit : 0;

    return {limit, offset};
}

module.exports = {
    getPagination,
    getPagingData
}