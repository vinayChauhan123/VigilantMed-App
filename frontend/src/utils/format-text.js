// eg. we have a string "HeartDisease"
// we want to display "Heart Disease"

export const formatText = (text) => {
  return text.replace(/([A-Z])/g, " $1").trim();
};

