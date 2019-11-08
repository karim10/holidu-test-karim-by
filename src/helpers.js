export const getChartInfoByCountry = peopleData => {
  const groupByCountryObj = peopleData.reduce((acc, person) => {
    if (acc.hasOwnProperty(person.country)) {
      acc[person.country].totalScore = +person.score;
      acc[person.country].totalPeople++;
    } else {
      acc[person.country] = {
        totalScore: person.score,
        totalPeople: 1
      };
    }
    return acc;
  }, {});

  const groupByCountryArray = Object.keys(groupByCountryObj).map(country => ({
    country,
    score:
      groupByCountryObj[country].totalScore /
      groupByCountryObj[country].totalPeople
  }));
  return {
    chartType: "country",
    chartData: groupByCountryArray
      .sort((item1, item2) => item2.score - item1.score)
      .slice(0, 7)
  };
};

const getAverageScoreByGender = (groupByGenderObj, gender) =>
  groupByGenderObj[gender].totalScore / groupByGenderObj[gender].totalNumber;

const initAccValue = {
  totalScore: 0,
  totalNumber: 0
};

export const getChartInfoByGender = peopleData => {
  const groupByGenderObj = peopleData.reduce(
    (acc, person) => {
      if (person.gender === "Female") {
        acc.female.totalScore += person.score;
        acc.female.totalNumber++;
      } else if (person.gender === "Male") {
        acc.male.totalScore += person.score;
        acc.male.totalNumber++;
      } else {
        acc.NA.totalScore += person.score;
        acc.NA.totalNumber++;
      }
      return acc;
    },
    {
      female: { ...initAccValue },
      male: { ...initAccValue },
      NA: { ...initAccValue }
    }
  );
  const groupByGenderArray = [
    {
      gender: "Female",
      score: getAverageScoreByGender(groupByGenderObj, "female")
    },
    {
      gender: "Male",
      score: getAverageScoreByGender(groupByGenderObj, "male")
    },
    {
      gender: "NA",
      score: getAverageScoreByGender(groupByGenderObj, "NA")
    }
  ];
  return {
    chartType: "gender",
    chartData: groupByGenderArray
  };
};
