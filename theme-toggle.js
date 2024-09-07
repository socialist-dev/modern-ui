class ThemeToggle extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }); // Sử dụng shadow DOM
  
      // HTML structure của toggle switch
      this.shadowRoot.innerHTML = `
        <style>
          .toggle-switch {
            position: relative;
            width: 100px;
            height: 50px;
            --light: #d8dbe0;
            --dark: #28292c;
            --link: rgb(27, 129, 112);
            --link-hover: rgb(24, 94, 82);
          }
          
          .switch-label {
            position: absolute;
            width: 100%;
            height: 50px;
            background-color: var(--dark);
            border-radius: 25px;
            cursor: pointer;
            border: 3px solid var(--dark);
          }
          
          .checkbox {
            position: absolute;
            display: none;
          }
          
          .slider {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 25px;
            -webkit-transition: 0.3s;
            transition: 0.3s;
          }
          
          .checkbox:checked ~ .slider {
            background-color: var(--light);
          }
          
          .slider::before {
            content: "";
            position: absolute;
            top: 10px;
            left: 10px;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            -webkit-box-shadow: inset 12px -4px 0px 0px var(--light);
            box-shadow: inset 12px -4px 0px 0px var(--light);
            background-color: var(--dark);
            -webkit-transition: 0.3s;
            transition: 0.3s;
          }
          
          .checkbox:checked ~ .slider::before {
            -webkit-transform: translateX(50px);
            -ms-transform: translateX(50px);
            transform: translateX(50px);
            background-color: var(--dark);
            -webkit-box-shadow: none;
            box-shadow: none;
          }
        </style>
        <div class="toggle-switch">
          <label class="switch-label">
            <input type="checkbox" class="checkbox">
            <span class="slider"></span>
          </label>
        </div>
      `;
  
      this.checkbox = this.shadowRoot.querySelector('.checkbox');
    }
  
    connectedCallback() {
      // Lấy theme hiện tại từ localStorage (nếu có)
      const currentTheme = localStorage.getItem('theme') || 'light';
      
      // Đặt trạng thái toggle theo theme hiện tại
      if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        this.checkbox.checked = true;
      }
  
      // Sự kiện chuyển đổi theme khi nhấn vào toggle
      this.checkbox.addEventListener('change', this.toggleTheme.bind(this));
    }
  
    toggleTheme() {
      const isDarkTheme = document.body.classList.toggle('dark-theme');
      localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    }
  
    disconnectedCallback() {
      // Gỡ bỏ sự kiện khi component bị loại bỏ
      this.checkbox.removeEventListener('change', this.toggleTheme);
    }
  }
  
  // Đăng ký Web Component
  customElements.define('theme-toggle', ThemeToggle);

// Xử lý sự kiện khi nhấn vào      
  document.addEventListener('DOMContentLoaded', () => {
    // Chèn CSS chuyển đổi theme vào body
    const style = document.createElement('style');
    style.textContent = `
      body {
        background-color: #fff;
        color: #000;
        transition: background-color 0.3s, color 0.3s;
      }
      body.dark-theme {
        background-color: #333;
        color: #fff;
      }
    `;
    document.head.appendChild(style);
  });
  
  