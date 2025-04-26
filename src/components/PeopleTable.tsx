import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonData } from './PersonData';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

type Order = 'desc' | null;

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const order = searchParams.get('order');
  const sortBy = searchParams.get('sortBy') as keyof Person;
  const sortClass = (sort: keyof Person) =>
    classNames('fas', {
      'fa-sort-up': sortBy === sort && !order,
      'fa-sort-down': sortBy === sort,
      'fa-sort': sortBy !== sort,
    });

  const setSorting = (newSortBy: keyof Person) => {
    type Result = {
      sortBy: keyof Person | null;
      order: Order;
    };

    const result: Result = { sortBy: newSortBy, order: null };

    if (result.sortBy === sortBy && order === 'desc') {
      result.sortBy = null;
      result.order = null;
    } else if (result.sortBy === sortBy && !order) {
      result.order = 'desc';
    }

    return result;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={setSorting('name')}>
                <span className="icon">
                  <i className={sortClass('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={setSorting('sex')}>
                <span className="icon">
                  <i className={sortClass('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={setSorting('born')}>
                <span className="icon">
                  <i className={sortClass('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={setSorting('died')}>
                <span className="icon">
                  <i className={sortClass('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people?.map(person => (
          <PersonData person={person} key={person.slug}></PersonData>
        ))}
      </tbody>
    </table>
  );
};
