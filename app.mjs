import 'dotenv/config';    
import chalk from 'chalk';   // for the green tick    
import app from './public/scripts/server.mjs';


const PORT = process.env.PORT;


app.listen( PORT, () => {
    console.log(
      `Example app listening at http://localhost:${PORT}`,
      chalk.green("✓")
    );
  });