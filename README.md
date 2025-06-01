# Modern Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. This portfolio template features a clean design, smooth animations, and dark/light mode support.

## Features

- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design
- ⚡ Smooth animations and transitions
- 🎯 Interactive skill progress bars
- 📝 Contact form
- 🔗 Social media links
- 📄 Downloadable resume
- 🎨 Modern and clean UI

## Getting Started

1. Clone this repository or download the files
2. Open `index.html` in your code editor
3. Customize the content to match your information
4. Replace placeholder images with your own
5. Update the social media links
6. Add your resume file

## Customization

### Personal Information

Edit the following sections in `index.html`:

- Your name and title in the hero section
- About me text
- Skills and their percentages
- Project information
- Contact information
- Social media links

### Styling

The color scheme and other visual elements can be modified in `styles.css`:

- Primary and secondary colors
- Background colors
- Font sizes and families
- Spacing and layout
- Animations

### Theme Colors

To change the theme colors, modify the CSS variables in the `:root` selector in `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #3b82f6;
    /* ... other variables ... */
}
```

## Adding Projects

To add a new project, copy the project card structure in the projects section:

```html
<div class="project-card">
    <div class="project-image">
        <img src="path-to-image" alt="Project Name">
    </div>
    <div class="project-info">
        <h3>Project Name</h3>
        <p>Project description goes here.</p>
        <div class="project-links">
            <a href="#" class="btn small">Live Demo</a>
            <a href="#" class="btn small">GitHub</a>
        </div>
    </div>
</div>
```

## Contact Form

The contact form is currently set up to log form submissions to the console. To make it functional:

1. Set up a backend server to handle form submissions
2. Update the form submission handler in `script.js`
3. Add your preferred form handling service

## Browser Support

The website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 