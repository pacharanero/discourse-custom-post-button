import { withPluginApi } from "discourse/lib/plugin-api";

function initializeCustomPostButton(api) {
  // Use the global settings object provided by Discourse
  const themeSettings = typeof settings !== "undefined" ? settings : {};

  // Default to "staff" if allowed_groups is undefined
  const allowedGroups = themeSettings.allowed_groups ? themeSettings.allowed_groups.split("|") : ["staff"];

  // Add CSS variables for button styling
  const addButtonStyles = () => {
    document.documentElement.style.setProperty('--button-bg-color', themeSettings.button_default_color || "#0088cc");
    document.documentElement.style.setProperty('--button-border-radius', themeSettings.button_border_radius || "4px");
    document.documentElement.style.setProperty('--button-padding', themeSettings.button_padding || "8px 16px");
    document.documentElement.style.setProperty('--button-font-weight', themeSettings.button_font_weight || "bold");
    document.documentElement.style.setProperty('--button-text-color', themeSettings.button_text_color || "#ffffff");
    document.documentElement.style.setProperty('--button-hover-opacity', themeSettings.button_hover_opacity || "0.8");
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

      // Ensure cooked is a DOM element
      let cookedElement = cooked;
      if (window.jQuery && cooked instanceof window.jQuery) {
        cookedElement = cooked[0];
      } else if (Array.isArray(cooked)) {
        cookedElement = cooked[0];
      }
      if (!cookedElement || !cookedElement.querySelectorAll) {
        return;
      }
      // Find all custom button wraps
      const customButtons = cookedElement.querySelectorAll('[data-wrap="custom-button"]');
      
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
  initialize(container) {
    withPluginApi("0.8.31", initializeCustomPostButton);
  }
};
