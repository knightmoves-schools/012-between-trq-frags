const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const assert = require('assert');

function runScript(db, script) {
  const sql = fs.readFileSync(script, 'utf8');
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

describe('the SQL in the `exercise.sql` file', () => {
  let db;
  let scriptPath;

  beforeAll(() => {
    const dbPath = path.resolve(__dirname, '..', 'lesson12.db');
    db = new sqlite3.Database(dbPath);

    scriptPath = path.resolve(__dirname, '..', 'exercise.sql');
  });

  afterAll(() => {
    db.close();
  });

  it('Should write a SQL Query that returns all rows where the Salary is higher than 1,100 and less than 1,850.', async () => {
      const results = await runScript(db, scriptPath);
      let pass = true;
      results.forEach((row) => {
        if(row.SALARY < 1100 || row.SALARY > 1850) {
            pass = false;
        }
      });

      expect(pass).toBe(true);
  });
});
