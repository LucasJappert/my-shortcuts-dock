import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { exec } from 'child_process';

// Read package.json to get the application name and version
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const productName = packageJson.buildProductName;
const version = packageJson.version;

// Define the AppImage file name using values from package.json
const appImageName = `${productName}.AppImage`;

// Define the path to the generated AppImage and the path to the desktop
const outputDirectory = path.join(__dirname, 'release', version); // Adjust this path if necessary
const appImagePath = path.join(outputDirectory, appImageName);
const desktopPath = path.join(os.homedir(), 'Desktop', appImageName);

console.log(`#### AppImage generated at: ${appImagePath}`);

// Copy the AppImage file to the desktop
fs.copyFile(appImagePath, desktopPath, (err) => {
    if (err) {
        console.error('Error copying the AppImage file:', err);
        return;
    }
    console.log(`AppImage copied to: ${desktopPath}`);

    // Grant execute permissions to the copied file
    exec(`chmod +x "${desktopPath}"`, (error) => {
        if (error) {
            console.error('Error granting execute permissions:', error);
        } else {
            console.log('Execute permissions granted to the AppImage on the desktop.');
        }
    });
});
