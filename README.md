# Instagram Clone

An instagram clone made in React, 
with a Firebase backend.



## Tech Stack

**Frontend:** HTML, CSS, Javascript, React

**Backend:** Firebase


## Features

- User authentication
- Making new posts 
- Add comments
- Edit profiles
- Drag and zoom your profile picture
- Protected routes

## Excluded Features

There are certain features that are excluded from this 
project because this project was initially meant 
to be a demonstration of my front-end skills, 
however it has progressed to implement some complex features.

With the view of not bloating the project and continuing 
to improve my front end skills with new projects I have decided 
to deploy the project with the features it presently
has.

## How to Use
- User authentication - Users can sign in and sign up from the login page
- Logout - After logging in there is a logout button on the right side of the home page next to the users profile picture.
- Make a post- In the navbar there is a plus button, by clicking this a modal will pop up. Simply select a picture add a caption and click "Post" on the top right of the modal. To exit the modal just click the dark background.
- User profile- To view your profile click on your profile picture in the Navbar.
- Edit profile- To add a profile picture and bio go to your profile page and click on the 'Edit profile' button. Once you select a profile picture you can edit the picture by zooming in and dragging the picture. Once you are happy with the picture click continue, provide a bio (optional) and click continue.

## Lessons Learned

**What did you learn while building this project?**

To this point the extent of my experience in dealing with a backend had been API's. 
With this project I learned Firebase and developed a better grasp of how to minimise and be efficient with server read, write and deletes.

I also furthered my understanding of React and realised how complex state management, rendering and components can become. This project would serve as a reminder how important planning and management is prior to me undertaking any future ambitious projects.


**What challenges did you face and how did you overcome them?**

The greatest challenge was learning firebase in conjunction with React.
As I was not only learning Firebase but trying to implement it into a front-end framework rather than 
vanilla Javscript. The way I overcame this was by reading the Firebase documentation and lots of googling!

Another challenge was making it possible to edit profile pictures. I had to use the canvas element to make it possbile to drag and zoom the profile picture and subsequently convert the image from Base 64 data to a file and then providing a URL to store in firebase.
