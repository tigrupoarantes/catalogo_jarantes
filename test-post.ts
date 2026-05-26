import * as fs from 'fs';

const mdContent = `| Código | Nome |
|---|---|
| 123 | Test |`;

fs.writeFileSync('test-post.md', mdContent);
