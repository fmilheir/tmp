import 'dotenv/config';    
import chalk from 'chalk';   // for the green tick    
import app from './public/scripts/server.mjs';
import startConection from './public/scripts/serverCheck.mjs';

/////// swagger





startConection().then(() => {
  const PORT = process.env.PORT;


  app.listen( PORT, () => {
    console.log(
      `Example app listening at http://localhost:${PORT}`,
      chalk.green("✓")
    );
  });
}).catch(error => {
  console.error('Error connecting to the database: ', error);
  process.exit(1);
});
