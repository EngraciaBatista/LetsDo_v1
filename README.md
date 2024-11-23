# Guide to Using Git for the Let'sDo Team

Here's a guide to using Git for the Let'sDo team, with steps and best practices to help everyone understand how to use Git effectively. This guide will focus on using Git within **VS Code**.

---

## Git Basics for the Let'sDo Team

### Initial Setup

#### Install Git
- Make sure Git is installed on your computer. [Download it here](https://git-scm.com/downloads) if needed.

#### Configure Git
1. Open **VS Code**.
2. Open the terminal (`View > Terminal`).
3. Set your username and email (only required once):
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"

## Cloning the Repository

The first step is to download the project repository to your local machine.

1. Go to the repository page on GitHub and copy the repository URL.
2. In **VS Code**, open the **Command Palette** (`Ctrl + Shift + P` on Windows/Linux or `Cmd + Shift + P` on Mac).
3. Type **Git: Clone** and press Enter.
4. Paste the repository URL and select the folder where you want to save the project.
5. VS Code will prompt you to open the cloned repository in a new window. Choose **Open** to view the project files in VS Code.

## Basic Git Workflow

The general Git workflow involves pulling the latest changes, making updates, committing your changes, and then pushing those changes back to GitHub. Here’s how each step works in VS Code:

### 1. Pulling Changes
Before you start working, always pull the latest changes from the repository. This ensures your local copy is up-to-date with everyone else’s work.

- In VS Code, go to the **Source Control** panel (the icon with three branches, or press `Ctrl + Shift + G`).
- Click on the three dots (...) at the top, then select **Pull**.
- Alternatively, open the terminal and type:
     ```bash
     git pull


### 2. Creating a New Branch (Optional but Recommended)

To keep the main branch stable, it’s a good practice to work on separate branches for new features or bug fixes.

- Click on the branch name at the bottom left of VS Code (usually says "main" or "master").
- Select **Create New Branch** and give it a descriptive name, such as `feature-tasks` or `bugfix-login`.

This will create a new branch where you can work without affecting the main branch.

### 3. Making Changes

Now you can start working on your assigned tasks. Make your changes to the code in VS Code.

- Save your changes frequently using `Ctrl + S` (or `Cmd + S` on Mac).
- VS Code will automatically detect changes in files and show them in the **Source Control** panel.

---

### 4. Committing Changes

Once you’ve completed a task or made significant changes, it’s time to commit your work.

1. Go to the **Source Control** panel.
2. Enter a commit message describing your changes (e.g., "Add task creation functionality").
3. Click the checkmark (✓) icon at the top of the Source Control panel to commit the changes.

Alternatively, you can use the terminal:
```bash
   git add .
   git commit -m "Add task creation functionality"
```

### Commit Message Best Practices

- Write clear, concise commit messages.
- Use the imperative mood (e.g., "Fix bug" instead of "Fixed bug").
- Be descriptive but brief (e.g., "Implement user authentication flow").

---

### 5. Pushing Changes

After committing, you need to push your changes to the remote repository on GitHub.

- In the **Source Control** panel, click the three dots (...) and select **Push**.
- Alternatively, use the terminal:
     ```bash
     git push

---

### Best Practices for Using Git

1. **Commit Small, Logical Changes**  
   Make commits for each small, complete task instead of large, unrelated changes. This makes it easier to track changes and troubleshoot if necessary.

2. **Pull Before You Push**  
   Always pull the latest changes from the main branch before you start working and before you push your changes. This avoids conflicts and ensures your changes are based on the most recent version of the code.

3. **Handle Merge Conflicts**  
   If you encounter a conflict when pulling or merging:
   - VS Code will highlight the conflicts in your files. Decide which changes to keep.
   - After resolving conflicts, save the file, stage the changes in the **Source Control** panel, and then commit again.
   - Push your changes after resolving the conflict.

4. **Regularly Push Your Work**  
   Push your changes often (at least once a day or after completing a task). This ensures your work is saved on GitHub and is accessible to the team.

5. **Use Branches for New Features or Fixes**  
   Always create a new branch when working on a new feature or bug fix. Once the feature is completed and tested, merge the branch into the main branch with a pull request on GitHub.
