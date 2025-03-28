import { spawnSync } from 'child_process';

import fs from 'fs';

export async function writeTsThenFormat(filename: string, content: string) {
    await fs.promises.writeFile(filename, content);
    spawnSync('yarn', ['format', filename], { shell: true, stdio: 'inherit' });
}

