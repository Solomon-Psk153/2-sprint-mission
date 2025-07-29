import fs from 'fs';
import path from 'path';

const readSQL = (relativePath: string) =>
    fs.readFileSync(path.resolve(__dirname, relativePath), 'utf8');

export default readSQL;