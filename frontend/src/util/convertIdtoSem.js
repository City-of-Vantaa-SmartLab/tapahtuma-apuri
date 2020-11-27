const convertIdToSem = (
  question_ordinal_first,
  question_ordinal_second,
  question_ordinal_third
) => `
    ${question_ordinal_first}.${
  question_ordinal_second ? `${question_ordinal_second}.` : ""
}${question_ordinal_third ? `${question_ordinal_third}.` : ""}
`;

export default convertIdToSem;
