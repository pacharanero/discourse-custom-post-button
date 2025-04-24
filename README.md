# Discourse Custom Post Button

A theme component for Discourse that adds customizable buttons to topics and posts with color customization and group permission settings.

## Features

- Add customizable buttons to your Discourse posts
- Control which groups can use the button feature
- Customize button colors directly in the markdown
- Set default styling for all buttons through theme settings
- Add text next to buttons for additional context

## Installation

1. Go to your Discourse admin panel
2. Navigate to Customize > Themes
3. Click "Install" and select "From a git repository"
4. Enter the repository URL: https://github.com/pacharanero/discourse-custom-post-button
5. Click "Install"

## Usage

### Basic Button

To add a basic button to your post:

```
[wrap=custom-button][Button Text](https://example.com)[/wrap]
```

### Colored Button

To add a button with a custom color:

```
[wrap=custom-button color=#ff0000][Button Text](https://example.com)[/wrap]
```

### Button with Additional Text

To add text next to your button:

```
[wrap=custom-button][Button Text](https://example.com)[/wrap] [wrap=text-after-button]Additional text here[/wrap]
```

## Settings

The theme component includes several settings to customize the appearance and behavior of buttons:

- **Allowed Groups**: Control which groups can use the custom post button feature
- **Button Default Color**: Set the default color for buttons when no color is specified
- **Button Border Radius**: Control the roundness of button corners
- **Button Padding**: Set the internal spacing of buttons
- **Button Font Weight**: Control the thickness of button text
- **Button Text Color**: Set the color of text on buttons
- **Button Hover Opacity**: Control the opacity when hovering over buttons
- **SVG Icons**: List of available SVG icons that can be used with buttons

## License

MIT
