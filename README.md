## Project Goals:

The inception of the **BookHub** application was motivated by a passion for literature and a desire to create a digital sanctuary for book enthusiasts. Here’s a concise overview of what I set out to achieve with this application:

1. **Build a Community of Book Lovers:**
   - To create a platform where users can come together to discuss, share, and explore books of varying genres, fostering a community of like-minded individuals who share a common love for literature (and hopefully no internet trolls...).

2. **Promote Knowledge Sharing:**
   - To enable users to share their thoughts, reviews, and insights about different books, thereby promoting the exchange of knowledge and perspectives within the community.

3. **Ease of Access:**
   - To provide a user-friendly interface that allows users to seamlessly navigate through the application, explore various books, read reviews, and interact with other community members.

4. **Integration with External Libraries:**
   - To integrate functionalities that allow users to search and explore books from external libraries like OpenLibrary, thus expanding the range of accessible literature.

5. **Inclusive and Diverse:**
   - To develop a platform that represents and celebrates diversity, inclusivity, and acceptance, catering to a global audience with varied tastes in literature.

6. **User Interaction and Engagement:**
   - To implement features that enable users to create profiles, add reviews, comment on existing reviews, and interact with other users, thereby enhancing user engagement and interaction within the platform.

7. **Responsive and Scalable:**
   - To design an application that is responsive, ensuring optimal user experience on various devices, and scalable, allowing for the incorporation of additional features and enhancements in the future.

Through the realization of these goals, **BookHub** aims to be a meeting place in the digital literary world, cultivating a space where the love for books brings people together.

## Component Architecture and Reuse

In this application, I have embraced React's philosophy of building small, reusable, and independent components. Below are the components developed along with their purposes and usages.

### 1. Asset.js  

**Purpose:** Provides the user with a spinner graphic when the page is loading info. This provides the user with a better UX experience- the user will know something is happening behind the scenes when code is too slow to load.

**Usage:** This component is used in multiple sections such as the main page review loads, user list loads, NYT reviews load, etc. 

2. Avatar.js

**Purpose:** The Avatar component is used to display a user's avatar image along with optional text. It is a reusable component utilized wherever a user’s avatar needs to be showcased within the application.

**Props:** 

* **src** (string): The source URL of the avatar image.
* **height** (number) : The height of the avatar image in pixels. Defaults to 45 if not provided.
* **text** (string): Optional text to be displayed alongside the avatar image.

**Usage**: This component is used on the main page in the review component, in the profile component, in the user list component, and so on. 

### 2. BookOfTheWeek.js

**Purpose:** 

The **BookOfTheWeek** component is designed to showcase the last book review that has been uploaded. It’s a dynamic component that fetches the book of the week from the backend and displays its title and author. If a book prop is provided, it will display the provided book instead of fetching it from the backend.

**Props:**

* **book** (object): An optional object representing a book. If provided, the component will display this book as the book of the week instead of fetching it from the backend. The object should have the following structure:
1. **title** (string): The title of the book.
2. **author_name** (string): The name of the author of the book.

**Usage:**

This component is used in a prominent location in the application: the homepage to highlight the most recently reviewed book to the users.

**State and Effects:**

**fetchedBook** (object): Holds the book object fetched from the backend. It is initially set to null.

**effects:** The component uses the useEffect hook to fetch the book of the week from the backend when the component mounts, if no book prop is provided. The fetched book is then set to the fetchedBook state variable.
For example:

```javascript
<BookOfTheWeek book={{ title: "Example Book", author_name: "Author Name" }} />
```
It's important to note that:
 
* If no book is provided via the book prop and no book is fetched from the backend, the component will render null.
* The component makes a GET request to 'https://bookhub-rdf-api-9aad7672239c.herokuapp.com/book-of-the-week/' to fetch the book of the week if no book prop is provided.

### 3. FloatingFooterButton.js

**Purpose:** The **FloatingFooterButton** component is utilized to create a button with a floating footer style. This button, when clicked, triggers an action defined by the parent component, making it a versatile and reusable button component throughout the application.

