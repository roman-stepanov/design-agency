$(document).ready(function() {
  var navigation = $('.main-nav');
  var navigationTopPosition = navigation.offset().top;
  var navigationHeight = navigation.outerHeight();

  var contentSections = $('.content-section');

  var projects = $('#works');
  var projectsFilter = projects.find('.projects-filter');
  var projectsActiveFilter = projectsFilter.find('.projects-filter__link--active');
  var projectsGrid = projects.find('.projects-grid');

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

  var updateProjectsGrid = function() {
    projectsGrid.animate(
      {opacity: 0}, 500,
      function() {
        projectsGrid.animate(
          {opacity: 1}, 500
        );
      }
    );
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

    $('body, html').animate(
      {'scrollTop': target.offset().top - navigationHeight + 2}, 600
    );
  };

  var onClickProjectsFilter = function(evt) {
    evt.preventDefault();
    var target = $(this);

    projectsActiveFilter.removeClass('projects-filter__link--active');
    target.addClass('projects-filter__link--active');
    projectsActiveFilter = target;

    updateProjectsGrid();
  };

  $(window).on('scroll', onScrollWindow);
  navigation.find('a').on('click', onClickNavigation);
  btnKnowMore.on('click', onClickNavigation);
  projectsFilter.find('a').on('click', onClickProjectsFilter);
});
