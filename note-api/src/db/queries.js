const knex = require('./knex');

module.exports = {
    getAll: (table) => {
        return knex(table).select();
    },
    getPage:(table, limit,start,order) => {
        return knex.select('*').from(table)
                    //.where('title', 'ilike', '%'+query+'%')
                    .limit(limit)
                    .offset(start)
                    .orderBy('created_at', order);
    },
    getAllByUser: (table, user_id) => {
        return knex(table)
                    .where({'user_id': user_id || 0})
                    .select();
    },
    getPageByUser:(table, limit, start, order, user_id) => {
        start -= 1;
        return knex
                .select('*').from(table)
                .where({'user_id': user_id || 0})
                .limit(limit)
                .offset(start)
                .orderBy('created_at', order);
    },
    getOne: (table, id) => {
        return knex(table)
                .select()
                .where('id', id)
                .first();
    },
    getOneByColumn: (table, name, value) => {
        return knex(table)
                .where(name, value)
                .first();
    },
    create: (table, record_data) => {
        return knex(table)
                    .insert(record_data, 'id');
    },
    update: (table, id, record_data_all) => {
        return knex(table)
                    .where('id', id)
                    .update(record_data_all);//.update(record_data, 'id');
    },
    updateColumns: (table, id, columnCSV, columnCSVData) => {
        return knex(table)
                    .where('id', id)
                    .returning(columnCSV)
                    .update(columnCSVData);//.update(record_data, 'id');
    },
    delete: (id) => {
        return knex(table)
                    .where('id', id)
                    .del();
    }
}