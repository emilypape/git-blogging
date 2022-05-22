const updateBtn = document.querySelector('#update-btn');
const deleteBtn = document.querySelector('#delete-btn');
const postTitle = document.querySelector('#title-input');
const postContent = document.querySelector('#content-input');

async function updatePost(event) {
  event.preventDefault();
  let postIdString = this.getAttribute('postId');
  let postId = parseInt(postIdString);
  let titleInput = postTitle.value;
  let postInput = postContent.value;

  let payload = {
    title: titleInput,
    post_content: postInput,
  };

  const response = await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: { 'Content-type': 'application/json' },
  });

  if (response.ok) {
    console.log('successfully updated');
    window.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

async function deletePost(event) {
  event.preventDefault();
  let postIdString = this.getAttribute('postId');
  let postId = parseInt(postIdString);

  const response = await fetch(`/api/posts/${postId}`, {
    method: 'Delete',
  });

  if (response.ok) {
    console.log('successfully deleted');
    window.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

updateBtn.addEventListener('click', updatePost);
deleteBtn.addEventListener('click', deletePost);
