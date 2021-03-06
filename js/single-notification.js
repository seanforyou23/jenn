(function ($) {
  'use strict';

  let getMenuItemLnk = function (item) {
    return $(item).find('> a');
  },

  focusFirstMenuItem = function ($element) {
    $element.find('a:first').trigger('focus');
  },

  removeActiveClasses = function ($menuItems) {
    $.each($menuItems, function (idx, item) {
      if (getMenuItemLnk(item).is('.pf-is-active')) {
        getMenuItemLnk(item).removeClass('pf-is-active');
      }
    });
  },

  removeAriaCurrent = function ($menuItems) {
    $.each($menuItems, function (idx, item) {
      if (getMenuItemLnk(item).attr('aria-current') === 'true') {
        getMenuItemLnk(item).attr('aria-current', false);
      }
    });
  },

  popNotification = function ($element) {
    $('main').append($element);

    setTimeout(function () {
      $element.remove();
    }, 6000);
  },

  alertNotifMarkup = function () {
    return `
      <div
        id="alert-notification"
        class="pf-c-toast pf-is-warning">
        <div role="alert" aria-live="assertive">
          <div class="pf-c-toast__icon">
            <i class="fas fa-home"></i>
            <span id="alert-notification-title" class="sr-only">ALERT</span>
          </div>
          <div id="alert-notification-message" class="pf-c-toast__message">
            This is an important alert notification
          </div>
        </div>
        <div class="pf-c-toast__action">
          <a href="#">Dismiss Notification</a>
          <button data-dismiss aria-label="Dismiss Notification">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    `;
  },

  statusNotifMarkup = function () {
    return `
      <div
        id="status-notification"
        class="pf-c-toast pf-is-success">
        <div role="status" aria-live="polite">
          <div class="pf-c-toast__icon">
            <i class="fas fa-home"></i>
            <span id="status-notification-title" class="sr-only">Success message</span>
          </div>
          <div id="status-notification-message" class="pf-c-toast__message">
            This is a status notification
          </div>
        </div>
        <div class="pf-c-toast__action">
          <button data-dismiss aria-label="Dismiss Notification">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    `;
  },

  bindMenuEvents = function ($listItem, idx, $menuItems) {
    let $menuItem = $listItem.find('> a');

    $menuItem.on('click', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      removeActiveClasses($menuItems);
      removeAriaCurrent($menuItems);
      $menuItem.addClass('pf-is-active').attr('aria-current', true);

      let menuItemTxt = $menuItem.find('[class*="link-text"]').text().trim();

      switch (menuItemTxt) {
        case 'Alert': {
          popNotification($(alertNotifMarkup()));
          break;
        }
        case 'Status': {
          popNotification($(statusNotifMarkup()));
          break;
        }
        default: {}
      }

      return false;
    });
  };

  document.addEventListener("DOMContentLoaded", function(event) {
    let $menuItems = $('.pf-c-vertical-nav__item, .pf-vertical-sub-nav__item');

    $.each($menuItems, function (idx, element) {
      let $listItem = $(element);
      bindMenuEvents($listItem, idx, $menuItems);
      getMenuItemLnk(element).attr('role', 'link');
    });

    $(document).on('click', '[data-dismiss]', function () {
      $(this).parents('.pf-c-toast').remove().blur();
    });
  });

})(jQuery);
