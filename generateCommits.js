const { execSync } = require('child_process');
const path = require('path');

// Set the start and end dates for contributions
const startDate = new Date('2024-01-01');
const endDate = new Date('2024-11-07');

// Repository directory
const repoDir = 'C:/Users/usman/Desktop/Portfolio'; // Replace with the path to your local repository

// GitHub repository URL
const repoUrl = 'https://github.com/usman8786/M-Usman.git';

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

// Generate a random number between min and max (inclusive)
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Loop through each day in the date range
let currentDate = startDate;
while (currentDate <= endDate) {
    // Randomize the number of commits for this day between 0 and 10
    const commitsToday = getRandomInt(0, 10);  // Some days will have 0 commits
    
    for (let i = 0; i < commitsToday; i++) {
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
