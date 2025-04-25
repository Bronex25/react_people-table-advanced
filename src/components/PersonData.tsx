import React from 'react';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  person: Person;
};

export const PersonData: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={slug === person.slug ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': person.sex === 'f' })}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother ? (
          <Link to={person.mother.slug} className="has-text-danger">
            {person.motherName}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {person.father ? (
          <Link to={person.father.slug}>{person.fatherName}</Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
