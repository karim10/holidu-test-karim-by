import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';

import App from './App';
import ScoreTable, { columnsDetails } from './ScoreTable';
import Chart from './Chart';
import VirtualizedTable from './VirtualizedTable';
import { getSortedTable, getChartDataByGender } from './helpers';
import {
    mockPopleDataWithLength3,
    mockPeopleDataSortedAscByFirstNameWithLength3,
    mockPopleDataSortedDescByScoreWithLength3,
    mockPeopleDataWithLength10,
    mockChartDataGroupedByGender
} from './mocks';

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

    const handleSorting = jest.fn();
    const mockVirtualizedTableProps = {
        columns: columnsDetails,
        headerHeight: 48,
        rowHeight: 48,
        order: {
            orderDirection: 'asc',
            orderBy: undefined,
            isNumeric: false
        },
        handleSorting
    }
    it('calls handleSorting when lastName column header clicked', () => {
        const { getByTestId } = render(<VirtualizedTable {...mockVirtualizedTableProps} />);
        const lastNameHeader = getByTestId('last_name');
        fireEvent.click(lastNameHeader);
        expect(handleSorting).toHaveBeenCalledWith({"dataKey": "last_name", "label": "Last Name"});
    });
});

describe('tests helpers functions', () => {
    it('sorts people data correcty', () => {
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
        expect(
            getSortedTable(mockPopleDataWithLength3, {
                orderDirection: 'asc',
                orderBy: 'score',
                isNumeric: true
            })
        ).not.toEqual(mockPopleDataSortedDescByScoreWithLength3);
    });
    it('caculates average score by gender', () => {
        expect(getChartDataByGender(mockPeopleDataWithLength10)).toEqual(
            mockChartDataGroupedByGender
        );
    });
});
