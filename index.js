document.addEventListener('DOMContentLoaded', function() {
   var heroImgScroll_wrapper = document.querySelector('.bf-hero-wrapper');
   var heroImgScroll_wrapperHeight = heroImgScroll_wrapper.offsetHeight;
   var heroImgScroll_imgStyle = document.querySelector('.bf-hero-imgs').style;
   var heroImgScroll_lastPerspectiveY = 50;
   var heroImgScroll_lastOpacity = 1;
   var headerLogoColorInvert_header = document.querySelector('.bf-header-wrapper');
   var headerLogoColorInvert_inverted = false;

   function scrollEvents() {
      var windowScrollY = window.pageYOffset;

      heroImgScroll(windowScrollY);
      headerLogoColorInvert(windowScrollY);
   }

   function heroImgScroll(windowScrollY) {
      var wrapperScrolled =
       1 - ((heroImgScroll_wrapperHeight - windowScrollY) / heroImgScroll_wrapperHeight);
      var opacity = 1 - wrapperScrolled * 1.1;
      var perspectiveY = -1 * heroImgScroll_wrapperHeight * (1 + 500 * wrapperScrolled) / 2;

      if (opacity < 0 && heroImgScroll_lastOpacity < 0) {
         return;
      }

      if (Math.abs(perspectiveY - heroImgScroll_lastPerspectiveY) > 1000) {
         heroImgScroll_lastPerspectiveY = perspectiveY;
         heroImgScroll_imgStyle.perspectiveOrigin = '50% ' + perspectiveY + 'px';
      }

      if (Math.abs(opacity - heroImgScroll_lastOpacity) > .02) {
         heroImgScroll_lastOpacity = opacity;
         heroImgScroll_imgStyle.opacity = opacity;
      }
   }

   function headerLogoColorInvert(windowScrollY) {
      var scrollPoint = heroImgScroll_wrapperHeight;
      var className = 'bf-header-show-inverted';

      if (!headerLogoColorInvert_inverted && windowScrollY > scrollPoint) {
         headerLogoColorInvert_header.classList.add(className);
         headerLogoColorInvert_inverted = true;
      } else if (headerLogoColorInvert_inverted && windowScrollY <= scrollPoint) {
         headerLogoColorInvert_inverted = false;
         headerLogoColorInvert_header.classList.remove(className);
      }
   }

   function updateHeroImgScrollAssets() {
      heroImgScroll_wrapperHeight = heroImgScroll_wrapper.offsetHeight;
      scrollEvents();
   }

   window.addEventListener('scroll', scrollEvents);
   window.addEventListener('resize', updateHeroImgScrollAssets);
});