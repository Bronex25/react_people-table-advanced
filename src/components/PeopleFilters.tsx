import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim().toLowerCase();

    setSearchParams(getSearchWith(searchParams, { query: query || null }));
  };

  const activeCenturies = searchParams.getAll('centuries');

  const handleAddCentury = (century: string) => {
    const newCenturies = activeCenturies.includes(century)
      ? activeCenturies.filter(c => c !== century)
      : [...activeCenturies, century];

    return { centuries: newCenturies || null };
  };

  const activeCenturyClass = (century: string) => {
    return classNames('button mr-1', {
      'is-info': activeCenturies.includes(century),
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink className={!sex ? 'is-active' : ''} params={{ sex: null }}>
          All
        </SearchLink>
        <SearchLink
          className={sex === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={sex === 'f' ? 'is-active' : ''}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={handleOnChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <SearchLink
              data-cy="century"
              className={activeCenturyClass('16')}
              params={handleAddCentury('16')}
            >
              16
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={activeCenturyClass('17')}
              params={handleAddCentury('17')}
            >
              17
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={activeCenturyClass('18')}
              params={handleAddCentury('18')}
            >
              18
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={activeCenturyClass('19')}
              params={handleAddCentury('19')}
            >
              19
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={activeCenturyClass('20')}
              params={handleAddCentury('20')}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-oulined', {
                'is-success': activeCenturies.length === 0,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ centuries: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
