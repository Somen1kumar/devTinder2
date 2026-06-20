export const getCookie = (key) => {
  let cookieName = document?.cookie?.match(
    "(^|;)\\s*" + key + "\\s*=\\s*([^;]+)",
  );
  return cookieName ? cookieName.pop() : "";
};

export const createObjectWithTimeStamp = (prevData) => {
  const sortData = prevData.reduce((acc,curr) => {
            const currentDay = new Date(curr.id).toLocaleDateString('en-GB');
            if(!acc[currentDay]) {
                acc[currentDay] = []
            }
            acc[currentDay].push(curr);
            return acc;

        },{});
    return sortedData(sortData);
}

export const sortedData = (data) => {
  const sortedData = Object.fromEntries(
    Object.entries(data).sort(
      ([dateA], [dateB]) => new Date(dateA) - new Date(dateB)
    )
  );
  return sortedData;
}