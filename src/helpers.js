export const getChartDataByCountry = peopleData => {
    const groupByCountryObj = peopleData.reduce((acc, person) => {
        if (acc.hasOwnProperty(person.country)) {
            acc[person.country].totalScore = +person.score;
            acc[person.country].totalPeople++;
        } else {
            acc[person.country] = { totalScore: person.score, totalPeople: 1 };
        }
        return acc;
    }, {});

    const groupByCountryArray = Object.keys(groupByCountryObj).map(country => ({
        country,
        score: groupByCountryObj[country].totalScore / groupByCountryObj[country].totalPeople
    }));
    return groupByCountryArray;
};

const getAverageScoreByGender = (groupByGenderObj, gender) =>
    groupByGenderObj[gender].totalScore / groupByGenderObj[gender].totalPeople;

const initAccValue = {
    totalScore: 0,
    totalPeople: 0
};

export const getChartDataByGender = peopleData => {
    const groupByGenderObj = peopleData.reduce(
        (acc, person) => {
            if (person.gender === 'Female') {
                acc.female.totalScore += person.score;
                acc.female.totalPeople++;
            } else if (person.gender === 'Male') {
                acc.male.totalScore += person.score;
                acc.male.totalPeople++;
            } else {
                acc.NA.totalScore += person.score;
                acc.NA.totalPeople++;
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
            gender: 'Female',
            score: getAverageScoreByGender(groupByGenderObj, 'female')
        },
        {
            gender: 'Male',
            score: getAverageScoreByGender(groupByGenderObj, 'male')
        },
        {
            gender: 'NA',
            score: getAverageScoreByGender(groupByGenderObj, 'NA')
        }
    ];
    return groupByGenderArray;
};

// compares two strings with omitting null values
function compareStrings(item1, item2, orderDirection, orderBy) {
    if (item1[orderBy] === item2[orderBy]) {
        return 0;
    } else if (item1[orderBy] === null) {
        return 1;
    } else if (item2[orderBy] === null) {
        return -1;
    } else if (orderDirection === 'asc') {
        return item1[orderBy].toLowerCase() < item2[orderBy].toLowerCase() ? 1 : -1;
    } else {
        return item1[orderBy].toLowerCase() < item2[orderBy].toLowerCase() ? -1 : 1;
    }
}

function compareNumericals(item1, item2, orderDirection, orderBy) {
    return orderDirection === 'asc'
        ? item1[orderBy] - item2[orderBy]
        : item2[orderBy] - item1[orderBy];
}

export function getSortedTable(peopleData, { orderDirection, orderBy, isNumeric }) {
    return peopleData.sort((item1, item2) =>
        isNumeric
            ? compareNumericals(item1, item2, orderDirection, orderBy)
            : compareStrings(item1, item2, orderDirection, orderBy)
    );
}
const fileteringAttributes = ['first_name', 'last_name', 'gender', 'city', 'country', 'score'];
export function getFilteredTable(peopleData, queryInput) {
    return peopleData.filter(person =>
        Object.keys(person).reduce((acc, att) => {
            if (person[att] === null || fileteringAttributes.indexOf(att) === -1) {
                return acc;
            }
            acc =
                person[att]
                    .toString()
                    .toLowerCase()
                    .indexOf(queryInput.toLowerCase()) !== -1
                    ? true
                    : acc;
            return acc;
        }, false)
    );
}
