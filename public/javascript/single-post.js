const commentInputEl = document.querySelector('#comment-input');
const commentSubmitBtn = document.querySelector('#comment-submit-btn');

async function addComment(event) {
  event.preventDefault;
  let postId = this.getAttribute('postId');
  let commentInput = commentInputEl.value;

  let payload = {
    comment_text: commentInput,
    post_id: postId,
  };

  const response = await fetch(`/api/comments`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

commentSubmitBtn.addEventListener('click', addComment);
