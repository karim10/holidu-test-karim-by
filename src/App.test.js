import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import ScoreTable from './ScoreTable';
import { getSortedTable, getChartDataByCountry, getChartDataByGender } from './helpers';
import {
    mockPopleDataWithLength3,
    mockPeopleDataSortedAscByFirstNameWithLength3,
    mockPopleDataSortedDescByScoreWithLength3,
    mockPeopleDataWithLength10,
    mockChartDataGroupedByGender,
    mockAverageScoreByCountry
} from './mocks';
import Chart from './Chart';
import { TableSortLabel } from '@material-ui/core';

// configuration
configure({ adapter: new Adapter() });
function createNodeMock() {
    const doc = document.implementation.createHTMLDocument();
    return { parentElement: doc.body };
}

describe('tests rendering', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(init => [init, setState]);
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('renders ScoreTable', () => {
        const component = renderer.create(<ScoreTable peopleData={mockPeopleDataWithLength10} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('renders Chart grouped by gender', () => {
        const component = renderer.create(
            <Chart chartType={'gender'} chartData={mockChartDataGroupedByGender} />,
            { createNodeMock }
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    it('calls handleSorting when header cell is clicked', () => {
        const component = mount(<ScoreTable peopleData={mockPeopleDataWithLength10} />);
        component
            .find(TableSortLabel)
            .findWhere(tsl => tsl.props().sortingkey === 'last_name')
            .first()
            .simulate('click');
        expect(setState).toHaveBeenCalled();
    });
});

describe('tests helpers functions', () => {
    it('sorts people data', () => {
        expect(
            getSortedTable(mockPopleDataWithLength3, {
                orderDirection: 'asc',
                orderBy: 'first_name',
                isNumeric: false
            })
        ).toEqual(mockPeopleDataSortedAscByFirstNameWithLength3);
        expect(
            getSortedTable(mockPopleDataWithLength3, {
                orderDirection: 'desc',
                orderBy: 'score',
                isNumeric: true
            })
        ).toEqual(mockPopleDataSortedDescByScoreWithLength3);
    });

    // it('caculates average score by country', () => {
    //     expect(getChartDataByCountry(mockPeopleDataWithLength10)).toEqual(
    //         mockAverageScoreByCountry
    //     );
    // });
    it('caculates average score by gender', () => {
        expect(getChartDataByGender(mockPeopleDataWithLength10)).toEqual(
            mockChartDataGroupedByGender
        );
    });
});
