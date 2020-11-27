const _ = require('lodash');

module.exports = {
  delete: (id, client) => client.query(createDeleteClause(id)),
  getAllQuestions: client => client.query(getQuestionsClause()),
  getQuestionById: (client, id) => client.query(getQuestionsClause(id)),
  createQuestion: (query, client) => client.query(createQuestionClause(query)),
  updateQuestion: (query, client) =>
    client.query(createUpdateQuestionClause(query)),
  createOption: (query, client) =>
    client.query(
      createOptionClause,
      createOptionsValues(query.option, query.question_id)
    ),
  updateOption: (query, client) =>
    client.query(createUpdateOptionClause(query)),
  deleteOption: (id, client) => client.query(createDeleteOptionClause(id)),
  createMemo: (query, client) =>
    client.query(
      createMemoClause,
      createMemoValues(query.memo, query.option_id)
    ),
  updateMemo: (query, client) => client.query(createUpdateMemoClause(query)),
  deleteMemo: (id, client) => client.query(createDeleteMemoClause(id)),
};

const getQuestionsClause = id => `
    SELECT *,(
        SELECT array_to_json(array_agg(r))
        FROM (
            SELECT
                o.*,
                array_remove(array_agg(m.*), NULL) as memos
            FROM option o
            LEFT OUTER JOIN memos m ON m.option_id = o.id
            WHERE o.question_id = question.id
            GROUP BY o.id
        ) r) as options
    FROM question
    ${id ? `WHERE id=${id}` : ''}
    ORDER BY question_ordinal_first NULLS FIRST, question_ordinal_second NULLS FIRST, question_ordinal_third NULLS FIRST
`;

const generateIdClause = query => {
  return `
    ${query.question_ordinal_second ? query.question_ordinal_first : 'null'},
    ${query.question_ordinal_first},
    ${query.question_ordinal_second ? query.question_ordinal_second : 'null'},
    ${query.question_ordinal_third ? query.question_ordinal_third : 'null'}
    `;
};

const createQuestionClause = query => `
    INSERT INTO question (title, info, parent_id, question_ordinal_first, question_ordinal_second, question_ordinal_third)
    VALUES (
        '${query.title}',
        '${query.info}',
         ${generateIdClause(query)}
    ) RETURNING id
`;

const createUpdateQuestionClause = query => `
    UPDATE question
    SET title='${query.title}',
        info='${query.info}',
        question_ordinal_first=${query.question_ordinal_first ? query.question_ordinal_first : 'null'
  },
        question_ordinal_second=${query.question_ordinal_second ? query.question_ordinal_second : 'null'
  },
        question_ordinal_third=${query.question_ordinal_third ? query.question_ordinal_third : 'null'
  }
    WHERE
        id=${query.id}
`;

const createDeleteOptionClause = id => `
    DELETE
    FROM option
    WHERE id=${id}
`;

const createUpdateOptionClause = query => `
    UPDATE option
    SET text='${query.text}',
        forward_to=${query.forward_to === undefined ? null : query.forward_to}
    WHERE
        id=${query.id}
`;

const createUpdateMemoClause = query => `
    UPDATE memos
    SET text='${query.text}',
        link='${query.link === undefined ? null : query.link}',
        additional_infos='{${query.additional_infos.toString()}}'
    WHERE
        id=${query.id}
`;

const createOptionClause = `
    INSERT INTO option (text, forward_to, question_id)
    VALUES (
        $1,
        $2,
        $3
    ) RETURNING id
`;

const createDeleteClause = id => `
    DELETE
    FROM question
    WHERE id=${id};

    DELETE
    FROM option
    WHERE question_id=${id};
`;

const createOptionsValues = (option, question_id) => [
  option.text,
  option.forward_to,
  question_id,
];

const createMemoClause = `
    INSERT INTO memos (text, link, additional_infos, option_id)
    VALUES (
        $1,
        $2,
        $3,
        $4
    )
`;

const createMemoValues = (memo, option_id) => [
  memo.text,
  memo.link,
  memo.additional_infos,
  option_id,
];

const createDeleteMemoClause = id => `
    DELETE
    FROM memos
    WHERE id=${id}
`;
