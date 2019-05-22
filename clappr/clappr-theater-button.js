var icon;

$.ajax({
     async: false,
     type: 'GET',
     url: '/img/thmode.svg',
     success: function(data) {
       icon = data;
     }
});

var isFullscreen = false;

function ignoreResize(_isFullscreen) {
  isFullscreen = _isFullscreen;
  window.parent.parent.postMessage({
    event_id: 'CustomEvent2',
    data: _isFullscreen
  }, '*');
}

var TheaterMode = Clappr.UICorePlugin.extend({
  name: 'theater_mode',
  tagName: 'button',
  events: function() {
    return {
      click: this.clicked,
      mouseenter: this.highlight,
      mouseleave: this.unhighlight
    }
  },
  initialize: function() {
    this.render();
  },
  attributes: function() {
    return {
      class: 'media-control-button'
    }
  },
  bindEvents: function() {
    this.listenTo(this.core.mediaControl, Clappr.Events.MEDIACONTROL_RENDERED, this.attachButton)
  },
  attachButton: function() {
    var fullscreenButton = this.core.mediaControl.$fullscreenToggle
    if (fullscreenButton.length) {
      this.$el.insertAfter(fullscreenButton)
    } else {
      this.core.mediaControl.$('media-control-right-panel').prepend(this.el)
    }
  },
  render: function() {
    this.$el.empty();
    this.$el.append(icon);
    this.attachButton();
  },
  clicked: function() {
    if (isFullscreen) {
      this.core.mediaControl.toggleFullscreen();
      isFullscreen = false;
    }
  window.parent.parent.postMessage({
      event_id: 'CustomEvent'
    }, '*');
  },
  highlight: function() {
    var button = this.$el[0];
    if (button) {
      var svg = button.children[0];
      svg.children[0].style.fill = '#a6a6a6';
      svg.children[0].style.opacity = '0.9';
      svg.children[1].style.fill = '#a6a6a6';
      svg.children[1].style.opacity = '0.9';
    }
  },
  unhighlight: function() {
    var button = this.$el[0];
    if (button) {
      var svg = button.children[0];
      svg.children[0].style.fill = 'aaa';
      svg.children[0].style.opacity = '0.6';
      svg.children[1].style.fill = '#aaa';
      svg.children[1].style.opacity = '0.6';
    }
  }
});