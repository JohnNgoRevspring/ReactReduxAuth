exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropTableIfExists('user').createTable('user', (table) => {
        table.increments("id").primary();
        table.text("name");
        table.text("email").unique().notNullable();
        table.text("password").notNullable();
        table.text("password_hash").notNullable();
        table.boolean("confirmed").notNullable().defaultTo(false);
        table.text("confirmation_token").notNullable().defaultTo('');
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
        table.boolean("is_active").notNullable().defaultTo(true);
      }),
      knex.schema.dropTableIfExists('note').createTable('note', (table) => {
        table.increments('id').primary();
        table.string('title');
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.integer('user_id').unsigned()
          .references('user.id');
      })
    ]);
  };
  exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropTable('note'),
      knex.schema.dropTable('user')
    ]);
  };