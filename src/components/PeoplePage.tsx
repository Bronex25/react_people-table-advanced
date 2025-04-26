import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { SortBy } from '../types/SortBy';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [activeLoader, setActiveLoader] = useState(true);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sortBy = searchParams.get('sortBy') as SortBy | null;
  const sortOrder = searchParams.get('order');

  const doSorting = useCallback(
    (arr: Person[]): Person[] => {
      if (!sortBy) {
        return arr;
      }

      return [...arr].sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];

        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortOrder === 'desc'
            ? bVal.localeCompare(aVal)
            : aVal.localeCompare(bVal);
        }

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
        }

        return 0;
      });
    },
    [sortBy, sortOrder],
  );

  const filteredPeople = useMemo(() => {
    if (!people) {
      return [];
    }

    let result = doSorting(people);

    if (query) {
      result = result.filter(p => {
        const personName = p.name.toLowerCase();
        const motherName = p.motherName?.toLowerCase();
        const fatherName = p.fatherName?.toLowerCase();

        return (
          personName.includes(query) ||
          motherName?.includes(query) ||
          fatherName?.includes(query)
        );
      });
    }

    if (sex) {
      result = result.filter(p => p.sex === sex);
    }

    if (centuries.length > 0) {
      result = result.filter(person => {
        const personCentury = Math.ceil(person.born / 100).toString();

        return centuries.includes(personCentury);
      });
    }

    return result;
  }, [people, sex, query, centuries, doSorting]);

  useEffect(() => {
    getPeople()
      .then(fetchedPeople => {
        const peopleWithParents = fetchedPeople.map(person => {
          const mother = fetchedPeople.find(p => p.name === person.motherName);
          const father = fetchedPeople.find(p => p.name === person.fatherName);

          return { ...person, mother, father };
        });

        setPeople(peopleWithParents);
      })
      .catch(() => setErrorMessage(true))
      .finally(() => setActiveLoader(false));

    return () => setErrorMessage(false);
  }, []);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        {activeLoader ? (
          <Loader />
        ) : (
          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>

              <div className="column">
                <div className="box table-container">
                  {errorMessage && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}

                  {people && people.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {people && <PeopleTable people={filteredPeople} />}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
