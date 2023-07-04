function useSortByDay(arr) {
    arr.sort(function (a, b) {
        if (a[1][2]) {
          if (a[1][2] > b[1][2]) {
            return 1;
          } else if (a[1][2] < b[1][2]) {
            return -1;
          };
        } else {
          if (a[1][1] > b[1][2]) {
            return 1;
          } else if (a[1][1] < b[1][2]) {
            return -1;
          };
        };
      });
};
export default useSortByDay;