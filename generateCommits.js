const { execSync } = require('child_process');
const path = require('path');

// Set the start and end dates for contributions
const startDate = new Date('2024-01-01');
const endDate = new Date('2024-12-31');

// Frequency of commits per day (higher number = more green squares)
const commitsPerDay = 3;

// Repository directory
const repoDir = 'C:/Users/usman/Desktop/Portfolio'; // Replace with the path to your local repository

// GitHub repository URL
const repoUrl = 'https://github.com/usman8786/MuhammadUsman.git';

// Navigate to the repository directory
process.chdir(repoDir);

// Initialize the Git repository if not already initialized
try {
    execSync('git init');
    execSync(`git remote remove origin`, { stdio: 'ignore' });
    execSync(`git remote add origin ${repoUrl}`);
} catch (error) {
    console.error("Error initializing the repository:", error.message);
}

// Function to execute a Git command
const runGitCommand = (command) => {
    try {
        execSync(command, { stdio: 'ignore' });
    } catch (error) {
        console.error(`Error executing command "${command}":`, error.message);
    }
};

// Loop through each day in the date range
let currentDate = startDate;
while (currentDate <= endDate) {
    for (let i = 0; i < commitsPerDay; i++) {
        // Create a dummy file to commit
        runGitCommand(`echo "Commit on ${currentDate.toISOString()}" >> dummy_file.txt`);
        
        // Stage the file and commit with a custom date
        runGitCommand(`git add .`);
        const commitDate = currentDate.toISOString();
        runGitCommand(`git commit --date="${commitDate}" -m "Commit on ${commitDate}"`);
    }

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
}

// Push commits to GitHub
try {
    runGitCommand('git branch -M main');
    runGitCommand('git push -u origin main');
} catch (error) {
    console.error("Error pushing commits to GitHub:", error.message);
}
