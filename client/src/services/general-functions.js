let getFormattedDate = queryDate => {
  let dd = String(queryDate.getDate()).padStart(2, "0");
  let mm = String(queryDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = queryDate.getFullYear();

  queryDate = `${yyyy}-${mm}-${dd}`;

  return queryDate;
};

let futureEventCheck = (dateFromDatabase, timeFromDatabase) => {
  if (!dateFromDatabase || !timeFromDatabase) {
    return false;
  }

  let isFutureEvent = false;
  let eventDate = new Date(dateFromDatabase);
  let eventTimeArr = timeFromDatabase.split(":");
  let hh = Number(eventTimeArr[0]);
  let mm = Number(eventTimeArr[1]);
  eventDate.setHours(hh, mm, 0);
  let currentDate = new Date();

  if (eventDate > currentDate) {
    isFutureEvent = true;
  }

  return isFutureEvent;
};

export { getFormattedDate, futureEventCheck };
