# Frontend Mentor - E-commerce product page solution

This is a solution to the [E-commerce product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Open a lightbox gallery by clicking on the large product image
- Switch the large product image by clicking on the small thumbnail images
- Add items to the cart
- View the cart and remove items from it

### Screenshot

![](./FEM-screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Responsive Design
- [Vue](https://vuejs.org/) - JS Framework
- [Pinia](https://styled-components.com/) - Vue.js Store library
- [TailwindCSS](https://tailwindcss.com/) - CSS Utility Framework

### What I learned

This project was great practice learning to use Vue. I'd never used it before but I've read that it's quick to pick up. This turned out to be the case! I've already got plenty of experience using React, Svelte and Angular so it was quite familiar in many ways. I attempted to use shadcn-vue at first but quickly dropped it because it wasn't generating properly. I decided to just build the UI elements from scratch rather than attempt to fix issues with the library. Shadcn also seems to be best suited for React at this point.

I also used Pinia, a modular store designed to work with Vue. It was very intuitive, as it claimed, and simplified certain UI state problems like handling the cart and using the lightbox.

I was particularly happy about my work on the image components. Images have always been a little finnicky for me and I felt like I got a much better grasp on using certain properties like `display: fixed` vs `display: absolute`.

The cart store logic was also fun to code. It's a real pleasure to do more actual programming than just front end stuff.

### Continued development

In the future, I want to try writing tests for front end code (using Cypress, Playwright, etc.) just to get a feel for how to write those types of tests. I'm not sure how often front end tests are used but it would be nice to have done it once or twice.

I also think that I could've structured the flow of data a little better. The 'ProductImages' component is a bit too coupled in its design and I think it would've been better to instead take data in through props instead of directly, loading data in at the "root" level of product details page.

### Useful resources

- [ChatGPT](https://www.chat.openai.com) - This thing is better than Google. I learned the 'pointer-events: none' property thanks to ChatGPT.

## Author

- Website - [Miles Burke](https://www.milesj76.github.io)
- Frontend Mentor - [@milesj76](https://www.frontendmentor.io/profile/milesj76)
- X - [@milesj76](https://www.x.com/milesj76)

## Acknowledgments

Once again, I'm going to shout out ChatGPT. Genuinely, this thing is potentially one of the best tools to have ever been made in history.
