# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

This app was built as a project during the Lighthouse Labs Web Development bootcamp. It was created with a combination HTML, CSS, JS, jQuery and AJAX front-end tools; the server-side logic was provided to us by Lighthouse as part of the project foundation, as this was meant to focus on front-end development.

Tweeter allows users to view a database of previously-generated "tweets", where the tweeter's profile picture, name, handle and message and date (via timeago) are dynamically populated into a container in the HTML body. Users can write their own tweets and see it seamlessly added to the top of the list via AJAX request. A random user is generated with each tweet. Additionally, a live counter keeps track of how many characters were inputted in the tweet form, and returns an error if the user tries to send an empty tweet, or one over the character limit. Media querys, along with CSS and Flexboxes were utitlized to allow the page to have a different layout for mobile or desktop users by changing the side of the viewport (at 768px). 

Some project stretch functionality was implemented - an animated 'Write a new tweet' button in the navigation bar was created which, when clicked, slides the 'Compose Tweet' form in and out of sight. Also utlitized a free, open-source CSS button (Unite) provided via https://bttn.surge.sh/ for use as the 'Tweet' submit button, partially modified for consistency with Tweeter design.

## Final Product

!["Screenshot of Tweeter Desktop app view"](https://github.com/JesseGiles/tweeter/blob/master/docs/desktop-view-form-hidden.png?raw=true)
!["Screenshot of Tweeter Desktop app view with tweet form displayed & error"](https://github.com/JesseGiles/tweeter/blob/master/docs/desktop-view-error-message.png?raw=true)
!["Screenshot of Tweeter Mobile app view"](https://github.com/JesseGiles/tweeter/blob/master/docs/mobile-view.png?raw=true)

## Dependencies

- Express
- Node 5.10.x or above
- Chance
- body-parser
- md5

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node express_server.js` command.
- Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
- Go to <http://localhost:8080/> in your browser.
- *Get Tweet-ing!* :zany_face:
