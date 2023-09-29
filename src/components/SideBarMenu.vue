<template>
    <aside class="sidebar">
      <h2 class="menu-title">SideBar Menu</h2>
      <!-- <router-link to="/appone">
        <div class="menu-item">App One</div>
      </router-link> -->
      <div class="submenu-container" @mouseenter="showSubmenu" @mouseleave="hideSubmenu">
        <div class="menu-item active-menu-item">
          App Two
        </div>
        <div class="submenu" v-show="submenuVisible">
          <div class="submenu-item">
            <router-link to="/apptwo/home">
              Home
            </router-link>
          </div>
          <div class="submenu-item">
            <router-link to="/apptwo/about">
              About
            </router-link>
          </div>
        </div>
      </div>
      <!-- <router-link to="/appthree">
        <div class="menu-item">App Three</div>
      </router-link>
      <router-link to="/appfour">
        <div class="menu-item">App Four</div>
      </router-link>
      <router-link to="/sonicwall">
        <div class="menu-item">SonicWall</div>
      </router-link> -->
    </aside>
  </template>
  
  <script>
  export default {
    name: 'SideBarMenu',
    data() {
      return {
        submenuVisible: false,
      };
    },
    methods: {
      showSubmenu() {
        this.submenuVisible = true;
      },
      hideSubmenu() {
        this.submenuVisible = false;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styling for the sidebar here */
  .sidebar {
  position: fixed; /* Make the sidebar fixed to the viewport */
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  background-color: #333;
  color: #fff;
  overflow-y: auto; /* Add vertical scroll if content exceeds height */
  padding: 10px; /* Add padding to create space around the content */
  text-align: center; /* Center align text in the sidebar */
  }
  
  .menu-title {
    font-weight: bold;
    margin-bottom: 15px; /* Add margin at the bottom of the title */
    margin-top: 15px;
    font-size: 18px; /* Increase font size for the title */
  }
  
  .submenu-container {
    position: relative;
  }
  
  .menu-item {
   color: #fff;
   text-decoration: none;
   padding: 10px;
   margin-bottom: 5px; /* Add margin between menu items */
   transition: background-color 0.3s; /* Add smooth background color transition */
   border-radius: 5px; /* Add rounded corners to menu items */
}
  
  
  .menu-item:hover {
    background-color: #555;
  }
  
  /* Style for submenu */
  .submenu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #444;
    width: 197px;
    border-left: 2px solid #666;
    border-radius: 5px
   
  }
  .submenu-item {
    color: #444;;
    padding: 8px;
    text-align: center;
    background-color: #fff;
    text-decoration: none;
  }
  
  .submenu-container:hover .submenu {
    display: block;
  }
  .active-menu-item {
   font-weight: bold; /* Change the font weight for the active menu item */
   color: #fff; /* Change the text color for the active menu item */
}
  </style>