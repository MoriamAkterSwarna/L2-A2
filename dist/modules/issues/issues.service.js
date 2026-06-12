import pool from '../../db/index.js';
export const createIssueService = async (data) => {
    const { title, description, type, reporter_id } = data;
    const result = await pool.query(`INSERT INTO issues (title, description, type, status, reporter_id) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING *`, [title, description, type, 'open', reporter_id]);
    return result.rows[0];
};
export const getIssuesService = async (queryFilters) => {
    const { sort = 'newest', type, status } = queryFilters;
    let query = `SELECT * FROM issues`;
    const params = [];
    const conditions = [];
    if (type) {
        params.push(type);
        conditions.push(`type = $${params.length}`);
    }
    if (status) {
        params.push(status);
        conditions.push(`status = $${params.length}`);
    }
    if (conditions.length > 0) {
        query += ` WHERE ` + conditions.join(' AND ');
    }
    if (sort === 'oldest') {
        query += ` ORDER BY created_at ASC`;
    }
    else {
        query += ` ORDER BY created_at DESC`;
    }
    const issuesResult = await pool.query(query, params);
    const issues = issuesResult.rows;
    if (issues.length === 0) {
        return [];
    }
    const reporterIds = [...new Set(issues.map((i) => i.reporter_id).filter((id) => id !== null))];
    const reportersMap = {};
    if (reporterIds.length > 0) {
        const usersQuery = `SELECT id, name, role FROM users WHERE id = ANY($1::int[])`;
        const usersResult = await pool.query(usersQuery, [reporterIds]);
        usersResult.rows.forEach((user) => {
            reportersMap[user.id] = user;
        });
    }
    const data = issues.map((issue) => {
        const { reporter_id, ...issueData } = issue;
        return {
            ...issueData,
            reporter: reporter_id ? (reportersMap[reporter_id] ?? null) : null,
        };
    });
    return data;
};
export const getIssueByIdService = async (id) => {
    const result = await pool.query(`SELECT * FROM issues WHERE id = $1`, [id]);
    if (result.rows.length === 0) {
        return null;
    }
    const issue = result.rows[0];
    let reporter = null;
    if (issue.reporter_id) {
        const userResult = await pool.query(`SELECT id, name, role FROM users WHERE id = $1`, [
            issue.reporter_id,
        ]);
        if (userResult.rows.length > 0) {
            reporter = userResult.rows[0];
        }
    }
    const { reporter_id, ...issueData } = issue;
    return {
        ...issueData,
        reporter,
    };
};
export const getRawIssueByIdService = async (id) => {
    const issueResult = await pool.query(`SELECT * FROM issues WHERE id = $1`, [id]);
    return issueResult.rows.length > 0 ? issueResult.rows[0] : null;
};
export const updateIssueService = async (id, data) => {
    const { title, description, type, status } = data;
    const updateResult = await pool.query(`UPDATE issues 
     SET title = COALESCE($1, title), 
         description = COALESCE($2, description), 
         type = COALESCE($3, type), 
         status = COALESCE($4, status)
     WHERE id = $5 
     RETURNING *`, [title ?? null, description ?? null, type ?? null, status ?? null, id]);
    return updateResult.rows[0];
};
export const deleteIssueService = async (id) => {
    const result = await pool.query(`DELETE FROM issues WHERE id = $1 RETURNING id`, [id]);
    return result.rows.length > 0;
};
//# sourceMappingURL=issues.service.js.map