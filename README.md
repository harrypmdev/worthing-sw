# Worthing Sound Wave

Live site: <a href="https://worthing-sw-c84ec9c15d42.herokuapp.com/">
https://worthing-sw-c84ec9c15d42.herokuapp.com/</a>

Worthing Sound Wave is a website that allows musicians based in Worthing to connect. You can make posts,
upload songs, vote on content, personalise your profile and comment on others' posts.

![Responsive Mockup](/readme-assets/responsive.webp)

# Contents

- [**Agile Methodology**](#agile-methodology)
  - [Overview](#project-goals)
  - [Specific Implementation and Breakdown of Themes](#specific-implementation-and-breakdown-of-themes)
- [**Technologies Used**](#technologies-used)
  - [Languages](#languages)
  - [Libraries and Frameworks](#libraries-and-frameworks)
- [**UX Planning**](#ux-planning)
  - [Overview](#overview-1)
  - [Page Wireframes](#page-wireframes)
  - [Authorisation Pages](#authorisation-pages)
  - [Post Pages](#post-pages)
  - [Profile Pages](#profile-pages)
  - [Song Pages](#song-pages)
- [**Features**](#features)
  - [Navbar](#navbar)
  - [Home](#home)
  - [Feed](#search-bar)
  - [Top Songs](#top-songs)
  - [User Authentication](#user-authentication)
  - [Avatar](#avatar)
  - [Profile](#profile)
  - [Edit Profile](#edit-profile)
  - [Create Song](#create-song)
  - [Edit Song](#edit-song)
  - [Create Post](#create-post)
  - [Edit Post](#edit-post)
  - [Create Comment](#create-comment)
  - [Follow](#follow)
  - [Vote](#vote)
- [**Features Yet To Be Implemented**](#features-yet-to-be-implemented)
- [**Testing**](#testing)
  - [Lighthouse Testing](#lighthouse-testing)
- [**Error Pages**](#error-pages)
- [**Credits and References**](#credits--references)




# Agile Methodology

## Overview

An agile methodology was used to develop this project, using iterations on a kanban board.
GitHub projects was used to facilitate the agile development:
<a href="https://github.com/users/harrypmdev/projects/9/" target="_blank">Worthing Sound Wave GitHub Agile Project</a>.


## Specific Implementation and Breakdown of Themes

+ Overaraching themes for the project were identified.
+ These were split down into epics, then User Stories to guide development from the user's perspective.
+ The project development was split into four iterations.
+ A prioritised backlog for the User Stories was utilised to ensure continuous re-evaluation of the project priorities.
+ User Stories were divided into MoSCoW groups (Must Have, Should Have, Could Have and Won't Have) and reassigned between the
groups throughout the project.
+ A kanban board was used to track each the progress of each iteration, using columns 'To Do', 'In Progress' and 'Done'.
+ During the implementation of a User Story, it was broken down into technical tasks to be completed. These were ticked off
one-by-one before the User Story was moved into the 'Done' column. These tasks are viewable by clicking on the User Stories.

<details>
<summary> Breakdown of Themes, Epics, User Stories and Final State of Implementation </summary>

![Agile Breakdown](/readme-assets/agile-breakdown.webp)

</details>

<br />

# Technologies Used

## Languages

+ JavaScript - Used alongside a form of HTML caused JSX in the React framework.
+ HTML5 - Used alongside JS in React's JSX.
+ CSS3 - Utilised both indirectly through the Bootstrap framework and directly through modular custom CSS code.

## Libraries and Frameworks

+ <a href='https://react.dev/'>React</a> - A front-end JS framework used for the Worthing Sound Wave front-end.
+ <a href='https://react-bootstrap.netlify.app/'>Bootstrap React</a> - Used for its simplification of CSS and easy implementation of widely understood UX 'language'. Bootstrap React is made specifically for better integration into the React framework.
+ <a href='https://fontawesome.com/'>Font Awesome</a> - Used for all site icons, based on HTML and CSS.
+ <a href='https://fonts.google.com/'>Google Fonts</a> - Utilised for the site's primary font, Roboto.
+ <a href='https://axios-http.com/'>Axios</a> - Node HTTP client for better network request functionality, including interceptors.
+ <a href='https://www.npmjs.com/package/wav-encoder'>wav-encoder</a> - An NPM package allowing for conversion from buffer to wav.

<br />

# UX Planning

## Overview

A positive user experience was the end goal of all page design. Wireframing was done ahead of page creation for each page to guide development.
A mobile-first approach was taken for the responsive design of the website, and both mobile and desktop displays were wireframed to provide guidelines for this.

Some differences between the wireframes and final page appearances can be seen - this is because the wireframes existed to guide design and ensure a positive overall
user experience, rather than dictate specific details of the implementation.

## Page Wireframes

<details>
<summary> Home Page Wireframe (Desktop)</summary>

![Home Page Wireframe (Desktop)](/readme-assets/wireframes/home-desktop.webp)

</details>
<details>
<summary> Home Page Wireframe (Mobile)</summary>

![Home Page Wireframe (Mobile)](/readme-assets/wireframes/home-mobile.webp)

</details> 

### Authorisation Pages

<details>
<summary> Login Page Wireframe (Desktop)</summary>

![Login Page Wireframe (Desktop)](/readme-assets/wireframes/login-desktop.webp)

</details>
<details>
<summary> Login Page Wireframe (Mobile)</summary>

![Login Page Wireframe (Mobile)](/readme-assets/wireframes/login-mobile.webp)

</details> 
<br>
<details>
<summary> Register Page Wireframe (Desktop)</summary>

![Register Page Wireframe (Desktop)](/readme-assets/wireframes/register-desktop.webp)

</details>
<details>
<summary> Register Page Wireframe (Mobile)</summary>

![Register Page Wireframe (Mobile)](/readme-assets/wireframes/register-mobile.webp)

</details> 

### Post Pages

The desktop General Feed and My Feed pages include a column to the left of the feed, 'Top 
Profiles' and 'Last Online from your following' respectively. These were excluded in the final
product as they were deemed unnecessary for the overrall user experience and the project scope.

<details>
<summary> Create Post Page Wireframe (Desktop)</summary>

![Create Post Page Wireframe (Desktop)](/readme-assets/wireframes/create-post-desktop.webp)

</details>
<details>
<summary> Create Post Page Wireframe (Mobile)</summary>

![Create Post Page Wireframe (Mobile)](/readme-assets/wireframes/create-post-mobile.webp)

</details> 
<br>
<details>
<summary> Edit Post Page Wireframe (Desktop)</summary>

![Edit Post Page Wireframe (Desktop)](/readme-assets/wireframes/edit-post-desktop.webp)

</details>
<details>
<summary> Edit Post Page Wireframe (Mobile)</summary>

![Edit Post Page Wireframe (Mobile)](/readme-assets/wireframes/edit-post-mobile.webp)

</details> 
<br>
<details>
<summary> General Feed Page Wireframe (Desktop)</summary>

![General Feed Page Wireframe (Desktop)](/readme-assets/wireframes/general-feed-desktop.webp)

</details>
<details>
<summary> My Feed Page Wireframe (Desktop)</summary>

![My Feed Page Wireframe (Mobile)](/readme-assets/wireframes/my-feed-desktop.webp)

</details> 
<details>
<summary> Feed Page Wireframe (Mobile)</summary>

![Feed Page Wireframe (Mobile)](/readme-assets/wireframes/feed-mobile.webp)

</details> 
<br>
<details>
<summary> Post Page Wireframe (Desktop)</summary>

![Post Page Wireframe (Mobile)](/readme-assets/wireframes/post-page-desktop.webp)

</details> 
<details>
<summary> Post Page Wireframe (Mobile)</summary>

![Post Page Wireframe (Mobile)](/readme-assets/wireframes/post-page-mobile.webp)

</details> 

### Profile Pages

<details>
<summary> Profile Page Wireframe (Desktop)</summary>

![Profile Page Wireframe (Mobile)](/readme-assets/wireframes/profile-desktop.webp)

</details> 
<details>
<summary> Profile Page Wireframe (Mobile)</summary>

![Profile Page Wireframe (Mobile)](/readme-assets/wireframes/profile-mobile.webp)

</details> 
<br>
<details>
<summary> Edit Profile Page Wireframe (Desktop)</summary>

![Edit Profile Page Wireframe (Mobile)](/readme-assets/wireframes/edit-profile-desktop.webp)

</details> 
<details>
<summary> Edit Profile Page Wireframe (Mobile)</summary>

![Edit Profile Page Wireframe (Mobile)](/readme-assets/wireframes/edit-profile-mobile.webp)

</details>

### Song Pages

<details>
<summary> Create Song Page Wireframe (Desktop)</summary>

![Create Song Wireframe (Mobile)](/readme-assets/wireframes/create-song-desktop.webp)

</details> 
<details>
<summary> Create Song Wireframe (Mobile)</summary>

![Create Song Wireframe (Mobile)](/readme-assets/wireframes/create-song-mobile.webp)

</details> 
<br>
<details>
<summary> Edit Song Page Wireframe (Desktop)</summary>

![ Edit Song Page Wireframe (Mobile)](/readme-assets/wireframes/edit-song-desktop.webp)

</details> 
<details>
<summary> Edit Song Page Wireframe (Mobile)</summary>

![Edit Song Page Wireframe (Mobile)](/readme-assets/wireframes/edit-song-mobile.webp)

</details>
<br />

# Features

### Navbar

+ The navbar facilitates easy site navigation and creates as positive user experience by meeting users'
expectations for a method of site navigation.
+ The navbar is dependant on the state of user authentication, allowing users to immediately see their 
authentication state, including which user is authenticated as the username and profile image is displayed on the navbar.
+ The navbar compresses into a dropdown 'burger' menu on smaller screens for
better responsivity.

<br />
<details>
<summary> Navbar Screenshot Unauthorised (Desktop) </summary>

![Navbar Screenshot Unauthorised (Desktop)](/readme-assets/features/navbar-unauth-desktop.webp)

</details>
<details>
<summary> Navbar Screenshot Unauthorised (Mobile) </summary>

![Navbar Screenshot Unauthorised (Mobile)](/readme-assets/features/navbar-unauth-mobile.webp)

</details>
<br />
<details>
<summary> Navbar Screenshot Authorised (Desktop) </summary>

![Navbar Screenshot Authorised (Desktop)](/readme-assets/features/navbar-auth-desktop.webp)

</details>
<details>
<summary> Navbar Screenshot Authorised (Mobile) </summary>

![Navbar Screenshot Authorised (Mobile)](/readme-assets/features/navbar-auth-mobile.webp)

</details> 
<br />

### Home

+ Provides a simple landing page for new and returning users that explains
that basic purpose of the site, and invites the user to get involved by
registering or viewing the general feed with two simple call to action buttons.
+ Includes one large image and only two buttons, to present new users with accessible, easy to process choices that provide a better UX.

<br />
<details>
<summary> Home Page Screenshot (Desktop) </summary>

![Home Page Screenshot (Desktop)](/readme-assets/features/home-desktop.webp)

</details> 
<details>
<summary> Home Page Screenshot (Mobile) </summary>

![Home Page Screenshot (Mobile)](/readme-assets/features/home-mobile.webp)

</details> 
<br />

### Feed

+ The feed provides an easy way for users to view multiple posts, as they
are rendered in a simple list the user can scroll through.
+ The 'feed' is accessible with multiple filters to fit the users needs -
they can view the posts of the users they follow, recent posts all users,
or the posts of a specific profile. These are on the My Feed, General Feed
and Profile pages respectively, to separate the functionality clearly for the user.
+ The feed scrolls infinitely, loading new data as required, so the user is
unencumbered by page number and has a better experience more overall in line
with modern web standards.

<br />
<details>
<summary> Feed Screenshot (Desktop) </summary>

![Feed Screenshot (Desktop)](/readme-assets/features/feed-desktop.webp)

</details> 
<details>
<summary> Feed Screenshot (Mobile) </summary>

![Feed Screenshot (Mobile)](/readme-assets/features/feed-mobile.webp)

</details> 
<br />

### Search Bar

+ A feature intrinsically tied to the feed feature, allowing users to search
through feeds by entering keywords.
+ Allows users to quickly find specific posts, including searching for dates,
venues and particular users.
+ Doesn't load results upon every character entry, but waits until the user has
stopped typing - this minimises API requests and makes the result rendering smoother, providing a better overall UX.

<br />
<details>
<summary> Search Bar Screenshot </summary>

![Search Bar Screenshot](/readme-assets/features/search-bar.webp)

</details> 
<br />

### Top Songs

+ The top songs feature allows users to view top voted songs so they can better
access music they are likely to enjoy.
+ The top songs list is found on two pages with different filters - on the General Feed page, where it is the top songs from all users, and the My Feed page, where it is the top songs from following. This allows users to see the highest voted generally, as well as from the users they are most interested in, in a way that is easy to understand and ties in to the purpose of the feed pages.

<br />
<details>
<summary> Top Songs Screenshot (General Feed) </summary>

![Top Songs (General Feed)](/readme-assets/features/top-songs-general.webp)

</details> 
<details>
<summary> Top Songs Screenshot (My Feed) </summary>

![Top Songs (My Feed)](/readme-assets/features/top-songs-my-feed.webp)

</details> 
<br />

### User Authentication

+ The user authentication of the site allows users to register and login so they can have their own posts, songs, profile, follows and votes.
+ This allows users to engage with others on the site, voice their opinion and share their own content.
+ Users are kept logged in by a token refresh system, allowing them to navigate around the site, briefly leave it and return without having to re-log each time, providing a better overall UX.
+ Login and Register pages provide the interface for authentication - both pages provide feedback on erroneous form submissions, and redirect authenticated users to prevent confusion.

<br />
<details>
<summary> Login Screenshot (Desktop) </summary>

![Login Screenshot (Desktop)](/readme-assets/features/login-desktop.webp)

</details>
<details>
<summary> Login Screenshot (Mobile) </summary>

![Login Screenshot (Mobile)](/readme-assets/features/login-mobile.webp)

</details>
<br />
<details>
<summary> Register Screenshot (Desktop) </summary>

![Register Screenshot (Desktop)](/readme-assets/features/register-desktop.webp)

</details>
<details>
<summary> Register Screenshot (Mobile) </summary>

![ Register Screenshot (Mobile) ](/readme-assets/features/register-mobile.webp)

</details>
<br />

### Avatar

+ The avatar feature allows user profiles to be represented succinctly and consistently across the site.
+ The avatar contains a profile image and username, and serves as a link to the
profile in question (made evident by a visual change upon hover). The user's own profile can be accessed by their avatar on the navbar, and each post and comment is accompanied by the avatar of the poster.
+ This allows users to intuively understand the avatar functionality across the site, as they already understand it from the navbar. It also allows for links to the profile pages to be included without a separate button providing the link, therefore giving a better overall UX.

<br />
<details>
<summary> Avatar Screenshot </summary>

![Avatar Screenshot](/readme-assets/features/avatar.webp)

</details>
<br />

### Profile

+ The profile page allows users to easily view a summary of a user's profile (either their own or someone else's).
+ Shows the user's profile picture, username, bio, songs and posts.
+ The page gives users an opportunity to view a larger version of a user's profile picture, and find more posts and songs from a user they are interested in.

<br />
<details>
<summary> Profile Page Screenshot (Desktop) </summary>

![Profile Page Screenshot (Desktop)](/readme-assets/features/profile-desktop.webp)

</details> 
<details>
<summary> Profile Page Screenshot (Mobile) </summary>

![Profile Page Screenshot (Mobile)](/readme-assets/features/profile-mobile.webp)

</details> 
<br />

### Edit Profile

+ The edit profile page allows users to edit their own profile so they can better present their own identity and connect with other users.
+ The page shows by default the user's current profile image and bio, so it is immediately clear to them what they are editing and replacing.
+ The image can be changed simply be clicking on the profile image on the edit page, which shows an effect upon hover to indicate this, providing a simple experience users will be familiar with and providing a better overall UX.

<br />
<details>
<summary> Edit Profile Page Screenshot (Desktop) </summary>

![Edit Profile Page Screenshot (Desktop)](/readme-assets/features/edit-profile-desktop.webp)

</details> 
<details>
<summary> Edit Profile Page Screenshot (Mobile) </summary>

![Edit Profile Page Screenshot (Mobile)](/readme-assets/features/edit-profile-mobile.webp)

</details> 
<br />

### Create Song

+ The create song feature allows users to add up to three short audio clips to their profile so they can easily show off their music to other users and find similar musicians.
+ The 'add song' button is present on their profile so they can add songs to it at any time and see them appear on the song list underneath after returning from the add song page.
+ The audio file upload form section cuts audio files to their first 15 seconds so users do not have to manually cut their songs into clips, providing a better overall experience.

<br />
<details>
<summary> Add Song Button Screenshot </summary>

![Add Song Button Screenshot](/readme-assets/features/add-song-button.webp)

</details> 
<details>
<summary> Create Song Page Screenshot (Desktop) </summary>

![Create Song Page Screenshot (Desktop)](/readme-assets/features/create-song-desktop.webp)

</details>
<details>
<summary> Create Song Page Screenshot (Mobile) </summary>

![Create Song Page Screenshot (Mobile)](/readme-assets/features/create-song-mobile.webp)

</details> 
<br />

### Edit Song

+ The edit song feature allows users to update information about their songs.
+ They can update the artist name, title, or add a link to a full version of the song. Updating a song to add a link to full version adds particular utility, as a full version may not be available online when the song clip is first uploaded.
+ A user can easily edit any of their songs from their profile page, as an edit button will appear under any songs they have. The placement of this button immediately under the songs themselves stops users from having to search for the option and provides a positive UX.

<br />
<details>
<summary> Edit Song Button Screenshot </summary>

![Edit Song Button Screenshot](/readme-assets/features/edit-song-button.webp)

</details> 
<details>
<summary> Edit Song Page Screenshot (Desktop) </summary>

![Edit Song Page (Desktop)](/readme-assets/features/edit-song-desktop.webp)

</details>
<details>
<summary> Edit Song Page Screenshot (Mobile) </summary>

![Edit Song Page (Mobile)](/readme-assets/features/edit-song-mobile.webp)

</details> 
<br />

### Create Post

+ The create post feature allows users to add posts of their own to the site, which will appear in the feeds of other users.
+ Users can attach songs from their profile to posts, allowing them to attract publicity to their songs clips or decorate a musical post with a relevant clip.
+ The create post form has a dropdown to select a song to link - the dropdown options will be any songs the user has on their profile. This allows users to easily select songs to link without checking they are getting the spelling exactly right, providing a better overall UX.

<br />
<details>
<summary> Create Post Page Screenshot (Desktop) </summary>

![Create Post Page Screenshot (Desktop)](/readme-assets/features/create-post-desktop.webp)

</details> 
<details>
<summary> Create Post Page Screenshot (Mobile) </summary>

![Create Post Page Screenshot (Mobile)](/readme-assets/features/create-post-mobile.webp)

</details> 
<br />

### Edit Post

+ The edit post feature allows any post belonging to the user to be edited at any time. 
+ The edit page is accessible via an edit button that appears under any post belonging to the user when on their profile page. The post edit button appears under posts in the same fashion as the song edit button, and is similarly styled, creating aesthetic cohesion and making the interface more consistent and understandable for users.
+ The edit page itself automatically fills with the pre-exising post information, making it clear what is being edited and providing a better overall UX.

<br />
<details>
<summary> Edit Post Button Screenshot </summary>

![Edit Post Button Screenshot](/readme-assets/features/edit-post-button.webp)

</details> 
<details>
<summary> Edit Post Page Screenshot (Desktop) </summary>

![Edit Post Page Screenshot (Desktop)](/readme-assets/features/edit-post-desktop.webp)

</details> 
<details>
<summary> Edit Post Page Screenshot (Mobile) </summary>

![Edit Post Page Screenshot (Mobile)](/readme-assets/features/edit-post-mobile.webp)

</details> 
<br />

### Create Comment

+ The create comment feature allows users to add comments to posts so they can interact with posts and engage with other users better.
+ The form for comment creation is easily available below the post on any post page, and resembles a comment itself, making its functionality
immediately clear and improving the page's overall aesthetic cohesion.
+ Comments appear immediately in on the page after being posted, giving clear feedback to the user.

<br />
<details>
<summary> Create Comment Screenshot </summary>

![Create Comment Screenshot](/readme-assets/features/create-comment.webp)

</details>

<br />


### Follow

+ The follow button allows users to follow other users, so they can stay updated on the users they are interested in.
+ The feature is intrinsically tied to the My Feed page, as this is where posts
and top songs from the followed users will appear.
+ The follow button immediately changes to an unfollow button upon clicking, this provides a single interface for both following and unfollowing a user in one button, which also implicitly informs the user of their current following state.
+ As with other site buttons, the button is disabled for a brief period after clicking whilst the backend is contacted to confirm the updated state. The 'optimistic' changing of the button before the success of the request has been confirmed allows the button to change immediately, and the disabling of the button protects from conflicting requests. This provides a better overall UX by providing immediate response to the user in way that will never cause errors or data corruption.

<br />
<details>
<summary> Follow Button Screenshot </summary>

![Follow Button Screenshot](/readme-assets/features/follow-button.webp)

</details> 
<details>
<summary> Unfollow Button Screenshot </summary>

![Unfollow Button Screenshot](/readme-assets/features/unfollow-button.webp)

</details> 
<br />

### Vote

+ The vote feature allows users to upvote and downvote both posts and songs to express their opinions and interact with the site community.
+ The net votes immediately updates and the upvote and downvote buttons visually represent the user's current vote, showing them their current vote state visually and thus aiding a positive UX.

<br />
<details>
<summary> Vote Screenshot </summary>

![Vote Screenshot](/readme-assets/features/vote.webp)

</details>
<br />

# Features Yet To Be Implemented

Worthing Sound Wave is a finished product, but several features could be implemented in the future to expand and improve the user experience.

- **Comment Votes** -- allowing users to vote on comments and sorting them by net votes would allow users to further engage with the site community, and also view the most popular comments on a post first.

- **List of Following and Followers** -- allowing users to view a rendered list of all the profiles they are following and being followed by as avatars would allow users to more easily follow and unfollow users they are interested in and track the popularity of their own profile. This could provide another path for engagement between site users and improve the overall UX.

-**Post Images** -- posts were kept to text and songs for simplicity and to be concise in the aims and value of the site. A feature could be added however to optionally add an image to a post that appears only when the post is clicked on. This could allow users to further engage other users with their posts, by utilising both visual and audio content.

# Data Modelling & Schema

# Validators

# Testing

## Lighthouse Testing

### Overview

+ The site's best practices score is consistently imperfect due to the site's use of third party cookies, a feature Chrome is now moving away from.
+ Also impacting the best practices score is the logging of errors by the browser that are handled in the site's code. This is due to code logic sometimes
depending on 'failed' requests to determine if a user is authenticated. The logic is not flawed, but Chrome detracts points for the 'acceptable' errors.
This could be reviewed in future, but is aligned with the taught practices of Code Institute.
+ Perhaps most importantly, the site scores perfectly on every page for accessibility and SEO.

### Home Page

<br />
<details>
<summary> Home Page Lighthouse </summary>

![Home Page Lighthouse](/readme-assets/lighthouse/home-lighthouse.webp)

</details>
<br />

#### Performance - 97
  - Almost perfect performance, largely due to the page's simplicity.

#### Accessibility - 100
  - Perfect accessibility score.
  - As on most pages of the site, this is aided by overwriting of Bootstrap primary colour
  with a slightly darker blue, which is better for colour contrast accessibility.

#### Best Practices - 96
  - Despite all calls to the back-end API being error handled on the site, Chrome automatically
  logs failed requests even if they are part of the site logic.
  - The site's methods for keeping users logged in, refreshing tokens etc will sometimes trigger
  'errors' from the backend when the user is not authenticated. This is not a problem, but nonetheless
  Chrome logs the errors and this impacts the best practices score.
  - The methods followed for this project were aligned with Code Instite's methods for programming
  authentication on the front-end. However some alternate methods could be implemented in the future to avoid these
  'acceptable' console errors, such as altering the server to return a 200 with the error in the payload,
  rather than a 400~ error.

#### SEO - 100
- Perfect SEO score.

<br />

### Login Page

<br />
<details>
<summary> Login Page Lighthouse </summary>

![Login Page Lighthouse](/readme-assets/lighthouse/login-lighthouse.webp)

</details>
<br />

#### Performance - 89
  - A very good performance score overall.
  - The login image impacts the performance somewhat. It is a WEBP file, and was resized to as low of as a resolution as possible
  without affecting the UX. Alternate images could perhaps be sought to further increase the score, however this current performance
  was deeemed sufficient for the project scope.

#### Accessibility - 100
  - Perfect accessibility score.

#### Best Practices - 96
  - Impacted by the 'acceptable' console errors like all site pages.

#### SEO - 100
- Perfect SEO score.

<br />

### Register Page

<br />
<details>
<summary> Register Page Lighthouse </summary>

![Register Page Lighthouse](/readme-assets/lighthouse/register-lighthouse.webp)

</details>
<br />

#### Performance - 88
  - A good performance score overall.
  - The register image lowers the score slightly, like the login page.

#### Accessibility - 100
  - Perfect accessibility score.

#### Best Practices - 96
  - Impacted by the 'acceptable' console errors like all site pages.

#### SEO - 100
- Perfect SEO score.

<br />

### Create Post Page

<br />
<details>
<summary> Create Post Page Lighthouse </summary>

![Create Post Page Lighthouse](/readme-assets/lighthouse/create-post-lighthouse.webp)

</details>
<br />

#### Performance - 90
  - A very good performance score overall.
  - The image lowers the score slightly.

#### Accessibility - 100
  - Perfect accessibility score.

#### Best Practices - 78
  - Impacted by the 'acceptable' console errors like all site pages
  - Further impacted by the use of third party cookies for user authentication. Like the console
  errors, this is aligned with the taught logic of Code Institute, but Chrome is moving away from these
  cookies and reflects this in their best practices score.
  - Alternates aligned with Chrome's future plans could be sought in future.

#### SEO - 100
- Perfect SEO score.

<br />

### Edit Post Page

<br />
<details>
<summary> Edit Post Page Lighthouse </summary>

![Edit Post Page Lighthouse](/readme-assets/lighthouse/edit-post-lighthouse.webp)

</details>
<br />

#### Performance - 86
  - A good performance score overall.
  - The image lowers the score slightly.

#### Accessibility - 100
  - Perfect accessibility score.

#### Best Practices - 78
  - Impacted by the 'acceptable' console errors and third party cookes like all authenticated pages.

#### SEO - 100
- Perfect SEO score.

<br />

### General Feed Page

<br />
<details>
<summary> General Feed Page Lighthouse </summary>

![General Feed Page Lighthouse](/readme-assets/lighthouse/general-feed-lighthouse.webp)

</details>
<br />

#### Performance - 91
  - A good performance score overall.
  - The large amount of posts and songs that render on this screen impact the performance slightly.
  - Finding methods to reduce the layout shifting introduced by this kind of rendering could improve the performance.
  The current performance was deemed satisfactory for the project scope.

#### Accessibility - 100
  - Perfect accessibility score.

#### Best Practices - 78
  - Impacted by the 'acceptable' console errors and third party cookes like all authenticated pages.

#### SEO - 100
- Perfect SEO score.

<br />

### My Feed Page

<br />
<details>
<summary> My Feed Page Lighthouse </summary>

![My Feed Page Lighthouse](/readme-assets/lighthouse/my-feed-lighthouse.webp)

</details>
<br />

#### Performance - 94
  - A good performance score overall.
  - Similar to the general feed performance - acceptable for this project, but could possibly be improved with
  use of methods to prevent heavy layout shifting.

#### Accessibility - 100
  - Perfect accessibility score.

#### Best Practices - 78
  - Impacted by the 'acceptable' console errors and third party cookes like all authenticated pages.

#### SEO - 100
- Perfect SEO score.

<br />

### Post Page

<br />
<details>
<summary> Post Page Lighthouse </summary>

![Post Page Lighthouse](/readme-assets/lighthouse/post-page-lighthouse.webp)

</details>
<br />

#### Performance - 89
  - A good performance score overall.
  - The rendering of comments is particularly layout shifting. Like the feeds, this is acceptable for the project scope
  but could be marginally improved with methods to prevent large shifts.

#### Accessibility - 100
  - Perfect accessibility score.

#### Best Practices - 78
  - Impacted by the 'acceptable' console errors and third party cookes like all authenticated pages.

#### SEO - 100
- Perfect SEO score.

<br />

### Profile Page

<br />
<details>
<summary> Profile Page Lighthouse </summary>

![Profile Page Lighthouse](/readme-assets/lighthouse/profile-page-lighthouse.webp)

</details>
<br />

#### Performance - 71
  - An acceptable but certainly flawed performance score.
  - Mostly caused by the rendering of the high resolution PNG image the user uploaded for the profile image.
  All images chosen for the site during development are WEBP and downscaled, but this process is not applied
  to user uploaded images.
  - The UX is not greatly impacted, however images could be converted to WEBP and downscaled to improve the
  performance.

#### Accessibility - 100
  - Perfect accessibility score.

#### Best Practices - 78
  - Impacted by the 'acceptable' console errors and third party cookes like all authenticated pages.

#### SEO - 100
- Perfect SEO score.

<br />

### Edit Profile Page

<br />
<details>
<summary> Edit Profile Page Lighthouse </summary>

![Edit Profile Page Lighthouse](/readme-assets/lighthouse/edit-profile-page-lighthouse.webp)

</details>
<br />

#### Performance - 74
  - An acceptable but certainly flawed performance score.
  - Like the profile page, is very impacted by the rendering of the high resolution PNG profile
  image uploaded by a user. Similar conclusions apply.

#### Accessibility - 100
  - Perfect accessibility score.

#### Best Practices - 78
  - Impacted by the 'acceptable' console errors and third party cookes like all authenticated pages.

#### SEO - 100
- Perfect SEO score.

<br />

### Create Song Page

<br />
<details>
<summary> Create Song Page Lighthouse </summary>

![Create Song Page Lighthouse](/readme-assets/lighthouse/create-song-lighthouse.webp)

</details>
<br />

#### Performance - 91
  - A good performance score overall.
  - The image lowers the score slightly.

#### Accessibility - 100
  - Perfect accessibility score.

#### Best Practices - 78
  - Impacted by the 'acceptable' console errors and third party cookes like all authenticated pages.

#### SEO - 100
- Perfect SEO score.

<br />

### Edit Song Page

<br />
<details>
<summary> Edit Song Page Lighthouse </summary>

![Edit Song Page Lighthouse ](/readme-assets/lighthouse/edit-song-lighthouse.webp)

</details>
<br />

#### Performance - 88
  - A good performance score overall.
  - The image lowers the score slightly.

#### Accessibility - 100
  - Perfect accessibility score.

#### Best Practices - 78
  - Impacted by the 'acceptable' console errors and third party cookes like all authenticated pages.

#### SEO - 100
- Perfect SEO score.

<br />

### Page Not Found Page

<br />
<details>
<summary> Page Not Found Page Lighthouse </summary>

![Page Not Found Page Lighthouse ](/readme-assets/lighthouse/404-lighthouse.webp)

</details>
<br />

#### Performance - 95
  - A good performance score overall.
  - The image lowers the score slightly.

#### Accessibility - 100
  - Perfect accessibility score.

#### Best Practices - 96
  - Impacted by the 'acceptable' console errors like all pages.

#### SEO - 100
- Perfect SEO score.

<br />

## Manual Testing

All testing was performed both on a regular desktop view and mobile sized screen (via Devtools).

### Navbar & Site Usability

|  Feature | Testing Area |Testing action | Outcome |
|---|---|---|---|
Navbar|Role Dependence|Navigate between pages without being logged in.| The login and register pages are available but not the 'my feed' or profile page|
Navbar|Role Dependence|Log in to account|Login and register options are replaced with profile avatar, log out and personalised 'my feed' navbar options|

### Profiles

|  Feature | Testing Area |Testing action | Outcome |
|---|---|---|---|
User Authentication|Authorisation|Briefly leave the website whilst logged in|The user stays logged in rather than being logged out immediately|
User Authentication|Authorisation|Type the URL of a route restricted to authorised users|The user is redirected to the general feed page|
User Authentication|Authorisation|Visit the profile page of another user|I can view all their public information but am given no edit buttons|
Avatar|Usability|Hover over the avatar|The avatar's gradient background dims slightly to indicate it is clickable|
Avatar|Functionality|Click the avatar|The user is linked to the profile shown on the respective avatar|
Profile Page|Usability|Viewing a profile with no songs or posts|Messages explaining there is not songs or posts yet are shown|
Profile Page|Usability|View a profile without a custome profile image|A default profile image of a guitar drawing is shown|
Edit Profile|Validation|Try to upload an audio file as a profile image|The user is given a message explaining on wav audio files are accepted|
Edit Profile|Validation|Remove all content from an existing bio|No bio is shown on the profile as this is acceptable and no bio is required|
Edit Profile|Functionality|Add a bio to the profile|The user is redirected back to the profile on submission where the bio is visibile below the profile image|

### Posts

|  Feature | Testing Area |Testing action | Outcome |
|---|---|---|---|
Create Post|Validation|Try to submit a post without a title or contents|Error messages are shown informing the user each field cannot be blank respectively|
Create Post|Functionality|Submit a post without an attached song|The post submits as this is acceptable and no 'song' is rendered for it, allowing it to act simply as a post|
Create Post|Functionality|Submit a post with an attached song|The post submits and upon viewing, a 'song' is rendered for it, showing the votes and audio clip of the song in question|
Edit Post|Functionality|View posts from the profile page|An edit button appears under the users posts which link to the edit post screen for the given post|
Edit Post|Functionality|Edit the post to try an add a new song that didn't exist when the post was first created|The song appears as an option to attach to the post|
Edit Post|Functionality|Change the song option to 'no song' on a post that was created with a song|The post no renders with no song as it is not required|
Edit Post|Validation|Edit the post content to be empty|A message appears telling the user it is required, as when creating a song|
Edit Post|Usability|Click the delete button|A modal screen appears informing of the consequences and ensuring the user is sure|
Feed|Functionality|Visit the 'my feed' page|Posts only from users the user is following appear|
Feed|Functionality|Scroll to the bottom of the rendered posts|A loading spinner is briefly shown then more posts render until there is no more posts|
Top Songs|Functionality|Upvote a song, making the highest song on the site by net votes|Upon refresh, it is ranked number 1 on the general feed top songs|
Top Songs|Functionality|Create over 10 songs|The general feed page shows only 10 songs maximum|
Search|Functionality|Enter a query that matches a username|Only posts from this user, or posts with their username in the title are shown|
Search|Usability|Type lots of characters in quick succession|A loading spinner is shown until the user has stopped typing for a second, then results are rendered|
Search|Edge Cases|Enter a query that does not match with any posts|A message saying there is not posts appears|
Vote|Functionality|Click upvote when there is already an upvote|The upvote is deleted, with the vote state shown by which buttons are greyed out|
Vote|Functionality|Click upvote when there is already a downvote|The downvote is changed to an upvote, effectively jumping the score by two votes|
Vote|Functionality|Click upvote and downvote buttons in quick succession|The net votes tally changes immediately but the buttons are disabled until the vote request is finished behind the scenes, meaning the clicks will not be counted until the page is ready to deal with the requests again (this is shown visually)|

### Songs

|  Feature | Testing Area |Testing action | Outcome |
|---|---|---|---|
Create Song|Edge Cases|Attempt to add a song when the user already has 3 (the max)|The add song button is not available on the profile, text is shown indicating there is 3 out of 3 songs. Navigating to the add song page manually results in a redirect|
Create Song|Validation|Attempt to add a song without an audio file|A message is shown informing the user an audio file is mandatory|
Create Song|Validation|Attempt to add a song with a long audio file (larger than 10MB)|The file is cut to the first 15 seconds and uploaded so it fits under the MB limit|
Create Song|Usability|Add a song without manually adding an artist name|The field is auto-filled with the user's username unless they wish to change, so submits with this artist name|
Edit Song|Usability|Click the delete button|A confirmation modal screen is shown|
Edit Song|Usability|Click the delete button multiple times|The button is disabled until the first delete process is complete, at which point the user is redirected|

### Comments

|  Feature | Testing Area |Testing action | Outcome |
|---|---|---|---|
Add Comment|Functionality|Write content and click the post button|The button is immediately rendered below with the other comments|
Edit Comment|Usability|Click the delete button, then try to click the edit button|A modal screen confirms the deletion. After confirming, all buttons are disabled until the comment is deleted and disappears|


<br />

## Automated Testing

# Error Pages

+ Rather than a blank page, attempts to access a non-existing page will render a custom 'page not found' page.
+ This helps prevent confusion, improve the professionalism of the site, meet users' expectations and improve the overall UX.

<details>
<summary> Page Not Found Page </summary>

![404 Page Desktop](/readme-assets/custom-404.webp)

</details> 

<br />

# Bugs

|  Bug Number |  Problem | Outcome |
|---|---|---|
|1 |'Top Songs From Your Followed' on 'My Feed' appearing out of order| Fixed
|2 |Edit Post page appearing briefly then loading infinitely| Fixed
|3 |Clicking delete multiple times in quick succession causes error| Fixed
|4 |Websocket error repeatedly logging to console despite no custom use of websockets| Fixed

<br>

**1.**

- After refactoring what was the 'useEffect' functionality for many pages into custom hooks, I found an issue with
the My Feed page.
- The Top Songs were rendering in the wrong order, with lower voted songs appearing at the top.
- The page had been refactored to use the useFetchSong hook, which was used on multiple pages and accepts a prop for a
filter.
- The filter being passed was a full endpoint - <code>`songs/?ordering=-net_votes&user__followed__user=${currentUser?.pk}`</code>
  rather than just the filter itself, resulting in an improper endpoint being requested from the server.
- The filter being passed in was amended to <code>`ordering=-net_votes&user__followed__user=${currentUser?.pk}`</code>.

  <details>
  <summary>Bug One</summary>

  ![Bug One](/readme-assets/bugs/bug-one.webp)

  </details>

  <br>

**2.**

- During implementation of the edit post page, an issue was encountered in which the page would appear briefly,
then switch to a loading spinner which would never end.
- Many issues regarding race conditions were investigated it.
- It turned out to be a simple case of incorrect variable naming. The <code>useEditPostData</code> hook returns a boolean
if the hook has finished loading, but was being saved to a variable called '<code>isLoading</code>'.
- The ternary expression was therefore rendering the opposite of what it should be, and rendering the spinner exactly when
loading was finished.
- The variable returned from <code>useEditPostData</code> was renamed hasLoaded and the ternary condition was swapped, fixing
the issue.

  <details>
  <summary>Bug Two</summary>

  ![Bug Two](/readme-assets/bugs/bug_two.png)

  </details>

  <br>

**3.**

- When implementing the delete button on the edit pages for posts and songs, I discovered an issue.
- The user could click the delete button, or the delete button then other input buttons, in quick
succession and cause multiple requests to occur, there causing errors to be logged to the console and
inconsistent behaviour on the front-end.
- This bug occurred because the delete button functionality relied on the user to only click the button
once. The DELETE request takes time, but the processing of this was not conveyed to the user, meaning
that that a confused user may easily click multiple times, not understand why they were not immediately given
feedback.
- A loading state was given to the button, so that upon clicking, it conveys that the deletion is in process and
does not allow any other clicks until the process has finished.


  <details>
  <summary>Bug Three</summary>

  ![Bug Three](/readme-assets/bugs/bug-three.webp)

  </details>

  <br>


**4.**

- An error, <code>WebSocket connection react_refresh:6 to '{site URL}' failed:</code> was appearing in the console
about every 30 seconds, with seemingly no impact on site functionality and despite no use of custom code managing websockets.
- Though the UX was not affected, mysterious console errors are not a positive and so multiple steps were taken to try and resolve
the issue.
- The issue was first assumed to be on the development server only. I deployed the site to Heroku, and ensured Heroku deployed the
production version of the React project. However, the errors continued.
- After researching online, it transpires the error is a commonly encountered issues with React's default configs 
(https://github.com/facebook/create-react-app/issues/11897), and can be fixed by setting a single environment variable for React,
<code>WDS_SOCKET_PORT=0</code>, which I set in the Heroku config vars, resolving the issue

  <details>
  <summary>Bug Four </summary>

  ![Bug Four](/readme-assets/bugs/bug-four.webp)

  </details>

<br>

# Deployment

# Credits & References

### Media

+ Favicon (<code>static/images/favicon.ico</code>) and site icons from <a href='https://fontawesome.com/v4/license/'>Font Awesome by Dave Gandy</a>.
+ <code>src/assets/logo.webp</code> is an original logo designed by myself,
Harry Peter Miles.
+ All site images provided by Freepik under free license. This includes all images in <code>src/assets/</code> except the favicon and logo:

   + <a href='https://www.freepik.com/free-photo/guitarist-blurred-pianst_1118716.htm#fromView=search&page=2&position=32&uuid=6771d36a-a799-47ec-9781-bcc146c486f6&query=music+band+live'><code>src/assets/home-image.webp</code></a>.
   + <a href='https://www.freepik.com/free-photo/rock-band-guitarist-performing-repetition-recording-studio_18042015.htm#fromView=search&page=1&position=29&uuid=7b6f4546-e684-4ae4-ac7d-a2f8307c783a&query=music+band+rock'><code>src/assets/register-image.webp</code></a>.
   + <a href='https://www.freepik.com/free-photo/close-up-artists-playing-instruments_19333207.htm#fromView=search&page=1&position=0&uuid=c9e52c7c-f610-433c-b3b6-a4667ca480dc&query=music+band+piano'><code>src/assets/login-image.webp</code></a>.

