# Project Name
To Do List

This project is a task management web application that allows users to create, organize, and manage tasks. It provides features such as adding tasks, setting due dates, assigning importance levels, and marking tasks as completed. The application includes default projects with pre-defined tasks based on their importance and due dates.

# Features

Create tasks with titles, descriptions, due dates, and importance levels.  
Organize tasks into different projects.  
Pre-defined default projects with tasks categorized by importance and due date:  
"All tasks": Contains all tasks created by the user.  
"Today": Contains tasks with due dates set to the current day.  
"This week": Contains tasks with due dates within the current week.  
"Important": Contains tasks marked as important.  
Automatically assign tasks to the default projects based on their importance and due date.  
Mark tasks as completed or uncompleted.  
Visual indicators for completed tasks.  
Edit and delete tasks.  
Persist data using localStorage for task and project storage.  

# Technologies Used

HTML
CSS  
JavaScript 
Webpack  

# Challenges Faced

Implementing the checkbox functionality to mark tasks as completed was initially challenging. It required dynamically adding event listeners to checkboxes and updating the task status accordingly.  
Editing tasks posed a challenge in terms of updating the task details while ensuring the changes are reflected accurately in the user interface and localStorage. Managing the synchronization between the displayed task information, the input fields, and the data model required careful handling and event management.

# Lessons Learned

Improved understanding of DOM manipulation using JavaScript.  
Enhanced knowledge of working with localStorage for data storage and retrieval in web applications.  
Learned how to create dynamic event listeners to handle user interactions.  
Gained experience in managing user input and updating the data model while maintaining consistency in the user interface.  
The experience gained from working with localStorage has provided valuable insights into data management in web applications and improved understanding of data persistence techniques.  

# Future Improvements

Implement user authentication to allow multiple users with separate task lists.  
Enable sorting and filtering options for tasks based on different criteria.  
Refactor the code to enhance readability and maintainability.  
Write comprehensive unit tests to ensure code stability and functionality. 
