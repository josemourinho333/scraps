export const DOTS = "...";

function usePagination(currentPage: number, totalListings: number, pageSize: number) {
  const totalPagesRequired = Math.ceil(totalListings/pageSize);

  if (totalPagesRequired === 1) {
    return [currentPage];
  };

  if (totalPagesRequired === 2) {
    return [1, 2];
  }

  if (currentPage === 1) {
    return [currentPage, currentPage + 1, currentPage + 2, DOTS, totalPagesRequired];
  };

  if (currentPage === 2) {
    return [currentPage - 1, currentPage, currentPage + 1, DOTS, totalPagesRequired];
  };

  if (currentPage > 2 && currentPage < totalPagesRequired -1) {
    return [1, DOTS, currentPage - 1, currentPage, currentPage + 1, DOTS, totalPagesRequired]
  };

  if (currentPage === totalPagesRequired - 1) {
    return [1, DOTS, currentPage -1, currentPage, totalPagesRequired];
  };

  if (currentPage === totalPagesRequired) {
    return [1, DOTS, currentPage - 2, currentPage - 1, currentPage]
  };
  
}

export default usePagination;