export const formatDateTime = (isoDateString) => {
    const date = new Date(isoDateString);
  
    // Format the date as DD.MM.YYYY
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
  
    // Format the time as HH:MM
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
  
    //   return `${day}.${month}.${year}, ${hours}:${minutes}`;
    return `${day}.${month}.${year}`;
  };
  