const singlePost = document.querySelectorAll('#single-post');

async function singlePostRedirect(event) {
  event.preventDefault;
  const postId = this.getAttribute('postId');

  window.location.replace(`/post/${postId}`);
}

singlePost.forEach((singlePost) => singlePost.addEventListener('click', singlePostRedirect));
