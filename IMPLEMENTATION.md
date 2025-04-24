# Discourse Custom Post Button - Implementation Details

## Core Functionality

### Custom Button Wrap Tag
The theme component implements a custom wrap tag `[wrap=custom-button]` that transforms standard Markdown links into styled buttons. The implementation uses Discourse's Plugin API to decorate cooked content and apply styling to elements with the appropriate data attributes.

### Group Permission System
The component includes a permission system that restricts button usage to specific groups:
- Settings allow admins to specify which groups can use the button feature
- The initializer checks if the current user belongs to any of the allowed groups
- If the user doesn't have permission, the button transformation doesn't occur

### Color Customization
Buttons can be customized with different colors using parameters:
- Default color is set in theme settings
- Individual buttons can override the color using the syntax: `[wrap=custom-button color=#ff0000]`
- The initializer parses these parameters and applies the specified color

## Technical Implementation

### CSS Variables
The component uses CSS variables to make button styling configurable:
- Variables are set based on theme settings
- This allows for consistent styling across all buttons
- Individual button colors can override these defaults

### Plugin API Integration
The component integrates with Discourse using the Plugin API:
- `withPluginApi` is used to access Discourse's internal APIs
- `decorateCooked` is used to modify post content after it's rendered
- `onPageChange` ensures styles are applied when navigating between pages

### Internationalization
The component includes localization support:
- All user-facing strings are defined in locale files
- This makes it easy to add translations for other languages in the future

## Testing Notes

To test the component:
1. Install it on a Discourse instance
2. Create a post with a button using the syntax: `[wrap=custom-button][Button Text](https://example.com)[/wrap]`
3. Verify the button appears with the correct styling
4. Test color customization with: `[wrap=custom-button color=#ff0000][Button Text](https://example.com)[/wrap]`
5. Test group permissions by creating a test user in a non-allowed group
6. Verify that buttons only appear for users in allowed groups
