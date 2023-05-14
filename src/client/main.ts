import 'bootstrap/js/dist/button'
import 'bootstrap/js/dist/carousel'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/modal'
import Tab from 'bootstrap/js/dist/tab'

var hash = decodeURI(new URL(location.href).hash)
if (location.hash) {
    var currentTab = document.querySelector('[href="' + hash + '"]');
    var curTab = Tab.getOrCreateInstance(currentTab);
    curTab.show();
}

var url = location.href.replace(/\/$/, '');
var selectableTabList = [].slice.call(document.querySelectorAll('a[data-bs-toggle="tab"]'));
selectableTabList.forEach((selectableTab) => {
  selectableTab.addEventListener('click', function () {
    var hash = selectableTab.getAttribute('href');
    var newUrl = url.split('#')[0] + hash;
    history.replaceState(null, null, newUrl);
  });
});