

export const formatDate = (date) => {
    const dateObj = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString(undefined, options);
};

export const extractTime = (createdAt) => {
    const dateObj = new Date(createdAt);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
   
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes }`;
    return formattedTime;
};