**Props:**
* **onClick** (function): A function that is triggered when the button is clicked. It is used to define what action should be performed on button click.

**Usage:** 

This component can be used wherever a button with floating footer style is required, and its action can be customized based on the parent component’s requirement.

**Example:**

```javascript
<FloatingFooterButton onClick={() => { console.log('Button Clicked!'); }} />
```

### 4. NavBar.js

**Purpose:**

The **NavBar** component is a crucial part of the application UI, rendering the navigation bar. It provides navigation links, user authentication options, user profile access, and additional features like adding a review. Depending on the user's authentication state, different options and icons are displayed.

**Usage:**

This component is used at the top of the application pages, ensuring consistent navigation across different sections of the application.

**State and Effects:**

* **State Variables:**
  * **expanded** (boolean): Represents whether the Navbar is expanded or not, managed by the custom hook `useClickOutsideToggle`.

* **Effects:**
  * The component leverages the `useEffect` hook in conjunction with the custom hook `useClickOutsideToggle`, to manage Navbar toggling based on user interaction.

**Context:**

* **useCurrentUser** and **useSetCurrentUser** from `CurrentUserContext` are used to access and manage the state of the current user.

**Custom Hooks:**

* **useClickOutsideToggle:** This custom hook is used to manage the toggling of the Navbar based on user clicks.

**Functions:**

* **handleSignOut:** This function handles user sign-out. It makes a POST request to logout the user and sets the current user to null.

**Example:**

