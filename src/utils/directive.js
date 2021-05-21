import Vue from 'vue'

Vue.directive('title', {
  inserted(el, binding) {
    let parent = el.parentNode;
    if (parent.scrollHeight > (parent.clientHeight + 10)) {
      el.style.display = 'block';
    } else {
      el.style.display = 'none'
    }
  }
})

Vue.directive('isFirstOne', {
  inserted(el, binding) {
    if (binding.value === 0) {
      el.style.display = 'none'
    }
  }
})