const ON_UPDATE_DATE_FN = `
    CREATE OR REPLACE FUNCTION on_update_date()
    RETURNS trigger AS $$
    BEGIN
        NEW.updated_at = CURRENT_DATE;
        RETURN NEW;
    END;
    $$ language 'plpgsql';
`;

const DROP_ON_UPDATE_DATE_FN = 'DROP FUNCTION IF EXISTS on_update_date() CASCADE';

const ON_JOB_UPDATE_TRIGGER = `
    CREATE TRIGGER job_updated_at
    BEFORE UPDATE ON job
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_date();
`;

exports.up = async (knex) => {
    await knex.schema.createTable("job", table => {
        table.increments(); 
        table.string("title", 100)
            .notNullable();
        table.string("description", 5000);
        table.date("expiry_date");
        table.date("created_at")
            .notNullable()
            .defaultTo(knex.raw('CURRENT_DATE'));
        table.date("updated_at")
            .notNullable()
            .defaultTo(knex.raw('CURRENT_DATE'));
    });
    
    await knex.raw(ON_UPDATE_DATE_FN);
    await knex.raw(ON_JOB_UPDATE_TRIGGER);
};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists("job").then(() => 
        knex.raw(DROP_ON_UPDATE_DATE_FN)
    );
};
