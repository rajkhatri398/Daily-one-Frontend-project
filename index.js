import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";
import fs from "fs";
import path from "path";

const git = simpleGit();
const DATA_PATH = "./data.json";

// List of your existing project folders (update this list to match your actual folders)
const projectFolders = [
  "_project_starter_",
  "3d-boxes-background",
  "animated-countdown",
  "animated-navigation",
  "auto-text-effect",
  "background-slider",
  "blurry-loading",
  "button-ripple-effect",
  "content-placeholder",
  "custom-range-slider",
  "dad-jokes",
  "double-click-heart",
  "double-vertical-slider",
  "drag-n-drop",
  "drawing-app",
  "drink-water",
  "event-keycodes",
  "expanding-cards",
  "faq-collapse",
  "feedback-ui-design",
  "form-input-wave",
  "github-profiles",
  "good-cheap-fast",
  "hidden-search",
  "hoverboard",
  "image-carousel",
  "incrementing-counter",
  "insect-catch-game",
  "kinetic-loader",
  "live-user-filter",
  "mobile-tab-navigation",
  "movie-app",
  "netflix-mobile-navigation",
  "notes-app",
  "password-generator",
  "password-strength-background",
  "pokedex",
  "progress-steps",
  "quiz-app",
  "random-choice-picker",
  "random-image-generator",
  "rotating-nav-animation",
  "scroll-animation",
  "simple-timer",
  "sound-board",
  "split-landing-page",
  "sticky-navigation",
  "testimonial-box-switcher",
  "theme-clock",
  "toast-notification",
  "todo-list",
  "verify-account-ui"
];

// Verify which folders actually exist
const existingProjects = projectFolders.filter(folder => 
    fs.existsSync(folder) && fs.lstatSync(folder).isDirectory()
);

if (existingProjects.length === 0) {
    console.error("No project folders found. Please check your projectFolders list matches your actual folders.");
    process.exit(1);
}

const makeCommits = async (projects) => {
    if (projects.length === 0) {
        console.log("All projects committed. Pushing to GitHub...");
        return git.push();
    }

    const project = projects[0];
    const remainingProjects = projects.slice(1);

    const x = random.int(0, 54);
    const y = random.int(0, 6);
    const date = moment()
        .subtract(1, "y")
        .add(1, "d")
        .add(x, "w")
        .add(y, "d")
        .format();

    const message = `Add ${project} project - ${date}`;
    console.log(`Committing ${project}...`);

    // Update data.json
    const data = { 
        date, 
        project,
        committedAt: new Date().toISOString()
    };

    await jsonfile.writeFile(DATA_PATH, data);
    await git.add([DATA_PATH, project])
           .commit(message, { "--date": date });

    // Continue with remaining projects
    makeCommits(remainingProjects);
};

console.log(`Found ${existingProjects.length} projects to commit`);
makeCommits(existingProjects);