```html
<NavBar />
``````

### 5. MoreDropdown.js

**Purpose:**

The **MoreDropdown** and **ProfileEditDropdown** components are designed to provide dropdown functionality with different options, enhancing the user interaction within the application. They both make use of a ref-forwarded component, **ThreeDots**, to trigger the dropdown.

#### MoreDropdown

**Props:**

* **handleEdit** (function): A function triggered when the edit option in the dropdown is clicked.
* **handleDelete** (function): A function triggered when the delete option in the dropdown is clicked.

**Usage:**

This component can be used wherever a dropdown menu with edit and delete options is required, allowing users to perform actions directly from the dropdown.

**Example:**

```html
<MoreDropdown handleEdit={editFunction} handleDelete={deleteFunction} />
```

### 6. FooterModal.js

**Purpose:**

The **FooterModal** component is responsible for rendering a modal that provides additional information about the application, such as “About Us”, “Contact” information, “Quick Links”, and social media links. It is designed to be a central place where users can get more details and understand more about the platform and its context.

**Props:**

* **show** (boolean): Determines whether the modal is visible or not.
* **handleClose** (function): A function triggered when the user decides to close the modal.

**Usage:**

This component can be utilized wherever there is a need to show more information to the user in a modal format, like in the footer section where users can access additional details about the platform.

**Example:**

```html
<FooterModal show={modalVisible} handleClose={closeModalFunction} />
```

### 7. AboutUs.js

**Purpose:**

The **AboutUs** component is designed to present detailed information about the BookHub platform. It outlines the mission, features, and beliefs of BookHub, providing users with a comprehensive overview of what the platform stands for and offers.

**Usage:**

This component is used in the “About Us” section of the application, serving as a dedicated space where users can learn more about BookHub and its objectives.

**Example:**

```html
<AboutUs />
```

### 8. LiteraryQuote.js

**Purpose:**

The **LiteraryQuote** component is intended to inspire users by displaying a random literary quote. This component fetches a random quote from an external API and displays it along with its author, providing daily literary inspiration to the users.

**State and Effects:**

* **State Variables:**
  * **quote** (Object): Holds the literary quote object fetched from the API. It is initially set to `null`.

* **Effects:**
  * The component uses the `useEffect` hook to fetch a random quote from 'https://api.quotable.io/random' when the component mounts.

**Usage:**

This component can be placed in any part of the application where you want to provide users with some literary inspiration, like on a dashboard or the homepage.

**Example:**

```html
<LiteraryQuote />
```
It's important to note:
* The LiteraryQuote component fetches a new quote every time it is mounted, ensuring that users get different quotes on different visits or refreshes.
* It provides a loading state to inform users that the quote is being fetched, ensuring a smooth user experience.
* The styling for this component is defined in the **LiteraryQuote.module.css** file, maintaining a consistent and appealing look.

### 9. NYTReviews.js

**Purpose:**

The **NYTReviews** component is developed to display a list of New York Times book reviews and the top 10 NYT Best Sellers. It allows users to search for reviews of specific books and provides links to the full reviews, integrating seamlessly with the New York Times API to fetch real-time data.

**State and Effects:**

* **State Variables:**
  * **reviews** (Array): Holds the list of reviews fetched from the NYT API. Initially an empty array.
  * **top10** (Array): Holds the list of top 10 NYT Best Sellers. Initially an empty array.
  * **loading** (boolean): Represents the loading state of the component. Initially `false`.
  * **error** (String): Holds the error message if there is an error while fetching data. Initially `null`.
  * **searchTerm** (String): Holds the search term entered by the user. Initially an empty string.

* **Effects:**
  * The component uses the `useEffect` hook to fetch the top 10 NYT Best Sellers when the component mounts.

**Usage:**

This component can be used to display book reviews and best sellers from the New York Times, offering users insights and recommendations for their next read.

**Example:**

```html
<NYTReviews />
```

It's important to note that:
* The NYTReviews component makes API calls to fetch reviews and best sellers' data, rendering dynamic content based on the fetched data.
* It manages various state variables to handle loading, errors, and user inputs efficiently, ensuring a smooth user experience.
* Users can search for reviews of specific books, and if there are no reviews found, the component informs the users accordingly.
* It provides links to the full reviews and displays images, titles, authors, plots, and other relevant information about the books, offering a comprehensive overview to the users.
* The styling for this component is defined in the **NYTReviews.module.css** file, maintaining a consistent and appealing look and feel.

### 10. OpenLibrarySearch.js

**Purpose:**

The **OpenLibrarySearch** component is developed to allow users to search and explore books from OpenLibrary.org, providing a seamless integration with Open Library's vast digital collection. It offers an infinite scrolling feature, allowing users to continuously load more search results as they scroll.

**State:**

* **State Variables:**
  * **searchTerm** (String): Holds the search term entered by the user. Initially an empty string.
  * **results** (Array): Holds the list of books fetched from Open Library. Initially an empty array.
  * **offset** (Number): Represents the page number for pagination with Open Library API. Initially `1`.
  * **hasMore** (Boolean): Determines whether more results can be fetched. Initially `true`.
  * **error** (String): Holds the error message if there is an error while fetching data. Initially `null`.
  * **searchInitiated** (Boolean): Represents whether a search has been initiated. Initially `false`.

**Usage:**

This component is used to offer users a search functionality to explore and discover books available on OpenLibrary.org, presenting results with book images, titles, authors, and publication years.

**Example:**

```html
<OpenLibrarySearch />
```
It's important to note that:
* The OpenLibrarySearch component makes API calls to https://openlibrary.org/search.json to fetch book data based on the user's search term, rendering dynamic content based on the fetched data.
* It manages various state variables to handle user inputs, loading, errors, and pagination efficiently, ensuring a smooth user experience.
* It provides links to OpenLibrary.org for each book in the search results, allowing users to explore more about the books.
* The component leverages the InfiniteScroll component to implement the infinite scrolling feature, loading more results as users scroll.
* If there is an error during the data fetching process, the component informs users accordingly.
* The styling for this component is defined in the **OpenLibrarySearch.module.css** file, maintaining a consistent and appealing look.

### 11. NotFoundPage.js

**Purpose:**

The **NotFoundPage** component serves as a user-friendly error page for users who navigate to a route that does not exist within the application. It provides a visual indicator, a clear message, and a convenient link to navigate back to the homepage.

**Usage:**

This component is rendered when a user navigates to a non-existent route within the application, providing an intuitive and user-friendly way to handle such errors.

**Example:**

```html
<NotFoundPage />
```

### There are several other components in this app...
The application is architected around the React framework, leveraging the power of reusable components to build a coherent, maintainable, and scalable codebase. Components such as **SignInForm**, **SignUpForm**, **Comment**, and **CommentCreateForm**, **ScrollToTopButton**, etc.,  are modular building blocks of the application that encapsulate specific functionalities. These components are reused across different parts of the application, ensuring consistency and reducing redundancy. Each component maintains its own state and lifecycle while possibly receiving data via props, allowing for data flow and clear separation of concerns. By structuring the application in this way, it’s easier to manage, develop, and debug, making the codebase more maintainable and scalable as the application evolves.

## UX Design Process for BookHub

**1. Objective Identification:**

From the outset, the goal of BookHub was clear: to create a centralized platform for book enthusiasts to discover, review, and discuss various books. The platform would not only serve as a repository of book reviews but also integrate external resources such as the New York Times bestsellers and OpenLibrary's vast collection.

**2. Wireframing:**

Initial wireframes were developed to outline the primary structure of the application. These wireframes provided a visual guide for the placement and interaction of elements on various pages such as the review page, book search, user profiles, and more. 

Below are some of the wireframes created for the project:

**The main page for large screens:**

![Image of wireframe of main page](./src/assets/aJwMRfu64jN8BRdCd7oMu1.png)

**Open Library Search Page:**

![Image of wireframe for theopen library search page](./src/assets/bbjbbC98pfSGpa286ybzY9.png)

**NYT Reviews and top ten page:**

![Image of wireframe for the New York Times top ten and review search page](./src/assets/pNoPMFhAGWCAM8MReXhZkq.png)

**The About Page:**

![Image of wireframe for the about page](./src/assets/4V8xX74XDZLsq2SGaGdHzG.png)

**Small Screen View Of Main Page:**

![Image of wireframe for ther main page for small screens](./src/assets/6D2nGqtwH6rR8n6eAJDbLB.png)

**3. Component Design:**

The application was designed with component reusability in mind. Components like **Review**, **Asset**, and others were developed to be reused throughout the application to maintain consistency in design and functionality. This modular approach not only streamlined the development process but also ensured a consistent user experience across different parts of the application.

**4. Integration with External Resources:**

Special emphasis was given to integrating external resources seamlessly. For instance, the OpenLibrary search functionality was embedded within the platform, providing users the ability to search for books without leaving the BookHub environment.

**5. Responsive Design:**

Given the diverse range of devices users might access BookHub from, responsiveness was a key design consideration. Bootstrap's grid system was employed to ensure the application looked and functioned optimally across various device sizes in some parts, while flexbox was used in others. To further ensure ease of access for all screen sizes, REM units were used instead of pixels. 

**6. Feedback and Iteration:**

Following the initial design; feedback was sought to refine and optimize the user experience. This iterative process ensured that any usability issues were identified and rectified before the final deployment.

**7.  Follow-Through to Implementation:**

The design blueprints, as outlined in the wireframes and component designs, were closely followed during the development phase. Any deviations were carefully considered to ensure they enhanced, rather than detracted from, the user experience.

### User Experience Flowchart

In the development of the BookHub application, I prioritized clarity and user-centric design. To ensure that every interaction was intuitive and meaningful, I laid out a User Experience (UX) flowchart. This visual representation helped me map out the user's journey through the **ReviewsPage** of the application.

#### Purpose of the Flowchart:

1. **Visualization:** Before diving into the code, the flowchart provided a clear picture of how the different components and functionalities of the **ReviewsPage** interact with each other.

2. **User-Centered Design:** It assisted in ensuring that user interactions were smooth, logical, and minimized unnecessary steps.

3. **Workflow:** The flowchart served as a reference point for the development, ensuring I was aligned with the intended user experience.

4. **Refinement:** As the development progressed, referring back to the flowchart helped in identifying areas of improvement or simplification.

#### Flowchart Key Features

* **Data Fetching:**  The flowchart showcases how the application fetches reviews and the 'Book of the Week' upon loading the **ReviewsPage**.

* **User Interaction:** It highlights the user's ability to search for specific reviews and how the system responds to these queries.

* **Visual Feedback:** The flowchart represents different states of the application, such as loading states and the display of results or lack thereof.

![Flowchart of the UX for main page](./src/assets/bookhub.png)

## User Stories

### Introduction

User stories provide a simple, informal explanation of a software feature from the perspective of an end user. They help to ensure that the development remains user-centric. Each user story in this project is aligned with the the project goals.

#### Project Goals

1. **Build a Community**: Create a platform where book enthusiasts can connect, share their thoughts, and get recommendations.

2. **Enhance User Engagement:** Provide features that keep users engaged, like reviews, book of the week, and literary quotes.

3. **Ensure Intuitive User Experience:** Offer a simple, clean, and intuitive user interface that users can navigate effortlessly.

#### User Stories

1. **Review Sharing and Exploration**

* As a user, I want to view the latest book reviews so that I can discover new books and get insights about them.
* As a user, I want to search for specific reviews to find thoughts on books I'm interested in.

2. **Community Building**
* As a user, I want to view popular profiles so that I can follow active members and enhance my community experience.
* As a user, I want to follow/unfollow other members to personalize my feed and interactions.
* As a user, I want to be able to comment and engage with other users regarding book reviews.

3. **Engagement Features**
* As a user, I want to view the 'Book of the Week' to discover popular and recommended reads.
* As a user, I want to see a literary quote for daily inspiration and reflection.

4. **Profile Management and Interaction**
* As a user, I want the application to be visually appealing and functional regardless of the device I'm using, ensuring consistent user experience.
* As a user, I want fast load times and smooth transitions, especially when I'm accessing the platform on mobile devices.
* As a user, I want to see the number of reviews I've written, the followers I have, and the profiles I follow.

5. **Error Handling and User Feedback**
* As a user, I want to be informed when something goes wrong or when there's no data to display, ensuring I'm not left in the dark about what's happening.

6. **Inclusivity and Diversity**
* As a user, I want to explore literature from various cultures and perspectives to broaden my understanding and appreciation of global narratives.
* As a user, I want to be part of a platform that promotes inclusivity, where I can express my views without prejudice.

7. **Ease of Access and Navigation**
* As a user, I want an intuitive layout that makes it easy for me to find what I'm looking for, ensuring a smooth user experience.
* As a user, I want to easily navigate between different sections of the app, like reviews, profiles, and external libraries.

8. **Integration with External Libraries**
* As a user, I want to search for books not just within the community but also from external sources like OpenLibrary or the New York Times to have a comprehensive list of options.
* As a user, I want direct links to sources where I can access, read, or purchase the book, making the journey from discovery to reading seamless.

9. **Accessibility Features**
* As a user, I want the platform to be accessible, catering to users with disabilities with features like a screen reader or high contrast mode.
* As a user, I want to adjust the text size or choose between different themes to customize my reading experience.

#### Mapping User Stories to Project Goals
* **Build a Community of Book Lovers:** The ability to view reviews, follow users, and explore popular profiles directly contributes to community building.
* **Promote Knowledge Sharing:** User reviews, comments, and the integration with external libraries like OpenLibrary facilitate knowledge sharing.
* **Enhance User Engagement:** Features like 'Book of the Week', literary quotes, and the search functionality keep users engaged and encourage regular visits.
* **Ensure Intuitive User Experience:** The clear layout of reviews, profiles, and the seamless interaction between different components ensures a user-friendly experience.
* **Ease of Access:** The addition of accessibility features ensures a wider range of users can navigate and utilize the platform with ease.
* **Integration with External Libraries:** The search functionality, which extends to sources like OpenLibrary, NYT Reviews, ensure this goal is met.
* **Inclusive and Diverse:**  By allowing literature exploration from various cultures and promoting a prejudice-free platform, this goal is addressed.
* **User Interaction and Engagement:** Features like user profiles, the ability to add reviews, comment, and interact ensure high user engagement.
* **Responsive and Scalable:** The design of the application, which ensures optimal performance across devices, and its architecture that allows for future enhancements, align with this goal.

## Front-End Libraries and Their Justifications

1. **React:**
* **Usage:** React is the primary library used to build the user interface of the application.
* **Justification:** React's component-based architecture promotes reusability and scalability. Its virtual DOM ensures efficient updates and rendering, making it a solid choice for dynamic applications like BookHub.

2. **react-bootstrap:**
* **Usage:** This library provides responsive design components like **Col**, **Row**, **Container**, **Button**, and **Image**.
* **Justification:** React-bootstrap allows for rapid development with a consistent design. It's based on Bootstrap, a widely recognized and adaptable front-end framework, ensuring a responsive and modern UI.Though personally, I prefer using 'vanilla' CSS as I find its flexibility exciting and creative.

3. **react-router:**
* **Usage:** Used for client-side routing in the application, as seen with **useLocation** and **useParams**.
* **Justification:** React Router provides seamless navigation between components without refreshing the page, enhancing user experience and performance.

4. **react-infinite-scroll-component:**
* **Usage:** Implemented for loading more data as the user scrolls.
* **Justification:** Infinite scrolling improves user experience by eliminating the need for pagination and loading content seamlessly, providing a more fluid browsing experience.

5. **axios:**
* **Usage:** For making HTTP requests, as observed in the **axiosReq** utility.
* **Justification:** Axios is a popular promise-based HTTP client for JavaScript, allowing for easier error handling, request and response interception, and overall cleaner asynchronous code compared to the traditional XMLHttpRequest.

6. **OpenLibrary API:**
* **Usage:** Integrated to search and explore books from an external library.
* **Justification:** OpenLibrary provides a vast database of books. By integrating this API, BookHub can offer users an expansive range of literature to explore beyond community reviews.

7. **New York Times API:**
* **Usage:** Integrated to search and explore books from a renowned external library.
* **Justification:** The NYT API provides a vast database of books and book reviews, as well as the current 10 best selling books list. 

8. **react-scroll-up-button:** 
* **Usage:** Provides a customizable "Scroll to Top" button for the application.
* **Justification:** Enhancing user experience is crucial, especially in applications with lengthy content. A "Scroll to Top" button provides users with a quick and convenient way to navigate back to the top of the page, eliminating the need for manual scrolling. The react-scroll-up-button library offers an out-of-the-box solution for this with customization options to ensure the button fits seamlessly into the application's design.

## Front-End Testing

### Manual Testing Procedures and Results

To ensure the reliability of the **BookHub** application, extensive manual testing was conducted. The following outlines the procedures undertaken and the results:

### 1. **User Registration and Login:**
- **Procedure:**
  - Navigate to the registration page.
  - Fill out the registration form with various data sets, including:
    - Valid data.
    - Missing mandatory fields.
    - Incorrectly formatted email addresses.
  - Attempt to log in with the newly created user credentials.
  - Attempt to log in with incorrect credentials.
- **Results:**
  - Registration was successful with valid data.
  - Appropriate error messages were displayed for missing or incorrect data.
  - Login was successful with correct credentials and failed with incorrect ones.

### 2. **Review Posting and Editing:**
- **Procedure:**
  - Navigate to the review creation page.
  - Try posting a review without filling in any details.
  - Post a review with all details filled.
  - Edit the posted review.
- **Results:**
  - The application prevented posting an empty review and displayed an appropriate error message.
  - Reviews were successfully posted and displayed on the platform.
  - Edits to reviews were reflected immediately.

### 3. **Search Functionality:**
- **Procedure:**
  - Use the search bar to look for specific book titles or authors.
  - Try searches with misspellings.
- **Results:**
  - Searches returned relevant results.
  - The search was forgiving of minor misspellings.

### 4. **Responsive Design:**
- **Procedure:**
  - Open the application on various devices, including desktop, tablet, and mobile.
  - Resize the browser window to various sizes.
- **Results:**
  - The application's design was fluid and adapted to various screen sizes.
  - No major design breaks or unresponsive elements were observed.

### 5. **External Libraries Integration:**
- **Procedure:**
  - Search for a book using the integrated OpenLibrary search.
  - Check the results for relevancy.
- **Results:**
  - The search returned relevant results from OpenLibrary.
  - Book details from external libraries were displayed correctly.

### 6. **User Profile and Interactions:**
- **Procedure:**
  - Visit a user's profile.
  - Try following and unfollowing the user.
  - Navigate to your profile and check the follower count.
- **Results:**
  - The follow/unfollow functionality worked as expected.
  - Follower counts updated in real-time.

### 7. **Scroll to Top Button:**
- **Procedure:**
  - Scroll down on a long page.
  - Click the "Scroll to Top" button.
- **Results:**
  - The page smoothly scrolled back to the top upon button click.

### 8. **Commenting on Reviews:**
- **Procedure:**
  - Navigate to a book review.
  - Attempt to post an empty comment.
  - Post a valid comment.
  - Edit your comment.
  - Delete your comment.
- **Results:**
  - The application prevented posting an empty comment with an appropriate error message.
  - Comments were successfully posted below the review.
  - Edits to comments were reflected immediately.
  - Deleted comments were removed from the review's comment section.

### 9. **Navigation and Page Loading:**
- **Procedure:**
  - Use the main navigation bar to switch between different sections of the application.
  - Observe the page loading times and any potential errors.
- **Results:**
  - Navigation between different sections was smooth.
  - Pages loaded quickly without any noticeable lag or errors.

### 10. **Profile Picture Upload:**
- **Procedure:**
  - Navigate to your user profile.
  - Attempt to upload different file types as profile pictures, including non-image files.
  - Upload a valid image file.
- **Results:**
  - Non-image files were rejected with an appropriate error message.
  - Valid image files were successfully uploaded and displayed as the profile picture.

### 11. **Following and Followers List:**
- **Procedure:**
  - Follow several users.
  - Navigate to your profile and click on "Following" to see the list of users you're following.
  - Unfollow a user and check the list again.
  - Click on "Followers" to see the list of users following you.
- **Results:**
  - The "Following" list correctly displayed the users being followed.
  - Upon unfollowing, users were removed from the "Following" list.
  - The "Followers" list correctly displayed users following you.

### 12. **Notification System:**
- **Procedure:**
  - Perform actions that trigger notifications, such as receiving a comment on your review or being followed by another user.
  - Navigate to the notifications section.
- **Results:**
  - Notifications were received in real-time.
  - The notifications section displayed all recent notifications with appropriate messages.

### 13. **Book Recommendations:**
- **Procedure:**
  - Navigate to the recommendations section.
  - Observe the books recommended based on your previous reviews and ratings.
- **Results:**
  - The recommendations seemed relevant and based on user preferences.

### 14. **Error Handling and Messages:**
- **Procedure:**
  - Intentionally trigger errors, such as trying to access a non-existent page or trying to post invalid data.
  - Observe the error messages and how the application handles them.
- **Results:**
  - User-friendly error messages were displayed.
  - The application did not crash and gracefully handled errors, redirecting users or providing solutions when possible.

### 15. **Logout and Session Handling:**
- **Procedure:**
  - Log out of the application.
  - Try to access user-specific sections without logging in.
- **Results:**
  - Successfully logged out and sessions were terminated.
  - Without being logged in, user-specific sections were inaccessible, ensuring user data privacy.

Each testing procedure was meticulously executed, and any issues identified were addressed immediately to improve the application's reliability and user experience. This hands-on approach to testing ensured that **BookHub** offers a seamless and enjoyable experience for its users.

### Automatic Testing

#### **1. Mock API Responses:**

In the development environment, I use mock handlers to simulate API responses. This aids in testing how the application handles these responses, ensuring the components render the expected data and can gracefully handle potential API changes.

**File:** `handlers.js` in the `mocks` directory.

```javascript
import { rest } from "msw";

