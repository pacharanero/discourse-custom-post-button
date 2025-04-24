import { withPluginApi } from "discourse/lib/plugin-api";
import { getOwner } from "discourse-common/lib/get-owner";

function initializeCustomPostButton(api) {
  // Get settings from theme
  const settings = api.container.lookup("service:site-settings").themeSettings;
  const allowedGroups = (settings.allowed_groups || "").split("|");
  
  // Add CSS variables for button styling
  const addButtonStyles = () => {
    document.documentElement.style.setProperty('--button-bg-color', settings.button_default_color);
    document.documentElement.style.setProperty('--button-border-radius', settings.button_border_radius);
    document.documentElement.style.setProperty('--button-padding', settings.button_padding);
    document.documentElement.style.setProperty('--button-font-weight', settings.button_font_weight);
    document.documentElement.style.setProperty('--button-text-color', settings.button_text_color);
    document.documentElement.style.setProperty('--button-hover-opacity', settings.button_hover_opacity);
  };

  // Apply styles when the page loads
  api.onPageChange(() => {
    addButtonStyles();
  });

  // Register custom wrap for buttons
  api.decorateCooked(
    (cooked, helper) => {
      // Check if user is in allowed groups
      const currentUser = api.getCurrentUser();
      let userAllowed = false;
      
      if (currentUser) {
        if (allowedGroups.includes("staff") && currentUser.staff) {
          userAllowed = true;
        } else if (allowedGroups.includes("everyone")) {
          userAllowed = true;
        } else {
          const userGroups = currentUser.groups || [];
          userAllowed = userGroups.some(group => allowedGroups.includes(group.name));
        }
      }

      if (!userAllowed) {
        return;
      }

      // Find all custom button wraps
      const customButtons = cooked.querySelectorAll('[data-wrap="custom-button"]');
      
      customButtons.forEach(buttonWrap => {
        const link = buttonWrap.querySelector("a");
        if (link) {
          // Add custom class to the link
          link.classList.add("custom-post-button");
          
          // Check for color parameter in the wrap
          const wrapperDiv = buttonWrap.closest("div");
          if (wrapperDiv && wrapperDiv.dataset.params) {
            const params = wrapperDiv.dataset.params;
            const colorMatch = params.match(/color=([^,\s]+)/);
            
            if (colorMatch && colorMatch[1]) {
              const color = colorMatch[1];
              link.style.backgroundColor = color;
              link.style.borderColor = color;
            }
          }
        }
      });
    },
    { id: "discourse-custom-post-button" }
  );
}

export default {
  name: "discourse-custom-post-button",
  initialize() {
    withPluginApi("0.8.31", initializeCustomPostButton);
  }
};
