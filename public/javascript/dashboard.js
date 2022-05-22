const newPostBtnEl = document.querySelector('#new-post-btn');
const userPosts = document.querySelectorAll('#user-posts');

function newPostRedirect() {
  window.location.href = '/new-post';
}

function updatePostRedirect() {
  let postId = this.getAttribute('postId')

  window.location.replace(`/update/${postId}`)
}



newPostBtnEl.addEventListener('click', newPostRedirect);
userPosts.forEach((userPosts) => userPosts.addEventListener('click', updatePostRedirect));