const baseURL = "https://bookhub-rdf-api-9aad7672239c.herokuapp.com/";

export const handlers = [
  // ... (code that simulates responses from the API)
];
```
#### **2. Component Rendering Tests:**

**NavBar.test.js**
Tests the rendering and functionality of the navigation bar: 
* **Sign in & Sign up links:** Confirms their presence when a user is not logged in.
* **Profile link:** Ensures it is present when a user is logged in.
* **Logout behavior:** Tests the behavior of links upon user logout.

**RenderTest.test.js**
Specifically tests the rendering of the **AboutUs page**, ensuring key elements like particular headings are correctly displayed.

**UserInteraction.test.js**
This file contains tests that validate the behavior of interactive UI elements. For instance, it checks if a button correctly triggers its associated function upon being clicked.

#### **3. User Interaction Tests:**
**UserInteraction.test.js**
This set of tests examines the behavior of the components upon user interactions:
* **Button interaction:** Validates that a button triggers the expected function when clicked.

Through these automatic tests, I verify the expected behavior of the user interface and ensure that the logic and rendering processes within the application are functioning correctly.

## Version Control and GitHub Usage

Throughout the development of the **BookHub** application, version control was instrumental in ensuring a seamless and organized workflow. I employed Git, coupled with the collaboration platform GitHub, to maintain the project's codebase efficiently. Here's a breakdown of my version control practices:

### **1. Descriptive Commits**:
Commit messages serve as a brief log or description of changes, making them invaluable for project tracking. I aimed for clarity and precision with each commit, ensuring that the message succinctly conveyed the change's essence. This approach aids in quickly understanding the commit's purpose without diving too deep into the code changes.

### **2. Utilizing Hard Resets**:
There were instances during development when I needed to revert to a previous stable state due to unforeseen issues or changes in direction. In such cases, I used the `git reset` command. This command allowed me to undo changes and revert to a previously known stable state, ensuring the project's integrity.

### **3. Branching & Merging**:
To maintain a stable main branch while simultaneously exploring new features, fixes, or optimizations, I made extensive use of Git's branching feature. For each significant change or feature addition:
- I created a new branch using `git checkout -b branch-name`.
- After completing the feature or fix in this branch, I tested it thoroughly.

This branching strategy allowed me to work on multiple features simultaneously without affecting the main codebase's stability.

### **4. Testing Branch**:
Before introducing a new feature to the main branch, I created a dedicated testing branch. This branch served as a sandbox for rigorous testing, ensuring that new additions wouldn't introduce regressions or break existing functionality. Once tests were successful, changes were merged back into the branch.

By adhering to these version control practices, I was able to maintain a clean, organized, and efficient development workflow. It ensured that **BookHub** evolved in a structured manner, with each change meticulously documented and reviewed.


## Technology

The following technologies were used in this project:

### Languages

- **Python**: The primary backend language.
- **JSX**: Used as a syntax extension for JavaScript, enabling the construction of React components.
- **HTML**: Fundamental structure for the web application.
- **CSS**: Styling and layout for the web application's visual presentation.
- **JavaScript**: Core programming language.

### Frameworks

- **Django REST Framework**: Used for building Web APIs in the Django environment.
- **React**: A JavaScript library for building user interfaces, allowing for the creation of reusable UI components.
- **React Bootstrap**: An integration of Bootstrap with React, offering responsive design and styled components.

### Other Software and Dependencies

- **MSW (Mock Service Worker)**: Assists in front-end development by mocking API calls.
- **Axios**: A promise-based HTTP client for making asynchronous requests.
- **React Testing Library**: A lightweight solution for testing React components, prioritizing user interactions.
- **npm (Node Package Manager)**: Handles package installation and dependency management.
- **jwt-decode**: A utility for decoding JSON Web Tokens (JWT) to retrieve payload data.
- **React Lazy Load Image Component**: Optimizes image loading by lazily loading images that are currently in view.
- **React Router**: Enables navigation between different components, changing the browser URL, and keeping the UI in sync.