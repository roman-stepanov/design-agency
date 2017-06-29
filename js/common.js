$(document).ready(function() {
  var navigation = $('.main-nav');
  var navigationTopPosition = navigation.offset().top;
  var navigationHeight = navigation.outerHeight();

  var contentSections = $('.content-section');

  var home = $('#home');
  var btnKnowMore = home.find('a[href="#about"]');

  var updateNavigation = function() {
    contentSections.each(function() {
      var section = $(this);
      var sectionHeight = section.outerHeight();
      var sectionOffsetTop = section.offset().top;
      var sectionAnchor = navigation.find('a[href="#'+ section.attr('id') +'"]');
      var scrollTop = $(window).scrollTop();

      if ( (sectionOffsetTop - navigationHeight <= scrollTop) && (sectionOffsetTop + sectionHeight - navigationHeight > scrollTop) ) {
        sectionAnchor.parent().addClass('main-nav__item--active');
      } else {
        sectionAnchor.parent().removeClass('main-nav__item--active');
      }
    });
  };

  var onScrollWindow = function() {
    if ($(window).scrollTop() >= navigationTopPosition) {
      navigation.addClass('main-nav--fixed');
    } else {
      navigation.removeClass('main-nav--fixed');
    }
    updateNavigation();
  };

  var onClickNavigation = function(evt) {
    evt.preventDefault();
    var target = $(this.hash);

    $('body').animate(
      {'scrollTop': target.offset().top - navigationHeight + 2}, 600
    );
  };

  $(window).on('scroll', onScrollWindow);
  navigation.find('a').on('click', onClickNavigation);
  btnKnowMore.on('click', onClickNavigation);
});
