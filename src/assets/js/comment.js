
import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const deleteComment = document.querySelectorAll(".video__comments-delete");

const addComment = (comment, commentId) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteButton = document.createElement("span");
  deleteButton.innerHTML = '❌';
  deleteButton.classList.add('video__comments-delete');
  deleteButton.dataset.commentid = commentId;
  span.innerHTML = comment;
  li.appendChild(span);
  li.appendChild(deleteButton);
  deleteButton.addEventListener("click", handleDeleteComment);
  commentList.prepend(li);
  increaseNumber();
};
const increasingNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};


const decreaseCommentCount = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};


const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    method: "post",
    url: `/api/${videoId}/comment`,
    data: {
      comment
    }
  });
    if (response.status === 200) { 
        addComment(comment, response.data.commentId);
        increasingNumber();
    }
};

const handleDeleteComment = async (event) => {
  console.log("delete");
  const videoId = window.location.href.split("/videos/")[1];
  const comment = event.target.parentNode;
  const commentId = event.target.dataset.commentid;

  comment.style.display = "none";
  decreaseCommentCount();

  const response = await axios({
    url: `/api/${videoId}/comment/delete`,
    method: "POST",
    data: {
      commentId
    }
  });
  if (response.status === 200) {
    deleteComment(comment);
  } else {
    console.log('error', response);
    comment.style.display = "list-item";
  }
};

const handleSubmit = event => {
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = "";
};


function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  console.log(deleteComment);
  Array.from(deleteComment).forEach(function (currentComment) {
    console.log(currentComment);
    currentComment.addEventListener("click", handleDeleteComment);
  })
}

if (addCommentForm) {
    init();
}